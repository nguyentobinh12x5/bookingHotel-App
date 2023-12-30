import User from "../models/User.js";
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("User update sucessfully");
  } catch (err) {
    res.status(404).json(err);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(404).json(err);
  }
};
