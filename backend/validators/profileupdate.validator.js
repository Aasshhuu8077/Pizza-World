import { body } from "express-validator";

export const profilUpdateValidator = [
    body('password')
    .isLength({min : 5, max : 20}),
    body('email')
    .isEmail(),
    body('username')
    .isAlphanumeric()
]

export const getuserbyid = [
    body('user_id')
    .isLength({min : 5, max : 20})
    .notEmpty()
]

export const updateuserbyidValidator = [
    body('userid')
    .notEmpty()
    .isLength({min : 24, max : 24}),
    body('updates')
    .isObject()
    .notEmpty()
]