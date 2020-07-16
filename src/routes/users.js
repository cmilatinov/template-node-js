const express = require('express');
const bcrypt = require('bcryptjs');

const db = require( '../helpers/database');
const { isValidEmail, isValidName, isValidPassword } = require('../helpers/validation');
const { checkRequiredPOST } = require('../helpers/middleware');
const { authenticate, issueJWT } = require('../helpers/auth-jwt');
const { formatUser, generateUUID } = require('../helpers/utils');

const router = express();

router.post('/register', checkRequiredPOST('firstName', 'lastName', 'email', 'password'), async (req, res) => {

    // Required fields
    let { firstName, lastName, email, password } = req.body;

    // Trim necessary fields
    firstName = String(firstName).trim();
    lastName = String(lastName).trim();
    email = String(email).trim();

    // Validate names
    if (!isValidName(firstName) || !isValidName(lastName))
        return res.status(HTTP_BAD_REQUEST).send('invalid_names');

    // Validate email
    if (!isValidEmail(email))
        return res.status(HTTP_BAD_REQUEST).send('invalid_email');

    // Validate password
    if (!isValidPassword(password))
        return res.status(HTTP_BAD_REQUEST).send('invalid_password');

    // Check email taken
    let existingUser = await db('users')
        .where('deleted', false)
        .where('email', email)
        .first();
    if (existingUser)
        return res.status(HTTP_BAD_REQUEST).send('email_taken');

    // Create and return user
    const [user] = await db('users')
        .insert({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10)
        })
        .returning('*');

    // Remove sensitive information from user object
    formatUser(user);

    res.json(user);

});

router.post('/login', checkRequiredPOST('email', 'password'), async (req, res) => {

    // Required fields
    const { email, password } = req.body;

    // Find user, if none, unauthorized
    const user = await db('users')
        .where('deleted', false)
        .where('email', email)
        .first();
    if (!user)
        return res.sendStatus(HTTP_UNAUTHORIZED);

    // Compare passwords, if no match, unauthorized
    if (!bcrypt.compareSync(password, user.password))
        return res.sendStatus(HTTP_UNAUTHORIZED);

    // Issue a new JSON Web Token and return it
    let token = issueJWT(user);
    res.json({ token });

});

router.post('/reset-password', checkRequiredPOST('guid', 'password'), async (req, res) => {

    // Required fields
    const { guid, password } = req.body;

    // Find user, if none, not found
    let user = await db('users')
        .where('deleted', false)
        .where('reset_guid', guid)
        .first();
    if (!user)
        return res.sendStatus(HTTP_NOT_FOUND);

    // Validate password
    if (!isValidPassword(password))
        return res.status(HTTP_BAD_REQUEST).send('invalid_password');

    // Save new password and generate new GUID
    user.password = bcrypt.hashSync(password, 10);
    user.resetGUID = generateUUID();
    await user.save();

    // Return OK
    res.sendStatus(HTTP_OK);

});

router.get('/current', authenticate, (req, res) => res.json(req.user));

module.exports = router;
