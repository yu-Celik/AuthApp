const styles = {
    body: 'background-color: #f3f4f6; font-family: sans-serif;',
    container: 'margin: 0 auto; padding: 20px; max-width: 580px;',
    section: 'background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 24px;',
    heading: 'font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;',
    text: 'color: #4b5563; margin-bottom: 16px;',
    button: 'background-color: #10b981; color: #ffffff; padding: 8px 16px; border-radius: 4px; text-decoration: none; display: inline-block; font-weight: bold;',
};

export const VerificationEmail = ({ confirmLink }: { confirmLink: string }): string => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre adresse email</title>
</head>
<body style="${styles.body}">
    <div style="${styles.container}">
        <div style="${styles.section}">
            <h1 style="${styles.heading}">Vérification de votre adresse email</h1>
            <p style="${styles.text}">Bonjour,</p>
            <p style="${styles.text}">
                Merci de vous être inscrit. Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email :
            </p>
            <a href="${confirmLink}" style="${styles.button}">
                Vérifier mon email
            </a>
            <p style="${styles.text}">
                Ce lien est valable pendant 10 minutes. Si vous n'avez pas demandé cette vérification, veuillez ignorer cet email.
            </p>
            <p style="${styles.text}">
                Cordialement,<br />L'équipe de sécurité de AuthApp
            </p>
        </div>
    </div>
</body>
</html>
`;