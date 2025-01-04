import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookingFormModal = ({ formModalOpen, closeFormModal, url, setBookings, setShowConfirmation, setBookingDetails }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!date) return;

            try {
                const response = await fetch(`${url}/api/bookings/availability/${date}`);
                if (response.ok) {
                    const data = await response.json();
                    setAvailableSlots(data);
                } else {
                    toast.error("Failed to fetch available slots.");
                }
            } catch (error) {
                toast.error("Error fetching available slots.");
            }
        };

        fetchAvailableSlots();
    }, [date]);

    const handleBooking = async () => {
        if (!date || !time || !guests || !name || !contact) {
            toast.error("All fields are required.");
            return;
        }

        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(contact)) {
            toast.error("Please enter a valid 10-digit contact number.");
            return;
        }

        try {
            const response = await fetch(`${url}/api/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date, time, guests, name, contact }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Booking confirmed!");

                setBookingDetails({
                    ...data.booking,
                    timestamp: new Date().toLocaleString(),
                });
                setShowConfirmation(true);
                setBookings((prev) => [...prev, data.booking]);
                closeFormModal();
            } else {
                toast.error("Booking failed, try again.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    if (!formModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg w-96 shadow-lg">
                <button
                    onClick={closeFormModal}
                    className="absolute top-1 right-3 font-bold text-2xl text-red-700 hover:text-red-900"
                >
                    &times;
                </button>

                <h3 className="text-lg font-semibold text-gray-600 text-center mb-4">Book a Table</h3>
                <div className="space-y-3">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a time slot</option>
                        {availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        placeholder="Number of guests"
                        min={1}
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                    />
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your contact number"
                    />
                    <button
                        onClick={handleBooking}
                        className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 mb-4 rounded-lg"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingFormModal;