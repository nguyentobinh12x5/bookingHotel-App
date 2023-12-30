import Transaction from "../models/Transaction.js";
export const createTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    res.status(404).json(err);
  }
};
// get all transaction in client
export const getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      email: req.params.email,
    }).populate("hotelId");
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find().populate("hotelId");
    res.status(200).json(transaction);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const getTransactionsByHotelId = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      hotelId: req.params.hotelId,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json(err);
  }
};
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json("Transaction has been deleted...");
  } catch (err) {
    res.status(404).json(err);
  }
};
