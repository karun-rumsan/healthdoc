import { Router } from "express";
import * as requestCtrl from "../controller/requestCtrl.js";

const router = Router();

router.post("/patientrequest", requestCtrl.patientRequest);

router.patch("/doctorresponse/:userid", requestCtrl.doctorResponse);

router.get("/getpatientrequest", requestCtrl.getPatientRequest);
export default router;
