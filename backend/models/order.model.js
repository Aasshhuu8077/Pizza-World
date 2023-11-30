import mongoose from "mongoose";
import { addressSchema } from "./user.model.js"

const orderitemSchema = new mongoose.Schema({
    itemname : {
        type : String,
        require : true
    },
    itemquantity : {
        type : Number,
        required : true
    },
    itemprice : {
        type : Number,
        required : true
    }
},{_id : false})

const orderSchema = new mongoose.Schema({
    items :{
        type : [orderitemSchema],
        required : true
    },
    total_price : {
        type : Number
    },
    status : {
        type : String,
        enum : ['placed', 'confirming', 'preparing', 'ready', 'outfordelivery', 'delivered', 'cancelled'],
        default : "placed"
    },
    address : {
        type : addressSchema,
        required : true
    },
    userid : {
        type : mongoose.ObjectId,
        required: true
    },
    dateoforder : {
        type  : Number,
        default : new Date(Date.now()).getUTCDate()
    },
    monthoforder : {
        type  : Number,
        default : new Date(Date.now()).getUTCMonth()
    },
    yearoforder : {
        type  : Number,
        default : new Date(Date.now()).getUTCFullYear()
    },
    deliveryBoy : {
        type : mongoose.ObjectId,
        default : null
    }
})

function convertToId(addressid){
    return mongoose.Types.ObjectId(addressid)
}

export const orderModel = mongoose.model('orders', orderSchema)
