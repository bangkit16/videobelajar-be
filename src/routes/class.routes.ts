import { Router } from "express";
import { ClassController } from "../controller/class.controller";

const router = Router();

router.get("/", ClassController.index);

export default router;
