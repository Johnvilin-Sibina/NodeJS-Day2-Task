import express from "express";
import { bookRoom, createRoom, getBookedRooms, getBookings, getRooms, getCustomerBookings, getAllCustomersWithBookedData } from "../Controllers/roomController.js";

const router = express.Router();

router.get('/get-rooms', getRooms);
router.post('/create-room', createRoom);
router.get('/get-bookings', getBookings);
router.post('/book-room', bookRoom);
router.get('/booked-rooms', getBookedRooms);
router.get('/customers-booked-data', getAllCustomersWithBookedData);
router.get('/customer-bookings', getCustomerBookings);

export default router;


