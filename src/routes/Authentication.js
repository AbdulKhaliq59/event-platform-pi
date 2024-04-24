import express from "express";
import { login, signup } from "../controllers/user.controller.js";
import {
  loginSchema,
  signupSchema,
  validateUserInput,
} from "../middlewares/validator.js";

const router = express.Router();

router.post("/signup", validateUserInput(signupSchema), signup);
router.post("/signin", validateUserInput(loginSchema), login);

export default router;
