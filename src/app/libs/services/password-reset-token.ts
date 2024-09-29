import prisma from "@/libs/prisma/prisma"


export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: {
                token

            }
        })
        return passwordResetToken
    } catch (error) {
        throw new Error("Error fetching password reset token")
    }
}



export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: {
                email
            }
        })
        return passwordResetToken
    } catch (error) {
        throw new Error("Error fetching password reset token")
    }
}



