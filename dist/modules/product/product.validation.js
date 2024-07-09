"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Variant schema
const variantSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
// Define the Inventory schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number({ required_error: "Quantity is required" }),
    inStock: zod_1.z.boolean({ required_error: "inStock status is required" }),
});
// Define the Product schema
const productSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: zod_1.z.string({ message: "Description is required" }),
    price: zod_1.z.number({ required_error: "Price is required" }),
    category: zod_1.z.string({
        required_error: "Category is required",
        invalid_type_error: "Invalid category",
    }),
    tags: zod_1.z.array(zod_1.z.string({ message: "Tag cannot be empty" }), {
        required_error: "Tags are required",
    }),
    variants: zod_1.z.array(variantSchema, {
        required_error: "Variants are required",
    }),
    inventory: inventorySchema,
});
exports.default = productSchema;
