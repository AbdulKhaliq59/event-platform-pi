import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();

const port = process.env.PORT || 4040;
console.log("MONGO PASSWORD", process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dat24l6.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  tls: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.listen(port, () => console.log(`Server started on port ${port}`));
