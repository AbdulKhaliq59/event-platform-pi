import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.controller.js";
import { validateDate } from "../middlewares/validator.js";
import {
  bookTicket,
  cancelTicket,
  getUserTickets,
} from "../controllers/booking.controller.js";
import { isAdmin, isAuthorized } from "../middlewares/protected.js";

const router = express.Router();

router.post("/event", isAdmin, validateDate, addEvent);
router.get("/events", getAllEvents);
router.get("/event/:id", getEventById);
router.delete("/event/:id", isAdmin, deleteEvent);
router.patch("/event/:id", isAdmin, updateEvent);
router.post("/booking", isAuthorized, bookTicket);
router.get("/user/tickets", isAuthorized, getUserTickets);
router.delete("/user/tickets/:ticketId", isAuthorized, cancelTicket);

export default router;
