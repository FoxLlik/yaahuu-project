const express = require("express")
const { checkSchema } = require('express-validator')

const router = new express.Router

// middlewares
const validate = require("../middleware/validate")
const asyncHandler = require("../middleware/asyncHandler")
const loginRequired = require("../middleware/loginRequired")

const userApp = require("../apps/user");
const signApp = require("../apps/sign")
const { sign, register } = require("../utils/validate/userSign")


// Хэрэглэгч анх вэбийг ачааллуулахад нэвтэрсэн эсэхийг шалгах
router
    .route("/check/")
    .get(asyncHandler(userApp.check))

// Хэрэглэгч
router
    .route("/")
    .get(loginRequired, asyncHandler(userApp.get))

// хэрэглэгч бүртгүүлэх хэсэг
router
    .route("/register/")
    .post(validate(checkSchema(register)), asyncHandler(signApp.register))

// хэрэглэгч нэвтрэх хэсэг
router
    .route("/login/")
    .post(validate(checkSchema(sign)), asyncHandler(signApp.login))

// Email баталгаажуулах
router
    .route("/verification/")
    .get(asyncHandler(signApp.confirm))

//
router
    .route("/google-login/")
    .post(asyncHandler(signApp.googleLogin))

// Logouts
router.get("/logout/", signApp.signOut)

module.exports = router
