const express = require("express");
const router = express.Router();
const moment = require("moment");
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const BabyRegister = require("../models/BabyRegister");
const SitterRegister = require("../models/SitterRegister");
const PurchaseRegister = require("../models/PurchaseRegister");
const DollRegister = require("../models/DollRegister");
const AccountsRegister = require("../models/AccountsRegister");

router.get("/registerBaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("babyRegistration");
});

// Installing async function
router.post(
  "/registerBaby",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const baby = new BabyRegister(req.body);
      console.log(baby);
      await baby.save();
      res.redirect("/registerBaby");
    } catch (error) {
      res.status(400).send("Sorry, something went wrong");
      console.log("Error registering the baby", error);
    }
  }
);

// Fetching babies from the db
router.get(
  "/babiesList",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let dateOfBirth = moment().format("DD-MM-YYYY");
      if (req.query.dateOfBirth) {
        dateOfBirth = moment(req.query.dateOfBirth).format("DD-MM-YYYY");
        console.log("moment()")
      }
        let babies = await BabyRegister.find();
      res.render("babyList", { babies: babies });
    } catch (error) {
      res.status(400).send("Unable to fetch babies from the database");
    }
  }
);

// Updating baby in the db
router.get("/babiesUpdate/:id", async (req, res) => {
  try {
    let dateOfBirth = moment().format("DD-MM-YYYY");
    if (req.query.dateOfBirth) {
      dateOfBirth = moment(req.query.dateOfBirth).format("DD-MM-YYYY");
      console.log("Format date")
    }
    const babyUpdate = await BabyRegister.findOne({ _id: req.params.id });
    res.render("babyUpdate", { baby: babyUpdate });
  } catch (error) {
    console.log("Error finding baby", error);
    res.status(400).send("Unable to find baby in the db");
  }
});

router.post("/babiesUpdate", async (req, res) => {
  try {
    await BabyRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/babiesList");
  } catch (error) {
    res.status(404).send("Unable to update baby in the db");
  }
});

// Delete Baby Route
router.post("/delete", async (req, res) => {
  try {
    await BabyRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete baby from the db");
    console.log("Error deleting baby", error);
  }
});

// Baby check-in routes
router.get("/checkInBaby/:id", async (req, res) => {
  try {
    const sitters = await SitterRegister.find();
    const checkInBaby = await BabyRegister.findOne({ _id: req.params.id });
    res.render("babyCheckIn", {
      baby: checkInBaby,
      sitters: sitters,
    });
  } catch (error) {
    console.log("Error fetching data for check-in", error);
    res.status(400).send("Unable to find baby in the db");
  }
});

router.post("/checkInBaby", async (req, res) => {
  try {
    await BabyRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    console.log(req.body);
    res.redirect("/checkedInBabies");
  } catch (error) {
    console.log("Error checking-in baby", error);
    res.status(404).send("Unable to update baby in the db");
  }
});

// List of Checked-in babies from the db
router.get("/checkedInBabies", async (req, res) => {
  try {
    let babiesCheckedIn = await BabyRegister.find({ status: "Present" });
    console.log("Fetched checked-in babies:", babiesCheckedIn);
    res.render("babiesCheckedIn", {
      babies: babiesCheckedIn,
    });
    console.log("Display babies checked-in", babiesCheckedIn);
  } catch (error) {
    res.status(400).send("Unable to find babies present in the db");
  }
});

// Baby check-out routes
router.get("/checkOutBaby/:id", async (req, res) => {
  try {
    const sitters = await SitterRegister.find();
    const checkOutBaby = await BabyRegister.findOne({ _id: req.params.id });

    res.render("babyCheckOut", {
      baby: checkOutBaby,
      sitters: sitters,
    });
  } catch (error) {
    console.log("Error finding a baby!", error);
    res.status(400).send("unable to find baby from the db!");
  }
});

router.post("/checkOutBaby", async (req, res) => {
  try {
    await BabyRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/checkedOutBabies");
  } catch (error) {
    res.status(404).send("Unable to update baby in the db!");
  }
});

// List of Checked-out babies from the db
router.get("/checkedOutBabies", async (req, res) => {
  try {
    let babiesCheckedOut = await BabyRegister.find({ status: "Absent" });
    res.render("babiesCheckedOut", { babies: babiesCheckedOut }); // to display babies from data base
    console.log("Display babies checked-out", babiesCheckedOut);
  } catch (error) {
    res.status(400).send("Unable to find babies absent in the db");
    console.log("Unable to find babies in the database", error);
  }
});

