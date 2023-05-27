import { z } from "zod";
import { UserRole } from "@prisma/client";

const registerSchema = z.object({
  email: z.string().min(1, { message: "Email is missing" }),
  fullName: z
    .string()
    .min(1, { message: "Full name is missing" })
    .max(30, { message: "Full Name must be of maximum 30 Long character" }),
  password: z
    .string()
    .min(5, { message: "Password must be of minimum 5 characters long" })
    .max(30, { message: "Password must be of  maximum 30 characters long" }),
  role: z.nativeEnum([UserRole.DOCTOR, UserRole.PATIENT], {
    errorMap: (issue, ctx) => {
      return { message: "Role is missing or invalid " };
    },
  }),
});

export default registerSchema;
