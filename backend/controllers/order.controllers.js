import { orderModel } from "../models/order.model.js"
import axios from "axios"
import { Types } from "mongoose"
import { getErrorlist } from "../utility/utilityfunction.utility.js"
import { eventEmitter } from "../server.js"

export async function remainOrderController(req, res, next) {
    var session = req.session
    if (session.role === 'admin') {
        var remainquery = orderModel.find({ status: { $not: { $eq: "delivered" } } })
        var result = await remainquery.exec()
        res.json(result)
    }
    else {
        res.status(401).json({ message: "unauthorized" })
    }
}

export async function completeOrderController(req, res, next) {
    /**
     * get the orders from the database on the bases of the filter
     * 
     */
    try {
        if (req.auth) {
            var todaydate = new Date(Date.now())
            var dateoforder = todaydate.getUTCDate()
            var monthoforder = todaydate.getUTCMonth()
            var yearoforder = todaydate.getUTCFullYear()
            if (!req.body.date === '') {
                dateoforder = req.body.date
            }
            if (!req.body.month === '') {
                monthoforder = req.body.month
            }
            if (!req.body.year === '') {
                yearoforder = req.body.year
            }
            var resultquery = orderModel.find({
                dateoforder,
                monthoforder,
                yearoforder
            })
            var result = await resultquery.exec()
            res.json({ message: "Found Successfully", data: result })
        }
        else {
            if (req.valerror.length === 0) {
                res.status(401).json({ message: "Unauthorized" })
            }
            else {
                res.status(400).json({ message: "Invalid request", data: getErrorlist(req.valerror) })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function orderByIdController(req, res, next) {
    try {
        if (req.auth) {
            var order_id = req.params.order_id
            var resultquery = orderModel.findById(order_id)
            var result = await resultquery.exec()
            res.json({ message: "Found Successfull", data: result })
        }
        else {
            if (req.valerror.length === 0) {
                res.status(400).json({ message: "Invalid Request", data: getErrorlist(req.valerror) })
            }
            else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export function discardOrderController(req, res, next) {

}

export async function placeorderContoller(req, res, next) {
    /**
     * user will send the order data
     * validation of the request 
     * finding the errors
     * checking the user login
     * creating the order object
     * saving the order object
     * update the order list of the user that is logged in 
     * @response object :- message - order placed successfully
     *           data :- order data
     */
    await executor(req, res,next, async (req, res, next) => {
        var session = req.session
        var placedorder = req.body
        var items = []
        var total_price = 0
        req.body.items.map((element) => {
            var item = {}
            Object.keys(element).map((key) => {
                item[key] = element[key]
                if (key === "itemprice") {
                    total_price += item['itemprice']
                }
            })
            items.push(item)
        })
        var order = new orderModel({
            items: items,
            total_price: total_price,
            address: req.body.address,
            userid : session._id
        })  
        order = await order.save()
        await axios.put("http://localhost:4000/auth/updateuserorderlist", {
            user_id: req.session._id,
            order_id: Types.ObjectId(order._id)
        })
        placedorder._id = order._id
        eventEmitter.emit('orderplaced', order)
        res.status(201).json({ message: "Order Placed Successfully", data: order })
    })
}

export async function updateorderstatusController(req, res, next) {
    /**
     * get the data from the user 
     * validate the data
     * check if the user is admin or not
     * if the user is admin 
     *      get the order from the database
     *      update the status of the order
     *      save the updated order to the database
     * else 
     *      @response message - unauthorized
     * 
     */
    await executor(req, res, next, async (req, res, next) => {
        var order_id = req.body.order_id
        var newstatus = req.body.status
        var resultquery = orderModel.findById(order_id)
        var result = await resultquery.exec()
        if (result === null) {
            res.json({ message: "unable to update the status" })
        }
        else {
            result.status = newstatus
            result = await result.save()
            // send the data to the client with help of socket
            eventEmitter.emit("statusupdate", {result, order_id, user_id : result.userid})
            res.json({ message: "status updated successfully", data : result })
        }
    })
}

export async function cancelorderController(req, res, next) {
    try {
        if (req.auth) {
            var order_id = req.body.order_id
            var user_id = req.session._id
            var result = await axios.get("http://localhost:4000/auth/getuserbyid", {
                params: {
                    user_id
                }
            })
            if (result.message === 'found successfully') {
                var found = false
                for (var i = 0; i < result.orders.length; i++) {
                    if (result.orders[i] === order_id) {
                        found = true
                        break;
                    }
                }
                if (found) {
                    var resultquery = orderModel.findById(order_id)
                    var result = await resultquery.exec()
                    if (result === null) {
                        res.status(500).json({ message: "order not found" })
                    }
                    else {
                        result.status = "cancelled"
                        result = await result.save()
                        // update the administrator with help of socket io
                        res.json({ message: "order cancelled successfully" })
                    }
                }
                else {
                    res.status(403).json({ message: "forbidden access" })
                }
            }
            else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
        else {
            if (req.valerror.length === 0) {
                res.status(400).json({ message: "Invalid Request", data: getErrorlist(req.valerror) })
            }
            else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export function updateorderController(req, res, next) {
}

export async function executor(req, res, next, callback) {
    try {
        if (req.auth) {
            await callback(req, res, next)
        }
        else {
            console.log(req.valerror)
            if (!req.valerror.isEmpty()) {
                res.status(400).json({ message: "Invalid Request", data: getErrorlist(req.valerror) })
            }
            else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error", data:err.message })
    }
}