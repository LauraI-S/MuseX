import jwt from "jsonwebtoken";
const issueToken = (userID) => {
  const signOptions = {
    expiresIn: "2 days",
    issuer: "Lia",
  };
  const payload = {
    sub: userID,
  };
  const secretOrPrivateKey = "complicated password"; //ANCHOR FIXME !create an .env-file process.env.mySecret
  const token = jwt.sign(payload, secretOrPrivateKey, signOptions);
  return token;
};
export { issueToken };
