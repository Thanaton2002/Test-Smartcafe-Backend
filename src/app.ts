import express, { Request, Response } from "express";
import "dotenv/config";
import { envConfig } from "./config/env.config";
import authRouter from "./routes/auth.routes";
import menuRouter from "./routes/menu.routes";
import orderRouter from "./routes/order.routes";


const app = express();
const port = envConfig.PORT;

app.use(express.json());

app.use("/api/authen", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);


app.listen(port, () => {
    console.log("Ohiyo!. Our server is running at PORT", port);
});