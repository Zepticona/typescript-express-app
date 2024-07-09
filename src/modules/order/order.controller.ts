import { Request, Response } from "express";
import orderService from "./order.service";
import orderSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = orderSchema.safeParse(req.body);

    // If validation fails, throw new error skipping the rest
    if (!order.success) throw new Error(order.error.issues[0].message);

    const result = await orderService.createOrderIntoDB(order.data);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Unknown error occured!",
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    let result;
    if (email) {
      result = await orderService.getUserOrdersFromDB(email as string);
    } else {
      result = await orderService.getAllOrdersFromDB();
    }

    if (!result.length) throw new Error();

    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for ${email}`
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Order not found!",
      error: err,
    });
  }
};

export default {
  createOrder,
  getAllOrders,
};
