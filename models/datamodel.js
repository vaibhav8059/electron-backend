const mongoose = require("mongoose");

const LedgerDataModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: String,
      default: 0,
    },
    type: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);


const LedgerData = mongoose.model("LedgerData", LedgerDataModel)
module.exports = LedgerData;
