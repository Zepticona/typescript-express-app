import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);

  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();

  return result;
};

const getProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });

  return result;
};

const updateProductInDB = async (id: string, productUpdate: object) => {
  const result = await Product.findByIdAndUpdate(id, productUpdate, {
    new: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

const searchProductFromDB = (products: TProduct[], query: string) => {
  const result = Product.getSearchResults(products, query);

  return result;
};

export default {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductFromDB,
};
