import mongoose from "mongoose";

mongoose.connection.on('error', (err) => {
    console.log(err)
})