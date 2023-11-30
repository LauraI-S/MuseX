import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
const verifyPassword = async (rawPassword, hashedPassword) => {
  //method taken from bcrypt will result in a boolean
  const isPasswordCorrect = bcrypt.compare(rawPassword, hashedPassword);

  return isPasswordCorrect;
};

export { encryptPassword, verifyPassword };
