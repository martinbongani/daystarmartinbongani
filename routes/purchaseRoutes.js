const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const DollRegister = require("../models/DollRegister");
const PurchaseRegister = require("../models/PurchaseRegister");

// Image upload configs
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

// Purchase form
router.get("/purchaseAdd", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("addPurchase");
});

// Installing async function
router.post(
  "/purchaseAdd",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const purchase = new PurchaseRegister(req.body);
      console.log(purchase);
      await purchase.save();
      res.redirect("/purchasesList");
    } catch (error) {
      res.status(400).send("Sorry, something went wrong");
      console.log("Error registering the item", error);
    }
  }
);

// Fetching purchase from the db
router.get(
  "/purchasesList",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let purchases = await PurchaseRegister.find();
      res.render("purchaseList", { purchases: purchases });
    } catch (error) {
      res.status(400).send("Unable to fetch purchases from the database");
    }
  }
);

// Updating purchase in the db
router.get("/purchasesUpdate/:id", async (req, res) => {
  try {
    const purchaseUpdate = await PurchaseRegister.findOne({
      _id: req.params.id,
    });
    res.render("purchaseUpdate", { purchase: purchaseUpdate });
  } catch (error) {
    console.log("Error finding purchase", error);
    res.status(400).send("Unable to find purchase in the db");
  }
});

router.post("/purchasesUpdate", async (req, res) => {
  try {
    await PurchaseRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/purchasesList");
  } catch (error) {
    res.status(404).send("Unable to update purchase in the db");
  }
});

// Delete Purchase Route
router.post("/deleteItem", async (req, res) => {
  try {
    await PurchaseRegister.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete purchase from the db");
    console.log("Error deleting purchase", error);
  }
});

// Doll form
router.get("/dollAdd", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("addDoll");
});

// Installing async function
router.post(
  "/dollAdd",
  connectEnsureLogin.ensureLoggedIn(),
  upload.single("imageUpload"),
  async (req, res) => {
    try {
      const doll = new DollRegister(req.body);
      doll.imageUpload = req.file.path;
      console.log("Doll added", doll);
      await doll.save();
      res.redirect("/dollsList");
    } catch (error) {
      res.status(400).render("addDoll");
      console.log(error);
    }
  }
);

// Fetching doll from the db
router.get(
  "/dollsList",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let dolls = await DollRegister.find();
      res.render("dollStall", { dolls: dolls });
    } catch (error) {
      res.status(400).send("Unable to fetch dolls from the database");
    }
  }
);

// Sell Doll Route
router.post("/sellDoll/:id", async (req, res) => {
  const dollId = req.params.id;

  try {
    const doll = await DollRegister.findById(dollId);
    if (!doll) {
      return res.status(404).send("Doll not found");
    }

    // Reduce the quantity (assuming quantity is a number field in your model)
    if (doll.quantity > 0) {
      doll.quantity -= 1;
      await doll.save();
    } else {
      return res.status(400).send("No more dolls available to sell");
    }

    res.redirect("/dollsList"); // Redirect to the dolls list after selling
  } catch (error) {
    console.log("Error selling doll", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
