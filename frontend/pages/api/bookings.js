let bookings = []; // Temporary in-storage

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, contact, date, time, guests } = req.body;

        bookings.push({ name, contact, date, time, guests });

        res.status(200).json({ message: 'Booking created successfully' });
    } else if (req.method === 'GET') {
        res.status(200).json(bookings);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
