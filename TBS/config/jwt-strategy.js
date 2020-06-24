import passportJWT from "passport-jwt"

import db from "../models/adminModel"

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = db.getUser({ id: jwt_payload.id });
  console.log(user);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = { strategy, jwtOptions };
