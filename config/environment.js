const path = require('path');
const fs = require('fs');
const ini = require('ini');

const config = ini.parse(fs.readFileSync(path.join(__dirname, 'config.ini')).toString());

module.exports = config;
