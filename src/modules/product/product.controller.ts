import productServices from "./product.service";
import { Request, Response } from "express";
import productSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productSchema.parse(req.body);

    const result = await productServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "An error occured!",
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let result;

    if (searchTerm) {
      const allProducts = await productServices.getAllProductsFromDB();

      result = productServices.searchProductFromDB(
        allProducts,
        searchTerm as string
      );
    } else {
      result = await productServices.getAllProductsFromDB();
    }

    if (!result.length) throw new Error();

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched succesfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      messsage: "An error occured!",
      error: err,
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      messsage: "No products found!",
      error: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productUpdate = req.body;
    const result = await productServices.updateProductInDB(
      productId,
      productUpdate
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      messsage: "An error occured!",
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await productServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      messsage: "An error occured!",
      error: err,
    });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