router.get(
  "/registerSitter",
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("sitterRegistration");
  }
);

// Installing async function
router.post(
  "/registerSitter",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const sitter = new SitterRegister(req.body);
      console.log(sitter);
      await sitter.save();
      res.redirect("/registerSitter");
    } catch (error) {
      res.status(400).send("Sorry, something went wrong");
      console.log("Error registering the sitter", error);
    }
  }
);

// Fetching sitters from the db
router.get(
  "/sittersList",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let dateOfBirth = moment().format("DD-MM-YYYY");
      if (req.query.dateOfBirth)
        dateOfBirth = moment(req.query.dateOfBirth).format("DD-MM-YYYY");
      let sitters = await SitterRegister.find();
      res.render("sitterList", { sitters: sitters });
    } catch (error) {
      res.status(400).send("Unable to fetch sitters from the database");
    }
  }
);

// Updating Sitters in the db
router.get("/sittersUpdate/:id", async (req, res) => {
  try {
    let dateOfBirth = moment().format("DD-MM-YYYY");
    if (req.query.dateOfBirth)
      dateOfBirth = moment(req.query.dateOfBirth).format("DD-MM-YYYY");
    const sitterUpdate = await SitterRegister.findOne({ _id: req.params.id });
    res.render("sitterUpdate", { sitter: sitterUpdate });
  } catch (error) {
    console.log("Error finding sitter", error);
    res.status(400).send("Unable to find sitter in the db");
  }
});

router.post("/sittersUpdate", async (req, res) => {
  try {
    await SitterRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/sittersList");
  } catch (error) {
    res.status(404).send("Unable to update sitter in the db");
  }
});

// Delete Sitter Route
router.post("/deleted", async (req, res) => {
  try {
    await SitterRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete sitter from the db");
    console.log("Error deleting sitter", error);
  }
});

// Sitter check-in routes
router.get("/checkInSitter/:id", async (req, res) => {
  try {
    const checkInSitter = await SitterRegister.findOne({ _id: req.params.id });
    res.render("sitterCheckIn", {
      sitter: checkInSitter,
    });
  } catch (error) {
    console.log("Error fetching data for check-in", error);
    res.status(400).send("Unable to find sitter in the db");
  }
});

router.post("/checkInSitter", async (req, res) => {
  try {
    await SitterRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/checkedInSitters");
  } catch (error) {
    console.log("Error checking-in sitter", error);
    res.status(404).send("Unable to update sitter in the db");
  }
});

// List of Checked-in sitters from the db
router.get("/checkedInSitters", async (req, res) => {
  try {
    let sittersCheckedIn = await SitterRegister.find({ status: "Available" });
    res.render("sittersCheckedIn", {
      sitters: sittersCheckedIn,
    });
    console.log("Display sitters checked-in", sittersCheckedIn);
  } catch (error) {
    res.status(400).send("Unable to find sitters available in the db");
  }
});

// Sitter check-out routes
router.get("/checkOutSitter/:id", async (req, res) => {
  try {
    const babies = await BabyRegister.find();
    const checkOutSitter = await SitterRegister.findOne({ _id: req.params.id });

    res.render("sitterCheckOut", {
      sitter: checkOutSitter,
      babies: babies,
    });
  } catch (error) {
    console.log("Error finding a sitter!", error);
    res.status(400).send("unable to find sitter in the db!");
  }
});

router.post("/checkOutSitter", async (req, res) => {
  try {
    await SitterRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/checkedOutSitters");
  } catch (error) {
    res.status(404).send("Unable to update sitter in the db!");
  }
});

// List of Checked-out sitters from the db
router.get("/checkedOutSitters", async (req, res) => {
  try {
    let sittersCheckedOut = await SitterRegister.find({ status: "Off" });
    res.render("sittersCheckedOut", { sitters: sittersCheckedOut });
    console.log("Display sitters checked-out", sittersCheckedOut);
  } catch (error) {
    res.status(400).send("Unable to find sitter off in the db");
    console.log("Unable to find sitters in the database", error);
  }
});

router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("admin");
});

// Accounts
router.get(
  "/accountsEntry", (req, res) => {
    res.render("accounts");
  }
);

