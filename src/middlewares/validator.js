import Joi from "joi";
import moment from "moment";

// Define Joi schemas for user signup and login input validation
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware function for validating user input
export const validateUserInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateDate = (req, res, next) => {
  const { date } = req.body;
  if (!date) {
    return res.status(400).json({
      success: false,
      error: "Date is required.",
    });
  }

  // Check if the date is a valid date and is today or after today
  const currentDate = moment().startOf("day");
  const inputDate = moment(date, "YYYY-MM-DD", true);
  console.log("Today", currentDate);
  if (!inputDate.isValid() || inputDate.isBefore(currentDate)) {
    return res.status(400).json({
      success: false,
      error: "Date must be a valid date starting from today.",
    });
  }

  next();
};

