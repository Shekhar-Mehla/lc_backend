import { getUserByEmail } from "../models/UserModel/UserModel.js";
import { verifyJwt } from "../Utility/JWT/jwt.js";
import responseClientMiddlleware from "./responseClientMiddlleware.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authrization.split(" ")[1];
    // step 1 verify token
    if (token) {
      const isValid = verifyJwt(token);
      if (isValid?.email) {
        // check if user is active or not
        const user = await getUserByEmail(isValid.email);
        if (user?._id && user.status === "active") {
          req.userInfo = user;
          return next();
        }
      }
      return responseClientMiddlleware({
        req,
        res,
        statusCode: 401,
        message: "invalid token",
      });
    }
    return responseClientMiddlleware({
      req,
      res,
      statusCode: 401,
      message: "token is not found in the header",
    });
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
