import { Reservation } from "../models/reservationSchema.js";
import ErrorHandler from "../error/error.js";

export const sendReservation = async (req, res, next) => {
  // safety check
  if (!req.body) {
    return next(new ErrorHandler("Request body is missing", 400));
  }

  const { firstName, lastName, email, phone, date, time } = req.body;

  // validation check
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(
      new ErrorHandler("Please fill full reservation form!", 400)
    );
  }

  try {
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

    res.status(200).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return next(
        new ErrorHandler(validationErrors.join(", "), 400)
      );
    }

    // fallback error
    return next(new ErrorHandler(error.message, 500));
  }
};