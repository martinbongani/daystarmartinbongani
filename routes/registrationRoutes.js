const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

// Import model
const BabyRegister = require("../models/BabyRegister");
const SitterRegister = require("../models/SitterRegister");

router.get("/registerBaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("babyRegistration");
});

// Installing async function
router.post("/registerBaby", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const baby = new BabyRegister(req.body);
    console.log(baby);
    await baby.save();
    res.redirect("/registerBaby");
  } catch (error) {
    res.status(400).send("Sorry, something went wrong");
    console.log("Error registering the baby", error);
  }
});

// Fetching babies from the db
router.get("/babiesList", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    let babies = await BabyRegister.find();
    res.render("babyList", { babies: babies });
  } catch (error) {
    res.status(400).send("Unable to fetch babies from the database");
  }
});

// Updating baby in the db
router.get("/babiesUpdate/:id", async(req, res) =>{
  try {
    const babyUpdate = await BabyRegister.findOne({_id: req.params.id});
    res.render("babyUpdate", {baby:babyUpdate});
  } catch (error) {
    console.log("Error finding baby", error);
    res.status(400).send("Unable to find baby in the db");
  }
});

router.post("/babiesUpdate", async(req, res) =>{
  try {
    await babyUpdate.findOneAndUpdate({_id: req.query.id}, req.body);
    res.redirect("/babiesList")
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

// Check-in routes
router.get("/checkInBaby/:id", async(req, res) =>{
  if (req.session.user) {
    try {
      const checkInBaby = await BabyRegister.findOne({_id: req.params.id});
      res.render("checkIn", {baby: checkInBaby, currentUser: req.session.user,});
    } catch (error) {
      console.log("Error finding baby", error);
      res.status(400).send("Unable to find baby in the db");
    }
  } else {
    console.log("Can't find session");
    res.redirect("/login");
  }
});

router.post("/checkInBaby", async(req, res) =>{
  if (req.session.user) {
    try {
      await checkInBaby.findOneAndUpdate({_id: req.params.id});
      res.redirect("/checkInBaby");
    } catch (error) {
      console.log("Error checking-in baby", error);
      res.status(404).send("Unable to check-in baby");
    }
  } else {
    console.log("Can't find session");
    res.redirect("/login");
  }
});

// List of Checked-in babies from the db
router.get("/babiesCheckedIn", async (req, res) =>{
  if (req.session.user) {
    try {
      const babiesCheckedIn = await BabyRegister.find({ status: "Present" })
      res.render("babiesPresent", {babies: babiesCheckedIn, currentUser: req.session.user,});
    } catch (error) {
      res.status(400).send("Unable to find babies present in the db");
    }
  } else {
    console.log("Can't find session");
    res.redirect("/login");
  }
})

router.get("/registerSitter", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("sitterRegistration");
});

// Installing async function
router.post("/registerSitter", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const sitter = new SitterRegister(req.body);
    console.log(sitter);
    await sitter.save();
    res.redirect("/registerSitter");
  } catch (error) {
    res.status(400).send("Sorry, something went wrong");
    console.log("Error registering the sitter", error);
  }
});

// Fetching sitters from the db
router.get("/sittersList", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    let sitters = await SitterRegister.find();
    res.render("sitterList", { sitters: sitters });
  } catch (error) {
    res.status(400).send("Unable to fetch sitters from the database");
  }
});

// Updating Sitters in the db
router.get("/sittersUpdate/:id", async(req, res) =>{
  try {
    const sitterUpdate = await SitterRegister.findOne({_id: req.params.id});
    res.render("sitterUpdate", {sitter:sitterUpdate});
  } catch (error) {
    console.log("Error finding sitter", error);
    res.status(400).send("Unable to find sitter in the db");
  }
});

router.post("/sittersUpdate", async(req, res) =>{
  try {
    await sitterUpdate.findOneAndUpdate({_id: req.query.id}, req.body);
    res.redirect("/sittersList")
  } catch (error) {
    res.status(404).send("Unable to update sitter in the db");
  }
});

// Delete Sitter Route
router.post("/delete", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await SitterRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete sitter from the db");
    console.log("Error deleting sitter", error);
  }
});

router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("admin");
});

module.exports = router;
