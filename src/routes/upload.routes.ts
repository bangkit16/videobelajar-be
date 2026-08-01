import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { UploadController } from "../controller/upload.controller";

const router = Router();

router.post("/", upload.single("file"), UploadController.upload);

export default router;
