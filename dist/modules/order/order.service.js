"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.find({ _id: order.productId });
    // Generating custom error message for invalid product ID
    if (product.length === 0)
        throw new Error(`Invalid productId! No product found with ID ${order.productId}`);
    // Throwing custom error message for insufficient quantity
    if (product[0].inventory.quantity < order.quantity)
        throw new Error(`Insufficient quantity available in inventory`);
    // Preventing order with 0 quantity
    if (order.quantity === 0)
        throw new Error("Cannot place an order with 0 quantity!");
    // Creating order
    const result = yield order_model_1.default.create(order);
    const currentQunatity = product[0].inventory.quantity - order.quantity;
    let updatedProduct;
    if (currentQunatity === 0) {
        updatedProduct = yield product_model_1.default.findByIdAndUpdate(order.productId, { "inventory.quantity": currentQunatity, "inventory.inStock": false }, { new: true });
    }
    else {
        updatedProduct = yield product_model_1.default.findByIdAndUpdate(order.productId, { "inventory.quantity": currentQunatity }, { new: true });
    }
    // Sending the created order and updated product
    return { order: result, product: updatedProduct };
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getUserOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ email });
    return result;
});
exports.default = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getUserOrdersFromDB,
};
