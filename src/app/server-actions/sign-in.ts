'use server'

import { FormState } from '@/app/libs/definitions/form-types'
import { SigninFormSchema } from '@/app/libs/schemas/signin'
import { signIn as nextAuthSignIn } from '@/libs/auth/next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { AuthError } from 'next-auth'

export async function signin(prevState: FormState | null, formData: FormData): Promise<FormState> {
    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        twoFactorCode: formData.get('twoFactorCode'),
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    // Extract the data from the validated fields
    const { email, password, twoFactorCode } = validatedFields.data

    try {
        await nextAuthSignIn("credentials", {
            email,
            password,
            twoFactorCode,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success: true }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    // @ts-expect-error auth.config.ts
                    if (error.cause === "TWO_FACTOR_REQUIRED") {
                        return { twoFactorToken: true }
                    }
                    return { errors: { _form: [error.cause as unknown as string] } }
                default:
                    return { errors: { _form: ['Une erreur système est survenue. Veuillez réessayer plus tard.'] } }
            }
        }
        throw error
    }
}
