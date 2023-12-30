import mongoose, { Schema } from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    card: {
      type: String,
      required: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: {
      type: [
        {
          id: String,
          number: Number,
        },
      ],
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ["Credit Card", "Cash"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Booked", "Checkin", "Checkout"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
