import express from "express"
// controllers
import {
    foodsearchController,
    foodAddController,
    deleteFoodController,
    getAllitemsController
} from "../controllers/food.controller.js"
// middlewares
import { adminAuthMiddelware } from "../middleware/requestvalidation.middleware.js"
// validator
import { foodaddvalidator } from "../validators/food.validator.js"

export const foodRouter = express.Router()

// food edit api
foodRouter.route("/add").post(foodaddvalidator, adminAuthMiddelware, foodAddController)
foodRouter.route("/delete/:foodid").post(adminAuthMiddelware, deleteFoodController)
foodRouter.route("/getallfood").get(adminAuthMiddelware, getAllitemsController)
// food search api
foodRouter.route("/search").get(foodsearchController)
