export const userActivationTemplate = (obj) => {
  const { adminEmail, userEmail, url, userName } = obj;
  console.log(obj);
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            background-color: #2e74b5;
            padding: 10px;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .email-content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2e74b5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Welcome to Location Tracker!</h2>
        </div>
        <div class="email-content">
            <p>Hi ${userName},</p>
            <p>Thank you for signing up with Location Tracker! To activate your account and start using our services, please click the button below:</p>
            <p style="text-align: center;">
                <a href=${url} class="button">Activate My Account</a>
            </p>
            <p>If you did not sign up for an account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 202 Location Tracker. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
  return {
    from: `"Location Tracker shekhar" <${adminEmail}>`,
    to: `${userEmail}`,
    subject: "Activate now", // Subject line
    text: `clcik on the link to activate your Account`, // plain text body
    html: htmlContent,
  };
};
