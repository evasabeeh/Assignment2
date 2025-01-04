const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.post("/", async (req, res) => {
    const { date, time, guests, name, contact } = req.body;

    try {
        const existingBooking = await Booking.findOne({ date, time });

        if (existingBooking) {
            return res.status(400).json({ message: "Slot already booked" });
        }

        const newBooking = new Booking({
            date,
            time,
            guests,
            name,
            contact,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking confirmed", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/user/:contact", async (req, res) => {
    const { contact } = req.params;

    try {
        const bookings = await Booking.find({ contact });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/availability/:date", async (req, res) => {
    const { date } = req.params;

    try {
        const bookedSlots = await Booking.find({ date }).select("time");
        const allSlots = [
            "12:00 PM", "01:00 PM", "02:00 PM",
            "03:00 PM", "04:00 PM", "05:00 PM",
            "06:00 PM", "07:00 PM", "08:00 PM",
            "09:00 PM", "10:00 PM",
        ];
        const availableSlots = allSlots.filter(
            (slot) => !bookedSlots.some((booking) => booking.time === slot)
        );
        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;