import prisma from "../../constants/config.js";

const whoamiServices = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        posts: true,
      },
    });

    // console.log(!user);
    if (!user)
      return res
        .status(401)
        .json({ authed: false, message: "You are not login" });

    return res.status(200).json({ authed: true, user });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ authed: false, message: "You are not login" });
  }
};

export default whoamiServices;
