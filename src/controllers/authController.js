import responseClientMiddlleware from "../Middleware/responseClientMiddlleware.js";
import {
  createSession,
  deleteSession,
} from "../models/SessionModel/SessionModel.js";
import { insertUserInDb, updateUser } from "../models/UserModel/UserModel.js";
import { transporter } from "../services/emailSender.js";
import {
  userAccountActivatedNotification,
  userActivationTemplate,
} from "../services/emailTemplate.js";
import { encyptedPassword } from "../Utility/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

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
    // if user._id is availd is user object that means user is added successfull .
    if (user?._id) {
      // now create token to save into session table

      const token = uuidv4();
      // create session obj to store into db
      const sessionObj = {
        token,
        association: user.email,
        expire: new Date(Date.now() + 30 * 15 * 60 * 1000),
      };
      // store session obj into the session table
      const session = await createSession(sessionObj);

      if (session?._id) {
        // if session is added succesfully it will give you session ojb from db
        // now create url
        const activationUrl = `${process.env.ROOT_URL}/activate-user?t=${session.token}&id=${session._id}`;
        console.log(activationUrl);

        const { name, email } = user;
        const obj = {
          adminEmail: process.env.EMAIL,
          userEmail: email,
          url: activationUrl,
          userName: name,
        };
        // now send activation email to user to activate the acccount with link.
        const emailt = await transporter().sendMail(
          userActivationTemplate(obj)
        );
        return responseClientMiddlleware({
          req,
          res,
          message:
            "we have sent you an email with the activation link. click the link to activate your account",
        });
      }
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
export const activateUser = async (req, res, next) => {
  try {
    const { token, _id } = req.body;
    if (token && _id) {
      const sessionObject = {
        _id,
        token,
      };
      // make the db query into session table to check if id and token is valid and delete session so link become invalid
      const session = await deleteSession(sessionObject);
      if (session?._id) {
        const filter = { email: session.association };
        const update = { status: "active" };
        console.log(filter);
        // now change the status to activat into user table
        const user = await updateUser(filter, update);

        if (user?._id && user.status == "active") {
          // send email notification to user says you account is now active
          const { name, email } = user;
          const loginUrl = `${process.env.ROOT_URL / login}`;
          const obj = {
            adminEmail: process.env.EMAIL,
            userEmail: email,
            url: loginUrl,

            userName: name,
          };
          // now send activation email to user to activate the acccount with link.
          const emailt = await transporter().sendMail(
            userAccountActivatedNotification(obj)
          );
          return responseClientMiddlleware({
            req,
            res,
            message:
              " conratulation! your account is now active. you may login now",
          });
        }
      }
      const statusCode = 401;
      const message = "link is invalid";
      return responseClientMiddlleware({ req, res, message, statusCode });
    }
  } catch (error) {
    next(error);
  }
};
