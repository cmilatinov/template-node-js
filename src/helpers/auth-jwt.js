const passport = require('passport');
const jwt = require('jsonwebtoken');

const env = require('../../config/environment');

module.exports = {
    issueJWT(user) {
        return jwt.sign({ sub: user.id }, env.auth.secret, { expiresIn: '10h' });
    },
    authenticate(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err)
                return next(err);
            if (!user)
                return res.sendStatus(HTTP_UNAUTHORIZED);
            req.user = user;
            next();
        })(req, res, next);
    }
};
