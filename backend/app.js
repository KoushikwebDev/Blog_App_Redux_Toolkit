import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import RouterUser from "./routes/user.routes.js";
import connectToMongo from "./config/database.js";

connectToMongo();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: ["*"], // here we can set multiple origin
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/v1", RouterUser);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
