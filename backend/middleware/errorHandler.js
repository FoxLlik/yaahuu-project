const colors = require("cli-color")
const errors = require("../utils/rsp/erros");
const { deleteFiles } = require('../utils/file/deleteFile');

/**
 * controller дотроос throw хийсэн алдааны
 * msg ийг барьж аван response буцаах нь
 */
const errorHandler = (err, req, res, next) =>
{
    //  дотоодын алдаа үеийг л хэвлэх
    if (err.statusCode >= 500 || !err?.rsp)
    {
        //  Алдааны мэдэгдлийг server дээр хэвлэх нь (улаан өнгөтэй харуулдаг болсон)
        console.log(colors.red.bold(err.stack));
    }

    /** алдаа гарсан учраас хадгалсан зурагуудыг устгана */
    deleteFiles(req);

    res.status(err.statusCode || 500).json(
        {
            success: false,
            data: "",
            error: err?.rsp ? err.rsp : errors["ERR_004"]
        }
    )
}

module.exports = errorHandler
