import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const addressSchema = mongoose.Schema({
    street : {
        type : String
    },
    landmark : {
        type : String
    },
    area : {
        type : String
    },
    district : {
        type :String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    }
})

const userSchema = mongoose.Schema({
    /**
     * @TODO : add image property to the user
     */
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        set : hashPassword,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'deliveryboy'],
        default: 'user'
    },
    orders: {
        type : [],
        // set : (id) => {
        //     return mongoose.Types.ObjectId(id)
        // },
        default : []
    },
    lastlogin : {
        type : Date
    },
    addresses : [
        addressSchema
    ],
    socketid : {
        type : String
    }
}, {timestamps : true})

function hashPassword(password){
    const saltrounds = 10
    const hashedpassword = bcrypt.hashSync(password, saltrounds)
    return hashedpassword
}

export const userModel = mongoose.model('user', userSchema)