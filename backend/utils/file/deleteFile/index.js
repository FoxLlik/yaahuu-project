const { unlink } = require('fs');

/**
 * @description Folder-оос файл устгах функц
 * @param {string} url файлийн зам
 */
exports.deleteFile = function (url)
{
    unlink(url, (err) =>
    {
        if (err)
        {
            return err
        }
    });
}

/**
 * @description File-ийн устгах замыг нь зааж өгч байна (бичлэг болон зурагуудын зам тусдаа).
 * @param {object} req.files Бүх File төрөл
 */
exports.deleteFiles = function (req)
{
    /**  */
    if (req.files)
    {
        for (let item of Object.values(req.files))
        {
            for (let a in item)
            {
                if (item[a].mimetype === 'video/mp4')
                {
                    module.exports.deleteFile(`public/videos/${item[a].filename}`)
                }
                else if (item[a].mimetype === 'application/pdf')
                {
                    module.exports.deleteFile(`public/pdf/${item[a].filename}`)
                }
                else
                {
                    module.exports.deleteFile(`public/images/${item[a].filename}`)
                }
            }
        }
    }
}
