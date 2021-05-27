import * as express from "express";
import StoreController from "../../controllers/store.operations/store.controller";
const router = express.Router();

router.post("/add", StoreController.addStore);
router.post("/category/:storeId", StoreController.addCategory);
router.post("/product/:categoryId", StoreController.addProduct);

export default router;
