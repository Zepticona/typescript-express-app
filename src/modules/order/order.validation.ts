import { z } from "zod";

const orderSchema = z.object({
  email: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .email({ message: "Invalid email detected" }),

  productId: z.string({
    required_error: "Product ID is required",
  }),

  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),

  price: z.number({
    message: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
});

export default orderSchema;
