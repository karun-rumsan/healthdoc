import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const loginService = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log(prisma.session);
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!data) {
      return res.status(404).json({
        authed: false,
        message: "Invalid Credentials",
      });
    }

    /* -----check for the password------*/
    const passwordCorrect = await bcrypt.compare(password, data.password);
    if (!passwordCorrect) {
      return res
        .status(400)
        .json({ authed: false, message: "Invalid password" });
    }

    req.session.userId = data.id;
    return res.status(200).json({
      message: "Login Succesfull",
      data,
    });
  } catch (error) {
    return res.status(400).json(error.name);
  }
};

export default loginService;
