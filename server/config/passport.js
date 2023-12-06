import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../Model/userModel.js";

//this will be used to extract the information from the token and insert it in the payload
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "complicated password", //we use it to create our token, decode the token
};
//Gültigkeits-Check der Token & user finden & communicates with the database "userModel"
const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await userModel.findOne({ _id: jwt_payload.sub });
    if (user) {
      console.log("token valid, user information inserted in request");
      return done(null, user);
    }
    if (!user) {
      console.log("token invalid");
      return done(null, false);
    }
  } catch (err) {
    console.log("error");
    return done(err, false);
  }
});

//"done" or "cb" are callbacks to say that we´re done and go to the next process
// const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
//now he´s going to the database and tries to find a user with the id (userModel) contained in the payload

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};
//tell passport to use the method authenticate

export default passportConfig;
