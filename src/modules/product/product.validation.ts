import { z } from "zod";

// Define the Variant schema
const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Inventory schema
const inventorySchema = z.object({
  quantity: z.number({ required_error: "Quantity is required" }),
  inStock: z.boolean({ required_error: "inStock status is required" }),
});

// Define the Product schema
const productSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({ message: "Description is required" }),
  price: z.number({ required_error: "Price is required" }),
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Invalid category",
  }),
  tags: z.array(z.string({ message: "Tag cannot be empty" }), {
    required_error: "Tags are required",
  }),
  variants: z.array(variantSchema, {
    required_error: "Variants are required",
  }),
  inventory: inventorySchema,
});

export default productSchema;
