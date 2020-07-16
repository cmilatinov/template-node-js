module.exports = {
    isEmpty(value) {
        return value === undefined || value === null || value === '';
    },
    getRequestIP(req) {
        if (req.connection.remoteAddress)
            return req.connection.remoteAddress.replace('::ffff:', '').replace('::1', '127.0.0.1');
        return '';
    },
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    formatUser(user) {
        delete user.password;
        delete user.reset_guid;
        return user;
    }
};
