import { app } from "./app.js"
import dotenv from "dotenv"
import http from "http"
import { connectionWithDb } from "./db/connection.js"
import { Server } from "socket.io";
import events from "events"
// server configuration
import { configureSocketServer } from "./socket.server.js";
import "./db/dberrorhandler.js"

dotenv.config({ path: "./backend/config.env" })

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "localhost"
const DBURI = process.env.DBURI || "mongodb+srv://pizzaparadisedb:pizzaparadisedb@pizzaparadisecluster.txyj46r.mongodb.net/"

export const eventEmitter = new events.EventEmitter()
const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        credentials: true,
        origin: ["http://localhost:5173"]
    }
})

server.listen(PORT, HOST, async (err) => {
    if (await connectionWithDb(DBURI)) {
        console.log("SERVER STARTED SUCCESSFULLY ON", PORT, HOST)
    }
    else {
        console.log("ERROR OCCURED!")
        server.close()
        console.log("SERVER CLOSED!")
    }
})


configureSocketServer(io)

