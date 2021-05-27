import * as express from "express";
import StoreResources from "../../controllers/store.operations/store.resources.controller";
const router = express.Router();

router.post("/store/:id", StoreResources.addStoreImage);
router.post("/category/:id", StoreResources.addCategoryImage);
router.post("/product/:id", StoreResources.addProductImage);

export default router;
