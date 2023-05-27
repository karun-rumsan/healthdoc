import deleteChatById from "../services/postServices/deletechatByID.js";
import getAll from "../services/postServices/getChatByID.js";
import postChatById from "../services/postServices/postChatByID.js";

const postById = async (req, res) => {
  await postChatById(req, res);
};

const getChatById = async (req, res) => {
  await getAll(req, res);
};

const deleteById = async (req, res) => {
  await deleteChatById(req, res);
};
export { postById, getChatById, deleteById };
