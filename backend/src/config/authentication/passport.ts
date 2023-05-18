const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const staffMember = require("../../app/models/UserModel/User");
const keys = require("./keys");
// Create passport used for auth
const pass = (passport: any) => {
  const opts:any = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.secretOrKey;
  passport.use = (
    new JwtStrategy(opts, (jwt_payload, done) => {
      staffMember.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default pass;
