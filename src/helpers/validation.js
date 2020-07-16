module.exports = {
    isValidName(value) {
        const regex = /^[A-zÀ-ú-' ]+$/;
        return regex.test(value) && value.length <= 50;
    },
    isValidEmail(value) {
        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return regex.test(value) && value.length <= 200;
    },
    isValidPassword(value) {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        return regex.test(value) && value.length >= 8 && value.length <= 50;
    }
};


