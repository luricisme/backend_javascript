const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/user.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net'
}

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await userModel.findOneByUsername(jwt_payload.username);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
)