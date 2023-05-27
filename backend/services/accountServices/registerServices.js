import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const registerService = async (req, res, next) => {
  try {
    const { email, fullName, password, role } = req.body;

    /* ---------------Check whether email exist---------------*/

    const emailExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    /* ---------------Hashed Password---------------*/

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------------CreateUser---------------*/

    const account = await prisma.user.create({
      data: {
        email: email,
        fullName: fullName,
        password: hashedPassword,
        posts: role,
      },
    });

    // console.log(account);
    req.session.userId = account.id;

    return await res.status(201).json({ status: "created", account });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ messgae: "Something went wrong" });
  }
};

export default registerService;
