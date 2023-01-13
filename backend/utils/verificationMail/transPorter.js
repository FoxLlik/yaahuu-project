const nodemailer = require('nodemailer');

/*
*   transporter-->  Mail илгээх mail-ийн бүртгэлийн мэдэээлэл
*   MAIL_EMAIL -->  Mail илгээх mail-ийн username
*   MAIL_PASSWORD -->   Mail илгээх mail-ийн password
*   https://myaccount.google.com/lesssecureapps
*   линк лүү орж app secure асаах ёстой
*/

const transporterMain = async () =>
{

    const mail = process.env.EMAIL_NAME
    const pass = process.env.EMAIL_PASSWORD
    const service = process.env.EMAIL_TYPE

    var transporter = nodemailer.createTransport(
        {
            service: service,
            auth:
            {
                user: mail,
                pass: pass
            },
            tls:
            {
                rejectUnauthorized: false
            }
        }
    );
    return transporter
}

module.exports = transporterMain
