import prisma from "../../constants/config.js";

const postChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        posts: true,
      },
    });

    const msg = await prisma.message.create({
      data: {
        userId: id,
        post: getPost.posts,
        message: req.body.message,
      },
    });

    return res.status(201).json(msg);
  } catch (error) {
    return res.status(500).json("Somethinh went wrong");
  }
};

export default postChatById;
