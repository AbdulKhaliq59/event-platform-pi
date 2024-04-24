import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/event", addEvent);
router.get("/events", getAllEvents);
router.get("/event/:id", getEventById);
router.delete("/event/:id", deleteEvent);
router.patch("/event/:id", updateEvent);
export default router;
