import { body } from "express-validator"

export const foodaddvalidator = [
    body('name')
    .isLength({min:3, max: 20})
    .notEmpty()
    .trim()
    .custom(value => {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }),
    body('price')
    .notEmpty()
    .trim()
    .isNumeric(),
    body('quantity')
    .isNumeric()
]