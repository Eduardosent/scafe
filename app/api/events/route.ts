import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { supabaseServer } from "@/config/supabase-server"; 
import { getAuthContext, optimizeImage } from "@/utils/server";
import { nanoid } from "nanoid";

// Función manual para generar el slug base
const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export async function POST(req: NextRequest) {
  const { user, status: authStatus, error: authError } = await getAuthContext(req);
  if (!user) return NextResponse.json({ error: authError }, { status: authStatus });

  try {
    const formData = await req.formData();
    
    // 1. Extracción de datos
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const is_free = formData.get("is_free") === "true";
    const price = is_free ? 0 : Number(formData.get("price"));
    const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
    
    const schedules = JSON.parse(formData.get("schedules") as string);
    const files = formData.getAll("images") as File[];

    // 2. Lógica de Slug Único e Incremental (CORREGIDA para Supabase)
    const slugBase = generateSlug(title);

    // Buscamos coincidencias exactas o que empiecen con el prefijo-
    const { data: matches, error: slugError } = await supabaseServer
      .from("events")
      .select("slug")
      .or(`slug.eq.${slugBase},slug.ilike.${slugBase}-%`);

    if (slugError) throw slugError;

    let finalSlug = slugBase;
    if (matches && matches.length > 0) {
      const counts = matches.map(m => {
        const parts = m.slug.split('-');
        const lastPart = parts[parts.length - 1];
        const number = parseInt(lastPart);
        return isNaN(number) ? 1 : number;
      });
      const maxCount = Math.max(...counts);
      finalSlug = `${slugBase}-${maxCount + 1}`;
    }

    // 3. Procesamiento y subida de imágenes a S3 (elsenderocafe)
    const mediaKeys: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let currentBuffer: Buffer = Buffer.from(await file.arrayBuffer());

      if (file.type.startsWith("image/")) {
        try {
          const optimized = await optimizeImage(currentBuffer, file.type);
          currentBuffer = Buffer.from(optimized);
        } catch (err) {
          console.error(`Error optimizando imagen ${i}:`, err);
        }
      }

      const fileId = nanoid(12);
      const ext = file.type.split('/')[1] || 'jpg';
      const key = `events/${fileId}.${ext}`;

      await s3Client.send(new PutObjectCommand({
        Bucket: 'elsenderocafe',
        Key: key,
        Body: currentBuffer,
        ContentType: file.type,
      }));
      mediaKeys.push(key);
    }

    // 4. Inserción en la tabla 'events'
    const { data: event, error: eventError } = await supabaseServer
      .from("events")
      .insert({
        title,
        slug: finalSlug,
        description,
        is_free,
        price,
        capacity,
        images: mediaKeys,
      })
      .select()
      .single();

    if (eventError) throw eventError;

    // 5. Inserción en la tabla 'event_dates'
    const datesToInsert = schedules.map((s: any) => ({
      event_id: event.id,
      date: s.date,
      start_time: s.times.start,
      end_time: s.times.end
    }));

    const { error: datesError } = await supabaseServer
      .from("event_dates")
      .insert(datesToInsert);

    if (datesError) {
      // Rollback manual
      await supabaseServer.from("events").delete().eq("id", event.id);
      throw datesError;
    }

    return NextResponse.json({ success: true, data: { ...event, dates: datesToInsert } });

  } catch (err: any) {
    console.error("Error en el endpoint de eventos:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}