import jwt from "jsonwebtoken";
import { createSession } from "../../models/SessionModel/SessionModel.js";
import { updateUser } from "../../models/UserModel/UserModel.js";
import responseClientMiddlleware from "../../Middleware/responseClientMiddlleware.js";

export const createJwt = async (email) => {
  // create accessjwt and store into session db
  // create refresh jwt and store into db
  return {
    accessJwt: await createAcessJwt(email),
    refreshJwt: await createRefreshJwt(email),
  };
};

const createAcessJwt = async (email) => {
  try {
    const accessJwt = jwt.sign(
      {
        email,
      },
      process.env.SECRETACCESSJWT,
      { expiresIn: "15m" }
    );

    if (accessJwt) {
      const sessionObj = {
        token: accessJwt,
        association: email,
        expire: new Date(Date.now() + 17 * 60 * 1000),
      };

      const session = await createSession(sessionObj);
      if (session?._id) {
        return accessJwt;
      }
    }
    throw new Error("no access jwt is created try again");

    // now store it into session table
  } catch (error) {
    return error;
  }
};
const createRefreshJwt = async (email) => {
  try {
    const refreshJwt = jwt.sign(
      {
        email,
      },
      process.env.REFRESH_SECRETKEY,
      { expiresIn: "30d" }
    );

    if (refreshJwt) {
      const filter = { email };
      const update = { refreshJwt };
      // update the user table with new refresh jwt
      const user = await updateUser(filter, update);
      if (user?._id) {
        return refreshJwt;
      }
    }
    throw new Error("no access jwt is created try again");

    // now store it into session table
  } catch (error) {
    return error;
  }
};
export const verifyJwt = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRETACCESSJWT);
    } catch (error) {
      return error;
    }
  }
  throw new Error("token is not found");
};
