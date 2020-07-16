const { isEmpty } = require('./utils');

module.exports = {
    checkRequiredPOST(...fields) {
        return (req, res, next) => {
            let keys = Object.keys(req.body);
            if (fields.filter(f => keys.includes(f) && !isEmpty(req.body[f])).length !== fields.length)
                return res.status(HTTP_BAD_REQUEST).send('invalid_body');
            next();
        };
    },
    checkRequiredGET(...fields) {
        return (req, res, next) => {
            let keys = Object.keys(req.query);
            if (fields.filter(f => keys.includes(f) && !isEmpty(req.query[f])).length !== fields.length)
                return res.status(HTTP_BAD_REQUEST).send('invalid_parameters');
            next();
        };
    }
};
