import Product from "../product/product.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
  const product = await Product.find({ _id: order.productId });

  // Generating custom error message for invalid product ID
  if (product.length === 0)
    throw new Error(
      `Invalid productId! No product found with ID ${order.productId}`
    );

  // Throwing custom error message for insufficient quantity
  if (product[0].inventory.quantity < order.quantity)
    throw new Error(`Insufficient quantity available in inventory`);

  // Preventing order with 0 quantity
  if (order.quantity === 0)
    throw new Error("Cannot place an order with 0 quantity!");

  // Creating order
  const result = await Order.create(order);
  const currentQunatity = product[0].inventory.quantity - order.quantity;
  let updatedProduct;

  if (currentQunatity === 0) {
    updatedProduct = await Product.findByIdAndUpdate(
      order.productId,
      { "inventory.quantity": currentQunatity, "inventory.inStock": false },
      { new: true }
    );
  } else {
    updatedProduct = await Product.findByIdAndUpdate(
      order.productId,
      { "inventory.quantity": currentQunatity },
      { new: true }
    );
  }

  // Sending the created order and updated product
  return { order: result, product: updatedProduct };
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();

  return result;
};

const getUserOrdersFromDB = async (email: string) => {
  const result = await Order.find({ email });

  return result;
};

export default {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getUserOrdersFromDB,
};
