import * as express from "express";
import StoreResources from "../../controllers/store.operations/store.resources.controller";
import userAuth from "../../middleware/userAuth";
const router = express.Router();

router.post("/store/:id", userAuth, StoreResources.addStoreImage);
router.post("/category/:id", userAuth, StoreResources.addCategoryImage);
router.post("/product/:id", userAuth, StoreResources.addProductImage);

export default router;
