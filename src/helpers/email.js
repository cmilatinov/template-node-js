const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const twig = require('twig');

const templates = {};

function loadTemplates() {
    let templatePath = path.resolve('./templates');
    let templateFiles = fs.readdirSync(templatePath).filter(f => f.endsWith('.twig'));
    templateFiles.forEach(f => templates[f.replace(/\.[a-zA-Z]*$/, '')] = path.join(templatePath, f));
}

loadTemplates();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dev.monkey.studio@gmail.com',
        pass: 'dontHackMePls'
    }
});

module.exports = {
    sendMail(to, subject, template, variables) {
        return new Promise((resolve, reject) => {
            let templateFile = templates[template];
            if (!templateFile)
                reject(new Error(`Template '${template}' does not exist.`));

            twig.renderFile(templateFile, variables, (err, html) => {
                if (err)
                    return reject(err);
                transporter.sendMail({
                    from: 'dev.monkey.studio@gmail.com',
                    to,
                    subject,
                    html
                })
                    .then(res => resolve(res))
                    .catch(err => reject(err));
            });
        });
    }
};
