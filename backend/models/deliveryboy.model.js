import mongoose from "mongoose";

const deliveryboySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    currentLocation: {
        type: String
    },
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    },
    bikenumber: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    role : {
        type : String,
        default : "deliveryboy"
    },
    socketid: {
        type: String
    }
})

export const deliveryboyModel = mongoose.model("deliveryboy", deliveryboySchema)