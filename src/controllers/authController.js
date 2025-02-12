import { insertUserInDb } from "../models/UserModel/UserModel.js";
import { transporter } from "../services/emailSender.js";
import { userActivationTemplate } from "../services/emailTemplate.js";
import { encyptedPassword } from "../Utility/bcrypt.js";

// inset new user
export const insertUser = async (req, res, next) => {
  try {
    // step to insert user
    // 1. reacive data from client
    //
    // 2. remove confirm password
    req.body.confconfirmedPassword = undefined;
    // 3. encrypt the password using bcryt package
    const { password } = req.body;

    req.body.password = encyptedPassword(password);

    // 4.sttore the data into db
    const user = await insertUserInDb(req.body);
    // if user._id is availd is user object that means user is added successfull . now send activation email to user to activate the acccount with link.
    if (user?._id) {
      const { name, email } = user;
      const obj = {
        adminEmail: process.env.EMAIL,
        userEmail: email,
        url: "eryyyryyrey",
        userName: name,
      };

      const emailt = await transporter().sendMail(userActivationTemplate(obj));
      console.log(emailt);
    }
  } catch (error) {
    if (
      error.message.includes(
        'E11000 duplicate key error collection: locationTracker.users index: email_1 dup key: { email: "SSS12@gmail.com" }'
      )
    ) {
      error.message =
        "email is already exist. click on forgot password to reset the password";
    }
    next(error);
  }
};
