import prisma from "../../constants/config.js";

const getAll = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const getChat = await prisma.message.findMany({
      where: {
        userId: id,
      },
      // select: {
      //   message: true,
      // },
    });
    // console.log(getChat);
    // console.log(req.session.userId);
    console.log(getChat.length);
    return res.status(201).json(getChat);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default getAll;
