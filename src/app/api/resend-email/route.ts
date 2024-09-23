import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationEmail } from '@/app/libs/mail';
import { generateVerificationToken } from '@/app/libs/services/generate-tokens';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    try {
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}