import { Router } from "express";
import { ClassController } from "../controller/class.controller";

const router = Router();

router.get("/", ClassController.index);
router.get("/:id", ClassController.detail);
router.post("/", ClassController.create);
router.put("/:id", ClassController.update);
router.delete("/:id", ClassController.delete);

export default router;
