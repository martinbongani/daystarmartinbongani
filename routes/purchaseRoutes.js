const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const Purchase = require("../models/Purchase");

router.get("/purchaseAdd", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("addPurchase");
});

// // Installing async function
// router.post(
//   "/registerBaby",
//   connectEnsureLogin.ensureLoggedIn(),
//   async (req, res) => {
//     try {
//       const baby = new BabyRegister(req.body);
//       console.log(baby);
//       await baby.save();
//       res.redirect("/registerBaby");
//     } catch (error) {
//       res.status(400).send("Sorry, something went wrong");
//       console.log("Error registering the baby", error);
//     }
//   }
// );

// // Fetching babies from the db
// router.get(
//   "/babiesList",
//   connectEnsureLogin.ensureLoggedIn(),
//   async (req, res) => {
//     try {
//       let babies = await BabyRegister.find();
//       res.render("babyList", { babies: babies });
//     } catch (error) {
//       res.status(400).send("Unable to fetch babies from the database");
//     }
//   }
// );

// // Updating baby in the db
// router.get("/babiesUpdate/:id", async (req, res) => {
//   try {
//     const babyUpdate = await BabyRegister.findOne({ _id: req.params.id });
//     res.render("babyUpdate", { baby: babyUpdate });
//   } catch (error) {
//     console.log("Error finding baby", error);
//     res.status(400).send("Unable to find baby in the db");
//   }
// });

// router.post("/babiesUpdate", async (req, res) => {
//   try {
//     await BabyRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
//     res.redirect("/babiesList");
//   } catch (error) {
//     res.status(404).send("Unable to update baby in the db");
//   }
// });

// // Delete Baby Route
// router.post("/delete", async (req, res) => {
//   try {
//     await BabyRegister.deleteOne({ _id: req.body.id });
//     res.redirect("back");
//   } catch (error) {
//     res.status(400).send("Unable to delete baby from the db");
//     console.log("Error deleting baby", error);
//   }
// });

// // Baby check-in routes
// router.get("/checkInBaby/:id", async (req, res) => {
//   try {
//     const sitters = await SitterRegister.find()
//     const checkInBaby = await BabyRegister.findOne({ _id: req.params.id });
//     res.render("babyCheckIn", {
//       baby:checkInBaby,
//       sitters:sitters
//     });
//   } catch (error) {
//     console.log("Error fetching data for check-in", error);
//     res.status(400).send("Unable to find baby in the db");
//   }
// });

// router.post("/checkInBaby", async (req, res) => {
//   try {
//     await BabyRegister.findOneAndUpdate({ _id: req.params.id }, req.body);
//     console.log(req.body)
//     res.redirect("/checkedInBabies")
//   } catch (error) {
//     console.log("Error checking-in baby", error);
//     res.status(404).send("Unable to update baby in the db");
//   }
// });

// // List of Checked-in babies from the db
// router.get("/checkedInBabies", async (req, res) => {
//     try {
//       const babiesCheckedIn = await BabyRegister.find({status: "Present"});
//       res.render("babiesCheckedIn", {
//         babies: babiesCheckedIn
//       });
//       console.log("Display babies checked-in", babiesCheckedIn);
//     } catch (error) {
//       res.status(400).send("Unable to find babies present in the db");
//   } 
// });

// router.get(
//   "/registerSitter",
//   connectEnsureLogin.ensureLoggedIn(),
//   (req, res) => {
//     res.render("sitterRegistration");
//   }
// );

// // Installing async function
// router.post(
//   "/registerSitter",
//   connectEnsureLogin.ensureLoggedIn(),
//   async (req, res) => {
//     try {
//       const sitter = new SitterRegister(req.body);
//       console.log(sitter);
//       await sitter.save();
//       res.redirect("/registerSitter");
//     } catch (error) {
//       res.status(400).send("Sorry, something went wrong");
//       console.log("Error registering the sitter", error);
//     }
//   }
// );

// // Fetching sitters from the db
// router.get(
//   "/sittersList",
//   connectEnsureLogin.ensureLoggedIn(),
//   async (req, res) => {
//     try {
//       let sitters = await SitterRegister.find();
//       res.render("sitterList", { sitters: sitters });
//     } catch (error) {
//       res.status(400).send("Unable to fetch sitters from the database");
//     }
//   }
// );

// // Updating Sitters in the db
// router.get("/sittersUpdate/:id", async (req, res) => {
//   try {
//     const sitterUpdate = await SitterRegister.findOne({ _id: req.params.id });
//     res.render("sitterUpdate", { sitter: sitterUpdate });
//   } catch (error) {
//     console.log("Error finding sitter", error);
//     res.status(400).send("Unable to find sitter in the db");
//   }
// });

// router.post("/sittersUpdate", async (req, res) => {
//   try {
//     await SitterRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
//     res.redirect("/sittersList");
//   } catch (error) {
//     res.status(404).send("Unable to update sitter in the db");
//   }
// });

// // Delete Sitter Route
// router.post("/delete", async (req, res) => {
//     try {
//       await SitterRegister.deleteOne({ _id: req.body.id });
//       res.redirect("back");
//     } catch (error) {
//       res.status(400).send("Unable to delete sitter from the db");
//       console.log("Error deleting sitter", error);
//     }
//   }
// );

// // Sitter check-in routes
// router.get("/checkInSitter/:id", async (req, res) => {
//   try {
//     const checkInSitter = await SitterRegister.findOne({ _id: req.params.id });
//     res.render("sitterCheckIn", {
//       sitter:checkInSitter,
//     });
//   } catch (error) {
//     console.log("Error fetching data for check-in", error);
//     res.status(400).send("Unable to find sitter in the db");
//   }
// });

// router.post("/checkInSitter", async (req, res) => {
//   try {
//     await SitterRegister.findOneAndUpdate({ _id: req.params.id }, req.body);
//     res.redirect("/checkedInSitters")
//   } catch (error) {
//     console.log("Error checking-in sitter", error);
//     res.status(404).send("Unable to update sitter in the db");
//   }
// });

// // List of Checked-in sitters from the db
// router.get("/checkedInSitters", async (req, res) => {
//     try {
//       const sittersCheckedIn = await SitterRegister.find({status: "Available"});
//       res.render("sittersCheckedIn", {
//         sitters: sittersCheckedIn
//       });
//       console.log("Display sitters checked-in", sittersCheckedIn);
//     } catch (error) {
//       res.status(400).send("Unable to find sitters present in the db");
//   } 
// });


// router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("admin");
// });

module.exports = router;
