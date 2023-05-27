import prisma from "../../constants/config.js";

const getPatientRequestService = async (req, res) => {
  // const posts = await prisma.user.findUnique({
  //   where: {
  //     id: req.session.userId,
  //   },
  //   select: {
  //     id: true,
  //     posts: true,
  //     fullName: true,
  //     email: true,
  //   },
  // });
  // // console.log(posts);
  // if (posts.posts === "DOCTOR") {
  //   const patientrequest = await prisma.doctor.findMany({
  //     where: {
  //       patientId: req.session.userId,
  //     },
  //   });

  //   console.log(patientrequest);

  //   return res.status(200).json(patientrequest);
  // } else {
  //   const patientrequest = await prisma.doctor.findMany({});

  //   console.log(patientrequest);

  //   return res.status(200).json(patientrequest);
  // }

  // return res.status(400).json({ message: "Please login as authorized user" });
  try {
    if (!req.session.userId) {
      console.log("Please login");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        posts: true,
      },
    });

    // console.log(user);   \

    if (user.posts === "PATIENT") {
      const list = await prisma.doctor.findMany({
        where: {
          patientId: req.session.userId,
        },
        orderBy: {
          appointment: "asc",
        },
      });
      return res.status(200).json(list);
    } else {
      const list = await prisma.doctor.findMany({
        where: {
          doctorId: req.session.userId,
        },
        orderBy: {
          appointment: "asc",
        },
      });
      return res.status(200).json(list);
    }
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json(error.name);
  }
};

export default getPatientRequestService;
