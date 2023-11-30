import { body } from "express-validator"

export const createAddressValidator = [
    body('pincode')
    .notEmpty()
    .isNumeric()
    .isLength({min:6, max:6}),
    body('state')
    .notEmpty()
    .trim()
    .isAlpha()
    .isLength({max : 30, min : 5}),
    body('district')
    .notEmpty()
    .trim()
    .isAlpha()
    .isLength({max : 30, min : 5}),
]

export const updateAddressValidator = [

]

export const deleteAddressValidator = [

]