import { body } from "express-validator";

export const loginValidator = [
    body('email')
    .isEmail()
    .not()
    .isEmpty(),
    body('password')
    .not()
    .isEmpty()
]