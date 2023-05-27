import doctorResponseService from "../services/requestService/doctorResponseService.js";
import getPatientRequestService from "../services/requestService/getPatientRequestService.js";
import patientRequestService from "../services/requestService/patientRequestServices.js";

const patientRequest = async (req, res) => {
  await patientRequestService(req, res);
};

const doctorResponse = async (req, res) => {
  await doctorResponseService(req, res);
};

const getPatientRequest = async (req, res) => {
  await getPatientRequestService(req, res);
};

export { patientRequest, doctorResponse, getPatientRequest };
