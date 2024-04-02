const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    cost: { type: Number, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
