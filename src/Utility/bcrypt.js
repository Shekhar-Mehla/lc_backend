import bcrypt from "bcrypt";
export const encyptedPassword = (password) => {
  const saltRounds = +process.env.SALT;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};
export const comparePassword = (password, Dbpassword) => {
  return bcrypt.compareSync(password, Dbpassword);
};
