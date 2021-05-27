import * as express from "express";
import DataController from "../../controllers/data.getter/data.controller";
const router = express.Router();

/**
 *  user data
 */
router.get("/user", DataController.getUserInfo);

/**
 *  store data
 */
router.get("/stores", DataController.getUserStores);
router.get("/categories/:storeId", DataController.getStoreCategories);
router.get("/store/products/:storeId", DataController.getStoreProducts);

/**
 *  categories data
 */
router.get(
  "/category/products/:categoryId",
  DataController.getCategoryProducts
);

/**
 * product data
 */
router.get("/product/:productId", DataController.getProductDetails);

export default router;
