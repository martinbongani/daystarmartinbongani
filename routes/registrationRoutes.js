const express = require("express");
const router = express.Router();
const moment = require("moment");
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const BabyRegister = require("../models/BabyRegister");
const SitterRegister = require("../models/SitterRegister");
const AccountsRegister = require("../models/AccountsRegister");

// Baby routes
router.get("/registerBaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("babyRegistration");
});

// Installing async function
router.post(
  "/registerBaby",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const baby = new BabyRegister(req.body); // Create a new baby registration document from the req body
      console.log(baby); 
      await baby.save(); // Save baby reg document in db
      res.redirect("/registerBaby"); // Redirect to registerBaby route upon successful save
    } catch (error) {
      res.status(400).send("Sorry, something went wrong"); // Send status code 400 error message if something goes wrong
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

// Sitter routes
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

// Accounts routes
router.get("/accountsEntry", (req, res) => {
  res.render("accounts");
});

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
      const transactions = await AccountsRegister.find();
      let totalIncome = 0;
      let totalExpense = 0;

      transactions.forEach((transaction) => {
        if (transaction.classification === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.classification === "expense") {
          totalExpense += transaction.amount;
        }
      });

      const profitOrLoss = totalIncome - totalExpense;

      res.render("accountsReport", {
        transactions: transactions,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        profitOrLoss: profitOrLoss,
      });
    } catch (error) {
      res.status(400).send("Unable to fetch transactions from the database");
    }
  }
);

// Updating transactions in the db
router.get("/transactionUpdate/:id", async (req, res) => {
  try {
    const transactionUpdate = await AccountsRegister.findOne({
      _id: req.params.id,
    });
    res.render("accountsUpdate", { transaction: transactionUpdate });
  } catch (error) {
    console.log("Error finding transaction", error);
    res.status(400).send("Unable to find transaction in the db");
  }
});

router.post("/transactionUpdate", async (req, res) => {
  try {
    await AccountsRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/financialReport");
  } catch (error) {
    res.status(404).send("Unable to update transaction in the db");
  }
});

// Delete transaction Route
router.post("/deleteTxn", async (req, res) => {
  try {
    await AccountsRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete transaction from the db");
    console.log("Error deleting transaction", error);
  }
});

// Admin dash route
router.get("/adminDash", async (req, res) => {
  try {
    const transactions = await AccountsRegister.find();
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.classification === "income") {
        totalIncome += transaction.amount;
      }
      if (transaction.classification === "expense") {
        totalExpense += transaction.amount;
      }
    });
    console.log("---------------------------", transactions);
    let enrolledBabies = await BabyRegister.countDocuments({});
    let babiesPresent = await BabyRegister.countDocuments({
      status: "Present",
    });
    let enrolledSitters = await SitterRegister.countDocuments({});
    let sittersPresent = await SitterRegister.countDocuments({
      status: "Available",
    });

    console.log("Income", totalIncome);
    console.log("Expenses", totalExpense);
    console.log("Enrolled Babies:", enrolledBabies);
    console.log("Babies Present:", babiesPresent);
    console.log("Enrolled Sitters:", enrolledSitters);
    console.log("Sitters Present:", sittersPresent);

    res.render("admin", {
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      enrolledBabies,
      babiesPresent,
      enrolledSitters,
      sittersPresent,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard details:", error);
    res.status(400).send("Unable to fetch details from the database");
  }
});

// About route
router.get("/about", (req, res) => {
  res.render("about");
});

// Gallery route
router.get("/gallery", (req, res) => {
  res.render("gallery");
});

module.exports = router;

