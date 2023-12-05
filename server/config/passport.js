import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../Model/userModel";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "complicated password", //we use it to create our token, decode the token
};

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  userModel.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});
