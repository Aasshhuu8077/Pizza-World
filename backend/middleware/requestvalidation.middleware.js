import { validationResult } from "express-validator"

export function authmiddleware(req, res, next){
    /**
     * check for the error in the validation
     * check if the user is logged in or not
     * set the property of auth property to the request
     */
    var errors = validationResult(req)
    var session = req.session
    if(errors.isEmpty() && session.isloggedin){
        req.auth = true
    }
    else{
        req.auth = false
        req.valerror = errors
    }
    next()
}

export function adminAuthMiddelware(req, res, next){
    var errors = validationResult(req)
    var session = req.session
    if(errors.isEmpty() && session.isloggedin && session.role === "admin"){
        req.auth = true
    }
    else{
        req.auth = false
        req.valerror = errors
    }
    next()
}