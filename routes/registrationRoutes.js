const express = require("express");
const router = express.Router();

// Import model
const BabyRegister = require("../models/BabyRegister");
const SitterRegister = require("../models/SitterRegister");

router.get("/registerBaby", (req, res) => {
  res.render("babyRegistration");
});

// Installing async function
router.post("/registerBaby", async (req, res) => {
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
router.get("/babiesList", async (req, res) => {
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
})

// Delete Route
router.post("/delete", async (req, res) => {
  try {
    await BabyRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete baby from the db");
    console.log("Error deleting baby", error);
  }
});

router.get("/registerSitter", (req, res) => {
  res.render("sitterRegistration");
});

// Installing async function
router.post("/registerSitter", async (req, res) => {
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
router.get("/sittersList", async (req, res) => {
  try {
    let sitters = await SitterRegister.find();
    res.render("sitterList", { sitters: sitters });
  } catch (error) {
    res.status(400).send("Unable to fetch sitters from the database");
  }
});

// Updating Sitters in the db

// Delete Route
router.post("/delete", async (req, res) => {
  try {
    await SitterRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete sitter from the db");
    console.log("Error deleting sitter", error);
  }
});

router.get("/adminDash", (req, res) => {
  res.render("admin");
});

module.exports = router;
