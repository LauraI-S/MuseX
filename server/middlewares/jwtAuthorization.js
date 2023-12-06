import passport from "passport";

const jwtAuthorization = passport.authenticate("jwt", { session: false });

export default jwtAuthorization;
