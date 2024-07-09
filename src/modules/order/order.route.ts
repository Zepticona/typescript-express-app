import { Router } from "express";
import orderController from "./order.controller";

const router = Router();

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);

export default router;
