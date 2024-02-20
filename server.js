const express = require("express");
const app = express();
const mongoose = require("mongoose");
const LedgerData = require("./models/datamodel");

mongoose.connect(
  "mongodb+srv://admin:Admin12345@tallyprime.10i4zwm.mongodb.net/Tally-Data?retryWrites=true&w=majority"
);

app.use(express.json());
const db = mongoose.connection;
db.on("error", (error) => console.log("DB error", error));
db.once("open", () => console.log("DB connected!"));

app.post("/ledger-data", async (req, res) => {
  try {
    const ledgerOldData = await LedgerData.find({});
    if (ledgerOldData.length > 0) {
      await LedgerData.deleteMany({});
    }
    const ledgerData = await LedgerData.create(req.body);
    res.status(200).json({ ledgerData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/ledger-data", async (req, res) => {
  try {
    const ledgerData = await LedgerData.find({});
    res.status(200).json({ data: ledgerData, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(3000, () => {
  console.log("server working");
});
