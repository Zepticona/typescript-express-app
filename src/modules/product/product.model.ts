import { model, Schema } from "mongoose";
import {
  TProduct,
  TInventory,
  TVariant,
  ProductModel,
} from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
  },
});

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

productSchema.static(
  "getSearchResults",
  function (products: TProduct[], query: string): TProduct[] {
    return products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(query.toLowerCase()) ||
        prod.description.toLowerCase().includes(query.toLowerCase())
    );
  }
);

const Product = model<TProduct, ProductModel>("Products", productSchema);

export default Product;
