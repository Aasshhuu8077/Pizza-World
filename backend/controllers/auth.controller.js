import { userModel } from "../models/user.model.js"
import { validationResult } from "express-validator"
import { compare } from "bcrypt"
import mongoose from "mongoose"
import { profileFiterArray } from "../utility/data.js"
import { getErrorlist } from "../utility/utilityfunction.utility.js"
import { executor } from "./order.controllers.js"

// authentication and registration of the user

export async function loginController(req, res, next) {
    /**
     * user will send the email and password in the body
     * then the user found from the data base
     * permission set
     *      can get the user profile details
     *      can place the orders
     *      isloggedIn true
     *      can logout
     *      
     * if user found
     *      generate the session id provide it to the user
     *      the cookie is setted to the response
     *      @Response message telling user logged in successfully
     * else 
     *      @Response message telling username or password are incorrect
     */
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!req.session.isloggedin) {
            if (errors.isEmpty()) {
                const email = req.body.email
                const password = req.body.password
                var loginquery = userModel.findOne({
                    email: email
                })
                var result = await loginquery.exec()
                if (result !== null) {
                    var isAuthentic = await compare(password, result.password)
                    if (!isAuthentic) {
                        res.json({ message: "username or password are incorrect" })
                    }
                    else {
                        var session = req.session
                        session.isloggedin = true
                        session.canplaceorders = true
                        session.cangetprofile = true
                        session.canalteraddress = true
                        session.canupdateprofile = true
                        session.canlogout = true
                        session._id = result._id
                        session.role = result.role
                        res.json({ message: "user logged in successfully", data: createUserProfile(result) })
                    }
                }
                else {
                    res.json({ message: "username or password are incorrect" })
                }
            }
            else {
                var errormessages = []
                errors.errors.map((element) => {
                    errormessages.push({ msg: element.msg, param: element.param })
                })
                res.status(400).json({ message: "invalid request", data: errormessages })
            }
        }
        else {
            res.json({ message: "User Already Logged In" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ message: err.message })
    }
}

