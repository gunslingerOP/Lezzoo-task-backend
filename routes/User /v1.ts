import * as express from "express";
const router = express.Router();
import UserController from "../../controllers/user.operations/user.controller";

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
