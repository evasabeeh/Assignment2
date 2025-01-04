import React from "react";

const GetModal = ({
    modalOpen,
    closeModal,
    handleFetchBookings,
    contactInput,
    setContactInput,
    bookings,
    loading,
    handleDeleteBooking,
}) => {
    if (!modalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg w-96 shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-3 font-bold text-2xl text-red-700 hover:text-red-900"
                    aria-label="Close"
                >
                    &times;
                </button>

                <h3 className="text-lg text-gray-600 font-semibold mb-4 text-center">Get Booking Details</h3>

                <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Enter your contact number"
                />

                <button
                    onClick={handleFetchBookings}
                    className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg mb-4"
                >
                    View Bookings
                </button>

                {loading && <p className="text-center">Loading...</p>}

                {!loading && bookings.length === 0 && (
                    <p className="text-center text-gray-500"> </p>
                )}
                {!loading && bookings.length > 0 && (
                    <ul className="space-y-1 mt-4">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="bg-gradient-to-r from-card to-primary p-4 rounded-md">
                                <p class="text-black">
                                    Date:<span class="text-white font-bold px-2"> {booking.date} </span>
                                </p>
                                <p class="text-black">
                                    Time:<span class="text-white font-bold px-2"> {booking.time} </span>
                                </p>
                                <p class="text-black">
                                    Guests:<span class="text-white font-bold px-2"> {booking.guests} </span>
                                </p>
                                <p class="text-black">
                                    Name:<span class="text-white font-bold px-2"> {booking.name} </span>
                                </p>
                                <p class="text-black">
                                    Contact:<span class="text-white font-bold px-2"> {booking.contact} </span>
                                </p>
                                <button
                                    onClick={() => handleDeleteBooking(booking._id)}
                                    className="mt-2 bg-red-400 hover:bg-red-800 text-white py-1 px-3 rounded-lg"
                                >
                                    Delete Booking
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GetModal;
