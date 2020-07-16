const passport = require('passport');
const passportJWT = require( 'passport-jwt');

const env = require('../../config/environment');
const db = require('./database');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.auth.secret
    },
    (payload, done) => {
        db('users')
            .where('deleted', false)
            .where('id', payload.sub)
            .first()
            .then(user => {
                if (user)
                    done(null, user);
                else
                    done(new Error('User does not exist'));
            })
            .catch(err => done(err));
    }
));