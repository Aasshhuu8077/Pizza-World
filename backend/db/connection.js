import mongoose from "mongoose"

export async function connectionWithDb(URI){
    var connection = await mongoose.connect(URI, {
        dbName : "fooddeliveryapp"
    })
    .then((data) => {
        console.log("CONNECTED TO DATABASE!")
        return true
    })
    .catch((err) => {
        console.log(err)
        return false
    })
    return connection
}