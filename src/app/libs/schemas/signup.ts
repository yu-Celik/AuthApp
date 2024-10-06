import { z } from 'zod'

export const passwordCriteria = [
    {
        label: 'De 8 à 64 caractères',
        test: (value: string) => value.length >= 8 && value.length <= 64,
        errorMessage: 'Le mot de passe doit contenir entre 8 et 64 caractères.'
    },
    {
        label: 'Au moins 1 lettre',
        test: (value: string) => /[a-zA-Z]/.test(value),
        errorMessage: 'Le mot de passe doit contenir au moins une lettre.'
    },
    {
        label: 'Au moins 1 chiffre',
        test: (value: string) => /\d/.test(value),
        errorMessage: 'Le mot de passe doit contenir au moins un chiffre.'
    },
    {
        label: 'Au moins 1 caractère spécial',
        test: (value: string) => /[^a-zA-Z0-9]/.test(value),
        errorMessage: 'Le mot de passe doit contenir au moins un caractère spécial.'
    },
];

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Le nom d\'utilisateur doit contenir au moins 2 caractères.' })
        .trim(),
    email: z.string().email({ message: 'Veuillez entrer une adresse email valide.' }).trim(),
    password: z
        .string()
        .trim()
        .superRefine((password, ctx) => {
            passwordCriteria.forEach(criterion => {
                if (!criterion.test(password)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: criterion.errorMessage,
                    });
                }
            });
        }),
})