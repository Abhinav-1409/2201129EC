const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://localhost:27017");
} catch (e) {
  console.log(e);
}

const financeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  }
});
const FinanceModel = new mongoose.model("FinanceModel", financeSchema);
module.exports = FinanceModel;