// Installing async function
router.post(
  "/accountsEntry",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const transaction = new AccountsRegister(req.body);
      console.log(transaction);
      await transaction.save();
      res.redirect("/accountsEntry");
    } catch (error) {
      res.status(400).send("Sorry, something went wrong");
      console.log("Error entering the transaction", error);
    }
  }
);

// Fetching transactions from the db
router.get(
  "/financialReport",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      // let dateOfBirth = moment().format("DD-MM-YYYY");
      // if (req.query.dateOfBirth)
      //   dateOfBirth = moment(req.query.dateOfBirth).format("DD-MM-YYYY");
      let transactions = await AccountsRegister.find();
      res.render("accountsReport", { transactions: transactions });
    } catch (error) {
      res.status(400).send("Unable to fetch transactions from the database");
    }
  }
);


// Admin dash
router.get(
  "/adminDash",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let enrolledBabies = await BabyRegister.countDocuments({});
      let babiesPresent = await BabyRegister.countDocuments({
        status: "Present",
      });
      let babiesAbsent = await BabyRegister.countDocuments({
        status: "Absent",
      });
      let enrolledSitters = await SitterRegister.countDocuments({});
      let sittersPresent = await SitterRegister.countDocuments({
        status: "Available",
      });
      let sittersAbsent = await SitterRegister.countDocuments({
        status: "Off",
      });
      let dolls = await DollRegister.countDocuments({});

      let totalRevenue = await BabyRegister.aggregate([
        { $group: { _id: null, totalFees: { $sum: "$fee" } } },
      ]);

      let totalExpenses = await PurchaseRegister.aggregate([
        { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
      ]);

      let dollExpenses = await DollRegister.aggregate([
        { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
      ]);

      console.log("Revenue", totalRevenue);
      console.log("Expenses", totalExpenses);
      res.render("admin", {
        totalRevenue: totalRevenue[0],
        totalExpenses: totalExpenses[0],
        dollExpenses: dollExpenses[0],
        enrolledBabies,
        babiesPresent,
        babiesAbsent,
        enrolledSitters,
        sittersPresent,
        sittersAbsent,
        dolls,
      });
    } catch (error) {
      res.status(400).send("Unable to find details in the db");
      console.log("--------------", error);
    }
  }
);

router.get(
  "/collection",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let selectedDate = moment().format("DD-MM-YYYY");
      if (req.query.searchdate)
        selectedDate = moment(req.query.searchdate).format("DD-MM-YYYY");
      // Set the selected date to match the payment date
      let collectionDetails = await BabyRegister.find({
        dateOfPayment: selectedDate,
      });
      // Query for total revenue in a day
      let totalFeesCollection = await BabyRegister.aggregate([
        { $match: { dateOfPayment: new Date(selectedDate) } },
        {
          $group: { _id: "$dateOfPayment", totalCollection: { $sum: "$fee" } },
        },
      ]);
      totalFeesCollection.length > 0 ? totalFeesCollection : 0;

      // Set the selected date to match the purchase date
      let expenseDetails = await PurchaseRegister.find({
        dateOfPurchase: selectedDate,
      });
      // Query for total expenses in a day
      let totalExpenses = await PurchaseRegister.aggregate([
        { $match: { dateOfPurchase: new Date(selectedDate) } },
        {
          $group: {
            _id: "$dateOfPurchase",
            totalGExpenses: { $sum: "$amount" },
          },
        },
      ]);
      totalExpenses.length > 0 ? totalExpenses : 0;

      // Set the selected date to match the purchase date
      let dollExpenseDetails = await DollRegister.find({
        dateOfPurchase: selectedDate,
      });
      // Query for total expenses in a day on dolls
      let dollTotalExpenses = await DollRegister.aggregate([
        { $match: { dateOfPurchase: new Date(selectedDate) } },
        {
          $group: {
            _id: "$dateOfPurchase",
            totalDExpenses: { $sum: "$amount" },
          },
        },
      ]);
      dollTotalExpenses.length > 0 ? totalExpenses : 0;

      res.render("revenueReport", {
        collections: collectionDetails,
        expenses: expenseDetails,
        dollExpenseDetails: dollExpenseDetails,
        totalFees: totalFeesCollection[0],
        totalExpenses: totalExpenses[0],
        dollTotalExpenses: dollTotalExpenses[0],
        defaultDate: selectedDate,
        title: "Revenue",
      });
    } catch (error) {
      console.log(error);
      res.send("Failed to retrieve collections details");
    }
  }
);

router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("admin");
});

module.exports = router;
