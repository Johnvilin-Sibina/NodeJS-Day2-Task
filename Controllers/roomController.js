const rooms = [
  {
    id: 1,
    roomName: "Room 1",
    seatsAvailable: 100,
    amenities: "TV, AC, WiFi, Projector",
    pricePerHour: "Rs.125",
    status: "Booked",
  },
  {
    id: 2,
    roomName: "Room 2",
    seatsAvailable: 100,
    amenities: "TV, Fan, WiFi",
    pricePerHour: "Rs.90",
    status: "Booked",
  },
  {
    id: 3,
    roomName: "Room 3",
    seatsAvailable: 75,
    amenities: "TV, AC, WiFi, Projector",
    pricePerHour: "Rs.100",
    status: "Booked",
  },
  {
    id: 4,
    roomName: "Room 4",
    seatsAvailable: 150,
    amenities: "TV, AC, WiFi, Projector",
    pricePerHour: "Rs.150",
    status: "Available",
  },
  {
    id: 5,
    roomName: "Room 5",
    seatsAvailable: 90,
    amenities: "TV, AC, WiFi, Projector",
    pricePerHour: "Rs.115",
    status: "Available",
  },
];

const bookings = [
    {
      id: 1,
      customerName: "Robert",
      bookedDate: new Date("2024-05-12"),
      eventDate: "25-05-2024",
      startTime: "9 AM",
      endTime: "2 PM",
      roomId: 1,
      bookingId: 1,
    },
    {
      id: 2,
      customerName: "Kavitha",
      bookedDate:new Date("2024-05-12"),
      eventDate: "15-05-2024",
      startTime: "4 PM",
      endTime: "10 PM",
      roomId: 2,
      bookingId: 2,
    },
    {
      id: 3,
      customerName: "Adam",
      bookedDate:new Date("2024-05-13"),
      eventDate: "20-05-2024",
      startTime: "10 AM",
      endTime: "5 PM",
      roomId: 3,
      bookingId: 3,
    },
  ];

//Fetch all the rooms
export const getRooms = (req, res) => {
  res.status(200).json({ data: rooms });
};

//Create a new room
export const createRoom = (req, res) => {
  const { roomName, seatsAvailable, amenities, pricePerHour, status } =
    req.body;
  const newRoom = {
    id: rooms.length + 1,
    roomName:roomName,
    seatsAvailable:seatsAvailable,
    amenities:amenities,
    pricePerHour:pricePerHour,
    status:status,
  };
  rooms.push(newRoom);
  res.status(200).json({ message: "Room created successfully", data: newRoom });
};

//Fetch all the booking data
export const getBookings = (req, res) => {
  res.status(200).json({ data: bookings });
};

//Book a room
export const bookRoom = (req, res) => {
    const {customerName, eventDate, startTime, endTime, roomId} = req.body;

    // Check for existing bookings for the same room on the same date and time
    const existingBooking = bookings.find(booking => 
        booking.roomId === roomId &&
        booking.eventDate === eventDate &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime))
    );
    //Message to be displayed if the room is already booked for the same date and time
    if (existingBooking) {
        return res.status(400).json({message: "Room is already booked for the given date and time"});
    }

    //If the room is not already booked for the same date and time book the room
    const newBooking = {
        id: bookings.length + 1,
        customerName:customerName,
        bookedDate:new Date(),
        eventDate:eventDate,
        startTime:startTime,
        endTime:endTime,
        roomId:roomId,
        bookingId: bookings.length + 1
    };
    bookings.push(newBooking);
    const room = rooms.find(room => room.id === roomId);
    if (room) {
        room.status = "Booked";
    }
    res.status(200).json({message: "Room booked successfully", data: newBooking});
};

//List all rooms with booked data
export const getBookedRooms = (req, res) => {
  const bookedRooms = rooms.filter((room) => room.status === "Booked");
  res
    .status(200)
    .json({ message: "Booked rooms fetched successfully", data: bookedRooms });
};

//List all customers with booked data
export const getAllCustomersWithBookedData = (req, res) => {
  const customerBookings = bookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room.roomName,
      date: booking.eventDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });
  res
    .status(200)
    .json({
      message: "Customer bookings fetched successfully",
      data: customerBookings,
    });
};

//List how many times a customer has booked the rooms
export const getCustomerBookings = (req, res) => {
  const { customerName } = req.query;
  const customerBookings = bookings.filter(
    (booking) => booking.customerName === customerName
  );
  if (customerBookings.length === 0) {
    return res
      .status(404)
      .json({ message: "No bookings found for this customer" });
  }
  const detailedBookings = customerBookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room.roomName,
      date: booking.eventDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.bookingId,
      bookingDate: booking.bookedDate,
      bookingStatus: room.status,
    };
  });
  res
    .status(200)
    .json({
      message: "Customer bookings fetched successfully",
      data: detailedBookings,
    });
};
