const express = require('express');

const db = require('../helpers/database');
const { authenticate } = require('../helpers/auth-jwt');

const router = express();

router.get('/', authenticate, async (req, res) => {

    const tables = await db('information_schema.tables')
        .select();

    res.json(tables.map(t => `${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

});

module.exports =  router;
