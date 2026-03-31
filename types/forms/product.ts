import * as z from "zod";

const productSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título es obligatorio" })
    .max(100, { message: "Título demasiado largo" }),
  description: z
    .string()
    .min(1, { message: "La descripción es obligatoria" }),
  price: z.coerce
    .number({ message: "El precio debe ser un número" })
    .min(0.01, { message: "El precio debe ser mayor a 0" }),
  category_ids: z
    .array(z.string().uuid())
    .min(1, { message: "Selecciona al menos una categoría" }),
});

// Input = lo que el form maneja (price como string desde el input HTML)
// Output = lo que Zod entrega tras validar (price como number)
export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;
export { productSchema };