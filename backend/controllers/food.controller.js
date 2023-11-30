import { foodModel } from "../models/food.model.js";
import { executor } from "./order.controllers.js";

export async function foodAddController(req, res, next) {
    await executor(req, res, next, async (req, res, next) => {
        var fooddata = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            additionals: req.body.additionals
        }
        var newfood = new foodModel(fooddata)
        var result = await newfood.save()
        res.json({ message: "successfull", data: result })
    })
}

export async function deleteFoodController(req, res, next) {
    await executor(req, res, next, async (req, res, next) => {
        var foodid = req.params.foodid
        var deletequery = foodModel.findByIdAndRemove(foodid)
        var result = await deletequery.exec()
        res.status(202).json({ message: "successfull", data: result })
    })
}

export async function getAllitemsController(req, res, next) {
    await executor(req, res, next, async (req, res, next) => {
        var limit = 6
        var pagenumber = req.query.pagenumber
        var skipval = limit * (pagenumber - 1)
        var foodfindquery = foodModel.find({})
        var fooditems = await foodfindquery.skip(skipval).limit(limit).sort({ name: "asc" }).exec()
        res.json({ message: "successfull", data: fooditems })
    })
}

export async function foodsearchController(req, res, next) {
    // search the food on the bases of query string provided in the url
    var querystring = req.query.query
    var limit = req.query.limit || 10
    var page = req.query.page || 1
    var searchquery = foodModel.find({ $text: { $search: querystring, $caseSensitive: false } })
    var skipval = (page - 1) * limit
    var result = await searchquery.skip(skipval).limit(limit).exec()
    res.json({ message: "successfull", data: result })
}