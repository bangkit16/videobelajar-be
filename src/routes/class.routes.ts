import { Router } from "express";
import { ClassController } from "../controller/class.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", AuthMiddleware.verifyToken, ClassController.index);
router.get("/:id", ClassController.detail);
router.post("/", ClassController.create);
router.put("/:id", ClassController.update);
router.delete("/:id", ClassController.delete);

router.post("/upload", () => {});

export default router;
