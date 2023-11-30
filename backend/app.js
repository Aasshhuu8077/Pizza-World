import express from "express"
// routes
import { authRouter } from "./routes/auth.routes.js"
import { orderRouter } from "./routes/order.routes.js"
import { foodRouter } from "./routes/food.routes.js"
import { deliveryBoyRouter } from "./routes/deliveryboy.routes.js" 
// middlewares
import cors from "cors"
import { sessionMiddleware } from "./middleware/session.middleware.js"
import cookieparser from "cookie-parser"

export const app = express()

app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}
))
app.use(cookieparser())
app.use(express.json())
app.use(sessionMiddleware)
app.use("/auth", authRouter)
app.use("/order", orderRouter)
app.use("/food", foodRouter)
app.use("/deliveryboy", deliveryBoyRouter)