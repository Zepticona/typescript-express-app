"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    })
        .email({ message: "Invalid email detected" }),
    productId: zod_1.z.string({
        required_error: "Product ID is required",
    }),
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    }),
    price: zod_1.z.number({
        message: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
});
exports.default = orderSchema;
