const express = require('express');
const router = express.Router();

// Import model
const AdminRegister = require('../models/AdminRegister');

router.get('/registerAdmin', (req, res) => {
    res.render('adminRegistration');
});

router.post('/registerAdmin', async(res, req) => {
    try {
        const adminRegister = new AdminRegister(req.body)
        await AdminRegister.register(adminRegister, req.body.password,(error) => {
            if(error){
                throw error
            }
            res.redirect('/registerAdmin')
    
        });
    
    } catch (error) {
        res.status(400).send('Sorry, something went wrong')
    }
});

model.exports = router;
