import * as express from "express";
import StoreController from "../../controllers/store.operations/store.controller";
import userAuth from "../../middleware/userAuth";
const router = express.Router();

router.post("/create", userAuth, StoreController.addStore);
router.post("/category/:storeId", userAuth, StoreController.addCategory);
router.post("/product/:categoryId", userAuth, StoreController.addProduct);

export default router;
