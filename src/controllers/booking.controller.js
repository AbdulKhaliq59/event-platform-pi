import Booking from "../Database/Models/booking.js";
import Event from "../Database/Models/event.js";

export const bookTicket = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;
    const userId = req.userId; // Access userId from the request object

    // Validate required fields
    if (!eventId || !userId || !numberOfTickets) {
      return res.status(400).json({
        success: false,
        error: "eventId, userId, and numberOfTickets are required fields.",
      });
    }

    // Find event and check available ticket slots
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }
    if (event.ticketSlots < numberOfTickets) {
      return res.status(400).json({
        success: false,
        error: "Not enough available ticket slots.",
      });
    }

    // Create new booking
    const newBooking = new Booking({
      eventId,
      userId,
      numberOfTickets,
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Update available ticket slots for the event
    event.ticketSlots -= numberOfTickets;
    await event.save();

    return res.status(201).json({
      success: true,
      booking: savedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const cancelTicket = async (req, res) => {
  try {
    const userId = req.userId; // Access userId from the request object
    const { ticketId } = req.params; // Access ticketId from URL parameters

    // Find the booking by ticketId and userId
    const booking = await Booking.findOne({ _id: ticketId, userId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Ticket not found.",
      });
    }

    // Delete the booking
    await Booking.deleteOne({ _id: ticketId, userId });

    // Retrieve event associated with the cancelled booking
    const event = await Event.findById(booking.eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    // Increase available ticket slots for the event
    event.ticketSlots += booking.numberOfTickets;
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Ticket canceled successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const userId = req.userId;
    const userTickets = await Booking.find({ userId }).populate("eventId");

    const formattedTickets = userTickets.map((ticket) => ({
      id: ticket._id,
      title: ticket.eventId.title,
      date: ticket.eventId.date,
      ticketSlots: ticket.numberOfTickets,
      bookingDate: ticket.bookingDate,
    }));

    return res.status(200).json({
      success: true,
      tickets: formattedTickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getBookedTickets = async (req, res) => {
  try {
    const allTickets = await Booking.find().populate("eventId");

    const formattedTickets = allTickets.map((ticket) => {
      const totalTickets = ticket.eventId.ticketSlots;
      const bookedTickets = ticket.numberOfTickets;
      const ticketRemain = totalTickets - bookedTickets;
      const attendee = ticket.numberOfTickets;

      return {
        id: ticket._id,
        title: ticket.eventId.title,
        date: ticket.eventId.date,
        location: ticket.eventId.location,
        attendee: attendee,
        ticketRemain: ticketRemain <= 0 ? "Soldout" : ticketRemain,
      };
    });

    return res.status(200).json({
      success: true,
      tickets: formattedTickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
