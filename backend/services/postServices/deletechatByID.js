import prisma from "../../constants/config.js";

const deleteChatById = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  await prisma.message.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json({ Message: "Delete Sucessfull" });
};

export default deleteChatById;
