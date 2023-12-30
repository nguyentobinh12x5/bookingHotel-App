import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const createdRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    const hotel = await Hotel.findOne({ rooms: req.params.id });
    if (hotel) {
      hotel.rooms = hotel.rooms.filter((room) => room != req.params.id);
      await hotel.save();
    }
    res.status(200).json("Delete Room Successfull");
  } catch (err) {
    res.status(404).json(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updateRoom);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const updateRoomAvailability = async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates },
      }
    );
    res.status(200).json("Room updated");
  } catch (err) {
    res.status(404).json(err);
  }
};
