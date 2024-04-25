const express = require('express');
const router = express.Router();

// // Import model
// const AdminRegister = require('../models/AdminRegister');

// router.get('/registerAdmin', (req, res) => {
//     res.render('adminRegistration');
// });

// router.post('/registerAdmin', async(res, req) => {
//     try {
//         const adminRegister = new AdminRegister.register(req.body);
//         console.log(adminRegister)
//         await AdminRegister.register(adminRegister, req.body.password, (error) => {
//             if(error){
//                 throw error
//             }
//             res.redirect("/registerAdmin")
//         })
//     } catch (error) {
//         res.status(400).send("User not registered")
//         console.log(error)
//     }
// })

router.get('/registerBaby', (req,res) =>{
    res.render('babyRegistration');
})

router.post("/registerBaby", async (req, res) => {
    try {
      const baby = new BabyRegister(req.body);
      console.log(baby);
      await baby.save();
      res.redirect("/babyRegistration");
    } catch (error) {
      res.status(400).send("Sorry, something went wrong");
      console.log("Error registering the baby", error);
    }
  
  });
  
// Installing async function

router.get('/adminDash', (req,res) =>{
    res.render('admin')
})

module.exports = router;
