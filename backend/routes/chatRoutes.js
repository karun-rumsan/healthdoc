import { Router } from "express";
import * as chatCtrl from "../controller/chatCtrl.js";

const router = Router();

router.post("/chat/:id", chatCtrl.postById);
router.get("/chat/:id", chatCtrl.getChatById);
router.delete("/chat/:id", chatCtrl.deleteById);

export default router;
