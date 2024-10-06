import { z } from 'zod'


export const ResetPasswordFormSchema = z.object({
    email: z.string().email({ message: 'Veuillez entrer une adresse email valide.' }).trim(),
})

export const NewPasswordFormSchema = z.object({
    token: z.string().trim(),
    password: z
        .string()
        .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
        .regex(/[a-zA-Z]/, { message: 'Contient au moins une lettre.' })
        .regex(/[0-9]/, { message: 'Contient au moins un nombre.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contient au moins un caractère spécial.',
        })
        .trim(),
})

