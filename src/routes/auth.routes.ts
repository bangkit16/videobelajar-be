import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify-email/:token", AuthController.verifyEmail);

export default router;
