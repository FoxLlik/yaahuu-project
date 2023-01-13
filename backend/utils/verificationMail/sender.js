const CError = require('../../utils/rsp')

const transPorter = require('./transPorter');
const html = require('./mailHTML')

/**
 * И-мэйл илгээх option
 * @param {Object} req.body.email Хэрэглэгчийн mail
 * @param {String} token Хүсэлтийн токен
 * @param {String} route Хүсэлтийн route
 * @param {String} subject Mail агуулагдах мэдээлэл
 */
exports.send = async (req, token, route, subject, to) =>
{
    var mailOptions = {
        from: `"Yahuu " <yahuu.mn>`,
        to: to || req.body.email,
        subject: `${subject}`,
        html: html(req, token, route, subject)
    }
    // mail илгээх хэсэг
    const transportMail = await transPorter()
    transportMail.sendMail(mailOptions, function (err, info)
    {
        if (err)
            throw new CError('ERR_004')
    });
}
