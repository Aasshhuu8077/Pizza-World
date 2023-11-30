import session from "express-session"
import exsession from "express-sessions"
import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

export const sessionMiddleware = session({
    secret : 'THISISSECRET',
    resave : false,
    saveUninitialized : true,
    genid : function (req){
        return uuidv4()
    },
    cookie : {maxAge : 1000*60*60*24},
    name : "token",
    store : new exsession({
        storage : 'mongodb',
        instance : mongoose,
        collection: 'sessions',
        expire: 86400
    }),
})