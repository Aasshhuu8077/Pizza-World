import axios from "axios";
import { sessionMiddleware } from "./middleware/session.middleware.js"
import { userModel } from "./models/user.model.js";
import { eventEmitter } from "./server.js"
export function configureSocketServer(io) {
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware))
    io.use((socket, next) => {
        // this middelware will set if the socket data according to admin
        var session = socket.request.session
        socket.data.role = session.role
        next()
    })
    io.use(async (socket, next) => {
        var session = socket.request.session
        // use axios here
        // here i have used the url
        if (session.isloggedin) {
            var url = "http://localhost:4000/auth/updateuserbyid"
            var response = await axios.put(url, {
                userid: session._id,
                updates: {
                    socketid: socket.id
                }
            })
            if (response.data.message === "successfull") {
                next()
            }
            else {
                next(new Error("Socketid updation error"))
            }
        }
    })
    io.on("connection", async (socket) => {
        if (socket.data.role === "admin") {
            socket.join("admin-room")
            socket.on("set-deliveryboy-order", async (data) => {
                /** 
                 * data will contain the order-id
                 * get the room-id from order-id 
                 * send the message to the room
                 */
                console.log("seting the delivery boy")
                // send message to the delivery boy to delivery the order
            })
        }
        else if(socket.data.role === "deliveryboy") {
            // create a room for the user
            console.log("user-connected")
            socket.join("deliveryboy-room")
        }
    })

    eventEmitter.on("orderplaced", (data) => {
        io.to('admin-room').emit("orderplaced", data)
    })

    eventEmitter.on("statusupdate", async (data) => {
        var query = userModel.findById(data.user_id)
        var res = await query.exec()
        io.to(res.socketid).emit("statusupdate", data.result)
    })

}
