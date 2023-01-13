const { validationResult } = require('express-validator');
const { deleteFiles } = require('../utils/file/deleteFile');

/** ERROR ийг customize хийсэн нь */
const cValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            value: error.value,
        };
    },
});

/**
 * Validate хийж өгсөн алдаануудаас шалгаад хэрэв алдаа гарвал алдаа буцаана
 * @param {Array} validations express validation ашигласан validator ууд
 */
const validate = (validations) => async (req, res, next) => {

    /** File утгуудыг шалгахын тулд body-д хийж байна! */
    req.body = {
        ...req.body,
        ...req.files
    }

    await Promise.all(validations.map(validation => validation.run(req)));

    /** Алдааг шалгах нь */
    const errors = cValidationResult(req);

    // Алдаа байхгүй бол цааш үргэлжлэнэ
    if (errors.isEmpty()) {
        return next();
    }

    /** алдаа гарсан учраас хадгалсан зурагуудыг устгана */
    deleteFiles(req);

    /** алдаа гарсан болохоор алдааг баганы нэрний ард msg ийг нь гаргасан */
    const err = errors.mapped()

    res.status(400).json(
        {
            success: false,
            data: "",
            errors: err
        }
    )
};

module.exports = validate
