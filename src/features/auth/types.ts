import { z } from "zod"
import type { loginSchema, registerSchema } from "./schemas"

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
