import prisma from "../../constants/config.js";

const doctorResponseService = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const updateData = await prisma.doctor.update({
      where: {
        id: userid,
      },
      data: {
        patientRequest: true,
      },
    });

    return res.status(201).json("Data updated succesfully");
  } catch (error) {
    return res.status(201).json(error);
  }
};

export default doctorResponseService;
