module.exports = (err, req, res, next) => {
    let stack = Array.isArray(err.stack) ? err.stack.split('\n').map(line => line.trim()) : [];
    stack.shift();
    res.status(HTTP_INTERNAL_SERVER_ERROR)
        .json({
            error: err.message,
            stack
        });
    next(err);
};
