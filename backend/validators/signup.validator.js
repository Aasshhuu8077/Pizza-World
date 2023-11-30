import { body } from "express-validator"

export const signupValidator = [
    body('username')
        .isAlphanumeric()
        .trim()
        .not()
        .isEmpty(),
    body('email')
        .isEmail()
        .not()
        .isEmpty(),
    body('password')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 20 })
]