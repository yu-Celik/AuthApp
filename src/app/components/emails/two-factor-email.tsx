const styles = {
    body: 'background-color: #f3f4f6; font-family: sans-serif;',
    container: 'margin: 0 auto; padding: 16px; max-width: 36rem;',
    section: 'background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 24px;',
    heading: 'font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;',
    text: 'color: #4b5563; margin-bottom: 16px;',
    code: 'background-color: #e5e7eb; padding: 16px; text-align: center; border-radius: 4px;',
    codeText: 'font-size: 24px; font-weight: bold; color: #1f2937;',
};

export const TwoFactorEmail = ({ token }: { token: string }): string => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code de vérification pour l'authentification à deux facteurs</title>
</head>
<body style="${styles.body}">
    <div style="${styles.container}">
        <div style="${styles.section}">
            <h1 style="${styles.heading}">Vérification à deux facteurs</h1>
            <p style="${styles.text}">Bonjour,</p>
            <p style="${styles.text}">
                Voici votre code de vérification pour l'authentification à deux facteurs :
            </p>
            <div style="${styles.code}">
                <span style="${styles.codeText}">${token}</span>
            </div>
            <p style="${styles.text}">
                Ce code est valable pendant 10 minutes. Ne le partagez avec personne.
            </p>
            <p style="${styles.text}">
                Si vous n'avez pas demandé ce code, veuillez ignorer cet email et sécuriser votre compte.
            </p>
            <p style="${styles.text}">
                Cordialement,<br />L'équipe de sécurité de AuthApp
            </p>
        </div>
    </div>
</body>
</html>
`;