import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AuthenticationRoutes from "./routes/Authentication.js";
import eventRoutes from "./routes/event.js";
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use("/auth", AuthenticationRoutes);
app.use("/", eventRoutes);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "*** Welcome to Event PM API ***",
  });
});

export { app };
