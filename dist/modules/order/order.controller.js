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
const order_service_1 = __importDefault(require("./order.service"));
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = order_validation_1.default.safeParse(req.body);
        // If validation fails, throw new error skipping the rest
        if (!order.success)
            throw new Error(order.error.issues[0].message);
        const result = yield order_service_1.default.createOrderIntoDB(order.data);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                success: false,
                message: err.message,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Unknown error occured!",
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        let result;
        if (email) {
            result = yield order_service_1.default.getUserOrdersFromDB(email);
        }
        else {
            result = yield order_service_1.default.getAllOrdersFromDB();
        }
        if (!result.length)
            throw new Error();
        res.status(200).json({
            success: true,
            message: email
                ? `Orders fetched successfully for ${email}`
                : "Orders fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: "Order not found!",
            error: err,
        });
    }
});
exports.default = {
    createOrder,
    getAllOrders,
};
