const styles = {
    body: 'background-color: #f3f4f6; font-family: sans-serif;',
    container: 'margin: 0 auto; padding: 16px; max-width: 36rem;',
    section: 'background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 24px;',
    heading: 'font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;',
    text: 'color: #4b5563; margin-bottom: 16px;',
    button: 'background-color: #3b82f6; color: #ffffff; padding: 8px 16px; border-radius: 4px; text-decoration: none; display: inline-block; font-weight: bold;',
    marginTop: 'margin-top: 16px;',
};

export const PasswordResetEmail = ({ resetLink }: { resetLink: string }): string => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de votre mot de passe</title>
</head>
<body style="${styles.body}">
    <div style="${styles.container}">
        <div style="${styles.section}">
            <h1 style="${styles.heading}">Réinitialisation de votre mot de passe</h1>
            <p style="${styles.text}">Bonjour,</p>
            <p style="${styles.text}">
                Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>
            <a href="${resetLink}" style="${styles.button}">
                Réinitialiser mon mot de passe
            </a>
            <p style="${styles.text} ${styles.marginTop}">
                Ce lien est valable pendant 10 minutes. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et sécuriser votre compte.
            </p>
            <p style="${styles.text}">
                Cordialement,<br />L'équipe de sécurité de AuthApp
            </p>
        </div>
    </div>
</body>
</html>
`;