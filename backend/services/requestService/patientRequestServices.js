import prisma from "../../constants/config.js";

const patientRequestService = async (req, res) => {
  const { id, doctorName, age, cause, appointment } = req.body;

  try {
    const patientUser = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    await prisma.doctor.create({
      data: {
        doctorId: id,
        doctorName: doctorName,
        age: age,
        cause: cause,
        patientName: patientUser.fullName,
        patientId: patientUser.id,
        appointment: appointment,
      },
    });

    return res.status(201).json({ response: "Request send" });
  } catch (error) {
    return res.status(500).json(JSON.stringify(error.message));
  }
};

export default patientRequestService;
