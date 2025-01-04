import { useState } from "react";
import { toast } from "react-toastify";
import GetModal from "../components/GetModal";
import BookingFormModal from "../components/BookingFormModal";

const Home = () => {
  const url = "https://assignment2-pegx.onrender.com";

  const [modalOpen, setModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [contactInput, setContactInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleFetchBookings = async () => {
    if (!contactInput) {
      toast.error("Please enter your contact details.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/bookings/user/${contactInput}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBookings(data);
          toast.success("Bookings fetched successfully!");
        } else {
          setBookings([]);
          toast.info("No bookings found for this contact number.");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Could not fetch bookings.");
      }
    } catch (error) {
      toast.error("Error fetching bookings.");
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`${url}/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Booking deleted.");
        setBookings(bookings.filter((booking) => booking._id !== id));
      } else {
        toast.error("Could not delete booking.");
      }
    } catch (error) {
      toast.error("Error deleting booking.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setContactInput("");
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-xl text-gray-600 font-semibold text-center">Restaurant Booking System</h2>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={() => setFormModalOpen(true)}
            className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg"
          >
            Make a Booking
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg"
          >
            View Booking Details
          </button>
        </div>

        {showConfirmation && bookingDetails && (
          <div className="mt-6 p-8 bg-gradient-to-r from-card to-primary text-white rounded-lg shadow-xl max-w-lg mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Booking Confirmed!</h3>
              <p className="text-lg mb-6">Your reservation details are below, made at <span class="font-bold">{bookingDetails.timestamp}</span></p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-500">Name:</span>
                <span className="text-xl font-bold">{bookingDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-500">Date:</span>
                <span className="text-xl font-bold">{bookingDetails.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-500">Time:</span>
                <span className="text-xl font-bold">{bookingDetails.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-500">Guests:</span>
                <span className="text-xl font-bold">{bookingDetails.guests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-500">Contact:</span>
                <span className="text-xl font-bold">{bookingDetails.contact}</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-bold">Looking forward to your visit.</p>
            </div>
          </div>
        )}

        <BookingFormModal
          formModalOpen={formModalOpen}
          closeFormModal={closeFormModal}
          url={url}
          setBookings={setBookings}
          setShowConfirmation={setShowConfirmation}
          setBookingDetails={setBookingDetails}
        />

        <GetModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          handleFetchBookings={handleFetchBookings}
          contactInput={contactInput}
          setContactInput={setContactInput}
          bookings={bookings}
          loading={loading}
          handleDeleteBooking={handleDeleteBooking}
        />
      </div>
    </div>
  );
};

export default Home;
