/* ---------------import  Area---------------*/

import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import cors from "cors";
import prisma from "./constants/config.js";
import acountRoutes from "./routes/accountRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT = 5000;

/* ---------------cors---------------*/
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: ["POST", "PUT", "GET", "HEAD", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

/* ---------------session---------------*/

app.use(
  expressSession({
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },

    name: "session",
    secret: "alphabetagammalamda",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

/* ---------------middleware for the req.body file---------------*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------midddleware for the routes-------------------*/

app.use("/api", acountRoutes);
app.use("/api", requestRoutes);
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

/* ---------------listen to the serever---------------*/

app.listen(PORT, (err) => {
  console.log(`SERVER STARTED:${PORT}`);
});
