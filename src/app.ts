import express, { Request, Response } from "express";
import "dotenv/config";
import { envConfig } from "./config/env.config";
import authRouter from "./routes/auth.routes";
import menuRouter from "./routes/menu.routes";
import orderRouter from "./routes/order.routes";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import notFoundMiddleware from "./middlewares/notFoundHandler.middleware";
import cors from "cors"


const app = express();
const port = envConfig.PORT;
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use("/api/authen", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


app.listen(port, () => {
    console.log("Ohiyo!. Our server is running at PORT", port);
});