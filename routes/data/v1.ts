import * as express from "express";
import DataController from "../../controllers/data.getter/data.controller";
import userAuth from "../../middleware/userAuth";
const router = express.Router();

/**
 *  user data
 */
router.get("/user", userAuth, DataController.getUserInfo);

/**
 *  store data
 */
router.get("/stores", userAuth, DataController.getUserStores);
router.get("/categories/:storeId", userAuth, DataController.getStoreCategories);
router.get(
  "/store/products/:storeId",
  userAuth,
  DataController.getStoreProducts
);

/**
 *  categories data
 */
router.get(
  "/category/products/:categoryId",
  userAuth,
  DataController.getCategoryProducts
);

/**
 * product data
 */
router.get("/product/:productId", userAuth, DataController.getProductDetails);

export default router;
