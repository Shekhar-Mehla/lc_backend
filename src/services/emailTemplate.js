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
export const userAccountActivatedNotification = (obj) => {
  const { adminEmail, userEmail, userName, url } = obj;
  console.log(obj);
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 24px;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Account Activation Successful
    </div>
    <div class="content">
      <p>Dear ${userName},</p>
      <p>We are pleased to inform you that your account has been successfully activated. You can now log in and start using all the features of your account.</p>
      <p>If you have any questions, feel free to contact us at any time.</p>
      <a href="${url}" class="button">Go to Login</a>
    </div>
  </div>
</body>
</html>
`;
  return {
    from: `"Location Tracker shekhar" <${adminEmail}>`,
    to: `${userEmail}`,
    subject: "Account Activated login now!", // Subject line
    text: `clcik on the link to activate your Account`, // plain text body
    html: htmlContent,
  };
};
