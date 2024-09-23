import { z } from 'zod'


export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Veuillez entrer une adresse email valide.' }).trim(),
    password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' }).trim(),
})
