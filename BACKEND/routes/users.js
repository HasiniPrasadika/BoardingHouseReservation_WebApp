const router = require("express").Router();
let User = require("../models/user");


// Create a new user

router.route("/add").post(async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    

    const newUser = new User({
        username,
        password,
        role
    })
    try{
        const systemuser = await User.findOne({username:username,password:password,role:role})

        if(systemuser){
            res.json("exist")
        }
        else{
            res.json("notexist")
            newUser.save()
        }

    }
    catch(e){
        res.json("fail")
    }
    

})



//Update a user

router.route("/update/:username").put(async (req,res) =>{
    let userName = req.params.username;
    const {username,password,role} = req.body;

    const updateUser = {
        username,
        password,
        role
        
    }

    const update = await User.findOneAndUpdate({username:userName}, updateUser).then(() =>{
        res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: err.message});
    })
})



//login user

router.route("/get/login").post(async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    try{
        const systemuser = await User.findOne({username:username,password:password,role:role})
    
            if(systemuser){
                res.json("exist")
            }
            else{
                res.json("notexist")
            }
    }
    
    catch(e){
        res.json("fail")
    }
})

//delete user

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "user deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
    })
})

  
  module.exports = router;