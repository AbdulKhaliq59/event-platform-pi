import { v2 as cloudinaryV2 } from "cloudinary";
import dotenv from "dotenv";
import Event from "../Database/Models/event.js";

dotenv.config();

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addEvent = async (req, res) => {
  try {
    const { title, date, location, ticketSlots, pictureUrl } = req.body;
    if (!title || !date || !location || !ticketSlots) {
      return res.status(400).json({
        success: false,
        error: " title, date, location, and ticketSlots are required fields.",
      });
    }

    const newEvent = new Event({
      title,
      date,
      location,
      ticketSlots,
    });

    if (pictureUrl) {
      const result = await cloudinaryV2.uploader.upload(pictureUrl, {
        folder: "event-pictures",
      });
      newEvent.pictureUrl = result.secure_url;
    }

    const savedEvent = await newEvent.save();

    return res.status(201).json({
      success: true,
      event: savedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const events = await Event.find({ date: { $gte: today } });
    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, location, ticketSlots, pictureUrl } = req.body;
    const updatedFields = {
      title,
      date,
      location,
      ticketSlots,
    };

    // Check if pictureUrl is provided
    if (pictureUrl) {
      // Upload the pictureUrl to cloudinary
      const result = await cloudinaryV2.uploader.upload(pictureUrl, {
        folder: "event-pictures",
      });
      // Set the pictureUrl in the updatedFields
      updatedFields.pictureUrl = result.secure_url;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
