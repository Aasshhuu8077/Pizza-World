import mongoose from "mongoose"

const additionalfoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        set: quantitySetter
    }
}, { _id: false })

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        set: quantitySetter
    },
    additionals: [additionalfoodSchema]
})

function quantitySetter(value) {
    var quantity = value / 1000
    if (quantity < 1) {
        return value.toString() + "gm"
    }
    else {
        return (value / 1000).toString() + "kg"
    }
}

export const foodModel = mongoose.model("food", foodSchema)