export async function logoutController(req, res, next) {
    try {
        console.log("a logout request is made")
        req.session.destroy(function (err) {
            if (err === null) {
                res.clearCookie('token')
                res.json({ message: "Successfully logged out" })
            }
            else {
                console.log(err)
                res.json({ message: "Unable to logout" })
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error While Logging Out" })
    }
}

export async function signupController(req, res, next) {
    /**
     * get the details of the user 
     * create a user and save it to the database
     * @Response - user successfully created in message
     */
    try {
        const errors = validationResult(req)
        // if the request is validated
        if (errors.isEmpty()) {
            var newuser = new userModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            newuser = await newuser.save()
            res.json({ message: "User Successfully Created" })
        }
        else {
            var errormessages = getErrorlist(errors)
            res.json(errormessages)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

// controllers for the user to get and update the data

export async function getProfileController(req, res, next) {
    /**
     * check if the user has the correct permission in the session or not
     * @Response send the userdata to the user except the credentials
     * if the user is unauthorized 
     * @Response send the message unauthorized
     */

    try {
        var session = req.session
        if (session.cangetprofile && session.isloggedin) {
            var profileQuery = userModel.findById(session._id)
            var userprofile = await profileQuery.exec()
            userprofile = createUserProfile(userprofile)
            res.json({ message: "successfully found", data: userprofile })
        }
        else {
            res.status(401).json({ message: "Unathorized" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export async function updateProfileController(req, res, next) {
    try {
        var session = req.session
        if (session.isloggedin && session.canupdateprofile) {
            var errors = validationResult(req)
            if (errors.isEmpty()) {
                var updateprofilequery = userModel.findById(session._id)
                var userdata = await updateprofilequery.exec()
                // perform updates
                var updates = req.body
                var updatecount = 0 // check if there is any update or not
                Object.keys(updates).map((element) => {
                    if (userdata[element] !== updates[element]) {
                        userdata[element] = updates[element]
                        updatecount += 1
                    }
                })
                if (updatecount !== 0) {
                    userdata = await userdata.save()
                }
                userdata = createUserProfile(userdata)
                res.json(userdata)
            }
            else {
                var errormsg = getErrorlist(errors)
                res.json(errormsg)
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function userByIdController(req, res, next) {
    try {
        var errors = validationResult(req)
        if (errors.isEmpty()) {
            var resultquery = userModel.findById(req.body.user_id)
            var result = await resultquery.exec()
            if (result === null) {
                res.json({ message: "No user Exist" })
            }
            else {
                res.json({ message: "found successfully", data: createUserProfile(result) })
            }
        }
        else {
            if (errors.length === 0) {
                res.status(400).json({ message: "Invalid Request", data: getErrorlist(req.valerror) })
            }
            else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createAddressController(req, res, next) {
    /**
     * check for the session of the user
     * get the user from the database
     * if the user is not logged in then send msg of login first
     * get the list of parameter from the request
     * create the addrress object
     * add that address in the user address list
     * save the user to the database
     * @param pincode
     * @param state
     * @param district
     * @param landmark
     * @param area
     * @param street
     * @return message - address saved successfully
     */
    try {
        var session = req.session
        if (session.isloggedin) {
            var errors = validationResult(req)
            if (errors.isEmpty()) {
                if (session.canalteraddress) {
                    var user = await userModel.findById(session._id)
                    var newaddress = {
                        pincode: req.body.pincode,
                        state: req.body.state,
                        district: req.body.district,
                        landmark: req.body.landmark,
                        area: req.body.area,
                        street: req.body.street
                    }
                    user.addresses = [...user.addresses, newaddress]
                    user = await user.save()
                    res.json({ message: "address saved successfully", data: user.addresses })
                }
                else {
                    res.status(403).json({ message: "Forbidden access" })
                }
            }
            else {
                var errormsg = getErrorlist(errors)
                res.json(errormsg)
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateAddressController(req, res, next) {

}

export async function deleteAddressController(req, res, next) {
    await executor(req, res, next, async (req, res, next) => {
        var session = req.session
        var user_id = session._id
        var addresstoremove = JSON.parse(req.body.addresstoremove)
        var deletequery = userModel.findByIdAndUpdate(user_id, {
            $pull: {
                addresses: { _id: mongoose.Types.ObjectId(addresstoremove._id) }
            }
        })
        var result = await deletequery.exec()
        res.json({ message: "successfull" })
    })
}

export async function updateUserOrderController(req, res, next) {
    try {
        /**
         * api update the order list of the user
         * this url can only be accessed by the client that's role is server
         * @param order_id 
         * @param user_id
         * @return message order list updated successfully
         */
        var errors = validationResult(req)
        if (errors.isEmpty()) {
            var order_id = req.body.order_id
            var user_id = req.body.user_id
            var user = userModel.findById(user_id)
            user = await user.exec()
            user.orders = [...user.orders, order_id]
            user = await user.save()
            res.json({ message: "order list updated successfully" })
        }
        else {
            console.log("errro")
            var errormsg = getErrorlist(errors)
            res.json(errormsg)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateUserByIdController(req, res, next) {
    /**
     * @params userid
     * @params updates -- object
     * @return updated user object
     */
    var userid = req.body.userid
    var updates = req.body.updates
    var userquery = userModel.findById(userid)
    var user = await userquery.exec()
    Object.keys(updates).map((element) => {
        user[element] = updates[element]
    })
    user = await user.save()
    res.json({message : "successfull", data : user})
}

// utitlity functions

function createUserProfile(userdata) {
    /**
     * generate the userprofile based on the filter array
     * senitize the userprofile and remove the credentials
     * @return userprofile
     */
    userdata = userdata.toJSON()
    var userprofile = {}
    Object.keys(userdata).map((element) => {
        var shouldblacklisted = false
        for (var i = 0; i < profileFiterArray.length; i++) {
            if (profileFiterArray[i] === element) {
                shouldblacklisted = true
                break
            }
        }
        if (!shouldblacklisted) {
            userprofile[element] = userdata[element]
        }
    })
    return userprofile
}
