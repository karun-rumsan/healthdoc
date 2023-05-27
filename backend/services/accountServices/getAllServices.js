import prisma from "../../constants/config.js";

const getallServices = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
      select: {
        role: true,
      },
    });
    // console.log(user.role);
    if (user.role === "ADMIN") {
      const adminList = await prisma.user.findMany({});
      return res.status(200).json({ adminList });
    }
    if (user.role === "USER") {
      const posts = await prisma.user.findUnique({
        where: {
          id: req?.session?.userId,
        },
        select: {
          posts: true,
        },
      });

      const doctorList =
        posts.posts === "PATIENT" &&
        (await prisma.user.findMany({
          where: {
            posts: "DOCTOR",
          },
          select: {
            id: true,
            fullName: true,
          },
        }));

      // console.log(doctorList);
      return res.status(200).json(doctorList);
    }
    return res
      .status(404)
      .json({ message: "You are not allowed to access data" });
  } catch (e) {
    return res.status(500).json(e?.message);
  }
};

export default getallServices;
