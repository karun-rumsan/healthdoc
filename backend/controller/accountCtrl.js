import registerService from "../services/accountServices/registerServices.js";
import loginService from "../services/accountServices/loginServices.js";
import logoutService from "../services/accountServices/logoutServices.js";
import whoamiServices from "../services/accountServices/whoamIServices.js";
import getallServices from "../services/accountServices/getAllServices.js";

const register = async (req, res, next) => {
  await registerService(req, res);
};

const login = async (req, res, next) => {
  await loginService(req, res);
};

const logout = async (req, res, next) => {
  await logoutService(req, res);
};

const whoamI = async (req, res, next) => {
  await whoamiServices(req, res);
};

const getAll = async (req, res, next) => {
  await getallServices(req, res);
};

export { register, login, logout, whoamI, getAll };
