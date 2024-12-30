import { z } from 'zod';

export const signUpSchema = z.object({
  email : z.string().email(),
  password : z.string().min(8),
  confirmPassword : z.string()
}).refine(data  => data.password === data.confirmPassword , {
  message : "The passwords do not match",
  path : ["confirmPassword"]
})

export type SignUpForm = z.infer<typeof signUpSchema>;