import { Router } from "express"
// middlewares
import { adminAuthMiddelware } from "../middleware/requestvalidation.middleware.js"
// controllers
import {
    getAvailableDeliveryBoyList,
    registerDeliveryBoy
} from "../controllers/deliveryboy.controller.js"

export const deliveryBoyRouter = Router()

// return the list of the delivery boys that are available
deliveryBoyRouter.route("/availablelist").get(adminAuthMiddelware, getAvailableDeliveryBoyList)
// register the delivery boy
deliveryBoyRouter.route("/register").post(adminAuthMiddelware, registerDeliveryBoy)
