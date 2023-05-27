import { Router } from "express";
import * as acountCtrl from "../controller/accountCtrl.js";
import authRequires from "../middleware/authRequires.js";
import validateRequestBody from "../middleware/validatorBody.js";
import loginSchema from "../schema/accountSchema/loginSchema.js";
import registerSchema from "../schema/accountSchema/registerSchema.js";

const router = Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  acountCtrl.register
);

router.post("/login", validateRequestBody(loginSchema), acountCtrl.login);

router.post("/logout", acountCtrl.logout);

router.get("/whoami", acountCtrl.whoamI);
router.get("/getall", authRequires, acountCtrl.getAll);

export default router;
