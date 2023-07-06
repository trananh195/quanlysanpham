import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";

let productRouter = {
    '/products': productController.showAll,
    '/add-product': productController.showFormAdd,
    '/edit-product': productController.editProduct,
    '/delete-product':productController.deleteProduct,
}

export default productRouter;
