import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Fuse from "fuse.js";
export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getAllHotel = async (req, res, next) => {
  const { min, max, search, ...others } = req.query;
  // sử dụng fuse.js search
  try {
    let hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    });
    // nếu muốn limit sử dụng hàm limit.limit(req.query.limit);
    // Nếu có tham số tìm kiếm, thực hiện tìm kiếm gần đúng
    if (search) {
      const fuse = new Fuse(hotels, {
        keys: ["city"], // Các trường cần tìm kiếm
        includeScore: true,
        threshold: 0.3, // Độ chính xác của tìm kiếm, giá trị càng thấp thì độ chính xác càng cao
      });

      const result = fuse.search(search);

      // Chỉ lấy kết quả có điểm số thấp hơn hoặc bằng 0.3
      hotels = result
        .filter((item) => item.score <= 0.3)
        .map((item) => item.item);
    }
    res.status(200).json(hotels);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getCountByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const updateHotel = async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const deleteHotel = async (req, res) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deleteHotel);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getHotelRoom = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(404).json(err);
  }
};
//Promise.all() used when you have an array of promises and you want to wait for all of them to finish.
