//fetching list babies clocked Out from database 
router.get("/clockingOutList", async (req, res)=> {
    try {
      let babies = await BabiesRegisterModel.find({status: "ClockedOut"})
      res.render("./babies/renderBabyClockOut", {babies:babies}) // to display babies from data base
      console.log("display babies clocked out", babies);
 
    } catch (error) {
       res.status(400).send("unable to find babies from database!");
       console.log("unable to find babies from database!...", error );
    }
    })

//clockOut baby route for form in database
router.get("/ClockingOut/:id", async(req, res)=> { 
    try{  
     const sitters  = await SittersModel.find()
      const babyClockOut = await BabiesRegisterModel.findOne({_id: req.params.id});

      res.render("./babies/babyClockOut", {
        baby:babyClockOut,
        sitters:sitters
     });
     } catch(error){
        console.log("error finding a baby!", error);
        res.status(400).send("unable to find baby from the db!");  
     }
   })

   router.post("/ClockingOut", async(req, res)=> {
    try {
       await BabiesRegisterModel.findOneAndUpdate({_id: req.query.id}, req.body);
       res.redirect("/clockingOutList");
 
    } catch (error) {
       res.status(404).send("unable to update baby in the db!");  
    }
  })