import express from "express"
// controllers
import {
    getProfileController,
    loginController,
    logoutController,
    signupController,
    updateProfileController,
    updateUserOrderController,
    createAddressController,
    updateAddressController,
    deleteAddressController,
    userByIdController,
    updateUserByIdController
} from "../controllers/auth.controller.js"
// validators
import { signupValidator } from "../validators/signup.validator.js"
import { loginValidator } from "../validators/login.validator.js"
import { profilUpdateValidator, getuserbyid, updateuserbyidValidator } from "../validators/profileupdate.validator.js"
import { orderlistUpdateValidator } from "../validators/orderlistupdate.validator.js"
import {
    createAddressValidator,
    updateAddressValidator
} from "../validators/address.validators.js"
import { adminAuthMiddelware, authmiddleware } from "../middleware/requestvalidation.middleware.js"

export const authRouter = express.Router()

authRouter.route('/login').post(loginValidator, loginController)
authRouter.route('/logout').delete(logoutController)
authRouter.route('/register').post(signupValidator, signupController)
authRouter.route("/profile").get(getProfileController)
authRouter.route("/updateprofile").put(profilUpdateValidator, updateProfileController) // create a validator for the update api
authRouter.route('/getuserbyid').put(getuserbyid, userByIdController)
authRouter.route("/updateuserorderlist").put(orderlistUpdateValidator, updateUserOrderController)
authRouter.route("/updateuserbyid").put(updateuserbyidValidator, updateUserByIdController)
// address api
authRouter.route("/addaddress").post(createAddressValidator, createAddressController)
authRouter.route("/updateaddress").put(updateAddressValidator, updateAddressController)
authRouter.route("/removeaddress").delete(authmiddleware, deleteAddressController)