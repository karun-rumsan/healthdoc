import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const signUp = (formData) => API.post("/register", formData);
export const signIn = (formData) => API.post("/login", formData);
export const whoami = () => API.get("/whoami");
export const exist = () => API.post("/logout");
export const getForUser = () => API.get("/getall");

export const requsetForDoctor = (requestData) =>
  API.post("/patientrequest", requestData);

export const getRequest = () => API.get("/getpatientrequest");

export const doctorResponse = (id) => API.patch(`/doctorresponse/${id}`);

export const getmessageById = (id) => API.get(`/chat/${id}`);
export const postChatMessageByID = (arg) =>
  API.post(`/chat/${arg.id}`, { message: arg.message });

export const deleteChatId = (id) => API.delete(`/chat/${id}`);
