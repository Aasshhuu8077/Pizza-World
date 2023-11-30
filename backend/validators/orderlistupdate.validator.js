import { body, param } from "express-validator"

export const orderlistUpdateValidator = [
    body('user_id')
    .not()
    .isEmpty()
    .isLength({max : 24, min : 24}),
    body('order_id')
    .not()
    .isEmpty()
    .isLength({max : 24, min : 24})
]

export const completedateValidator = [
    param('date')
    .isNumeric(),
    param('year')
    .isNumeric(),
    param('month')
    .isNumeric()
]

export const orderByidValidator = [
    body('order_id')
    .isLength({min : 24, max : 24})
    .isAlphanumeric()
    .notEmpty()
]

export const placeOrderValidator = [
    body('items')
    .isArray()
    .notEmpty(),
    body('address')
    .isObject()
    .notEmpty()
]

export const cancelOrderValidator = [
    body('order_id')
    .isAlphanumeric()
    .isLength({max : 24, min : 24})
    .notEmpty()
]

export const statusUpdateValidator = [
    body('status')
    .notEmpty()
    .isAlpha()
    .isLength({min : 5, max : 20}),
    body('order_id')
    .isLength({min : 24, max : 24})
    .isAlphanumeric()
    .notEmpty()
]