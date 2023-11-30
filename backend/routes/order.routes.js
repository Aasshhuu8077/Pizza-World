import express from "express"
// controllers
import {
    remainOrderController,
    completeOrderController,
    updateorderstatusController,
    placeorderContoller,
    discardOrderController,
    updateorderController,
    orderByIdController,
    cancelorderController
} from "../controllers/order.controllers.js"
// middleware
import { authmiddleware, adminAuthMiddelware } from "../middleware/requestvalidation.middleware.js"
// controller
import { 
    completedateValidator,
    orderByidValidator,
    placeOrderValidator,
    cancelOrderValidator,
    statusUpdateValidator
} from "../validators/orderlistupdate.validator.js"
export const orderRouter = express.Router()

orderRouter.route('/remainorder').get(adminAuthMiddelware, remainOrderController)
orderRouter.route('/completeorder').get(adminAuthMiddelware, completeOrderController)
orderRouter.route('/getorderbyid/:order_id').get(authmiddleware, orderByIdController)
orderRouter.route("/discardorder").delete(adminAuthMiddelware, discardOrderController)
orderRouter.route('/placeorder').post(placeOrderValidator, authmiddleware, placeorderContoller)
orderRouter.route('/updatestatus').put(statusUpdateValidator, adminAuthMiddelware, updateorderstatusController)
orderRouter.route('/updateorder').put(authmiddleware, updateorderController)
orderRouter.route('/cancelorder').delete(cancelOrderValidator, authmiddleware, cancelorderController)