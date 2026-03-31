import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/config/supabase-server"; 
import { getAuthContext } from "@/utils/server";

export async function POST(req: NextRequest) {
  // 1. Validar Usuario con tu utilidad
  const { user, status: authStatus, error: authError } = await getAuthContext(req);
  if (!user) {
    return NextResponse.json({ error: authError }, { status: authStatus });
  }

  try {
    // Recibimos JSON del formulario
    const body = await req.json();
    const { title, description, price, category_ids } = body;

    // 2. Inserción en la tabla 'products'
    // Nota: category_ids es uuid[], images es text[]
    const { data, error } = await supabaseServer
      .from("products")
      .insert({
        title,
        description,
        price,
        category_ids, // Array de UUIDs
        images: [],   // Vacío por ahora (sin Cloudflare)
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}