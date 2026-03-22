import { z } from "zod"

export const postFormSchema = z.object({
  title: z.string().min(5, "Titúlo obritatório").max(100, "Máximo 100 caracteres"),
  content: z.string().min(1, "Texto obrigatório").max(500, "Máximo 500 caracteres"),
  image: z.string().nullable().optional(),
})