import * as z from "zod";

const timeStringSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
  message: "Formato inválido",
});

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const dayScheduleSchema = z.object({
  date: z.date(),
  times: z.object({
    start: timeStringSchema,
    end: timeStringSchema,
  }).refine((data) => timeToMinutes(data.end) > timeToMinutes(data.start), {
    message: "La hora de cierre debe ser posterior a la de inicio",
    path: ["end"],
  }),
});

export const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .min(1, "Debes subir al menos una imagen para el evento"),
  // Corregido: Se usa el mensaje directo o se quita el objeto literal que causa el error
  start_date: z.date({ message: "Obligatoria" }),
  end_date: z.date().optional().nullable(),
  is_free: z.boolean().default(true),
  price: z.coerce.number().min(0).default(0),
  capacity: z.coerce.number().min(1).optional().nullable(),
  schedules: z.array(dayScheduleSchema).min(1, "Selecciona fechas en el calendario"),
});

export type EventFormInput = z.infer<typeof eventSchema>;
export type EventFormValues = z.output<typeof eventSchema>;