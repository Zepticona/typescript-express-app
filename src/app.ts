import express, { Application, Request, Response } from "express";
import cors from "cors";
import ProductRouter from "./modules/product/product.route";
import OrderRouter from "./modules/order/order.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server!");
});

app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);
app.use("*", function (req: Request, res: Response) {
  res.status(404).send("Route not found");
});

export default app;
