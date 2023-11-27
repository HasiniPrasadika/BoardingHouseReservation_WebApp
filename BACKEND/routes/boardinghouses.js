const router = require("express").Router();
const Boardinghouse = require("../models/boardinghouse");

const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});



const upload = multer({storage});


// Create a new boarding house
router.route("/add").post(upload.array('images', 5), 
    
    (req, res) => {
        console.log(req.body);

        
            const house_name = req.body.house_name;
            const owner_name = req.body.owner_name;
            const owner_contact = req.body.owner_contact;
            const location = req.body.location;
            const description = req.body.description;
            const rooms = JSON.parse(req.body.rooms); 
            const images = req.files.map((file) => ({
                filename: file.originalname, 
                path: file.path, 
                
              }));

            const newBoardingHouse = new Boardinghouse({
                house_name,
                owner_name,
                owner_contact,
                location,
                description,
                rooms,
                images,
            });

            newBoardingHouse.save()
            .then(() => {
                res.status(201).json({ message: "Boarding house added" });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Failed to add boarding house" });
            });
        }
    );
  

//Retrieve all the boardinghouses

router.route("/").get((req, res) => {
    Boardinghouse.find()
      .then((boardinghouses) => {
        res.json(boardinghouses);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Failed to retrieve boarding houses" });
      });
  });




// Update a boarding house by ID
router.put('/update/:id', async (req, res) => {
    try {
      const boardingHouseId = req.params.id;
      const updateData = req.body;
  
     
      const updatedBoardingHouse = await Boardinghouse.findByIdAndUpdate(
        boardingHouseId,
        updateData,
        { new: true } 
      );
  
      if (!updatedBoardingHouse) {
        return res.status(404).json({ message: 'Boarding house not found' });
      }
  
      res.json(updatedBoardingHouse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update boarding house' });
    }
  });

//delete boarding house

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Boardinghouse.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "boardinghouse deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
    })
})


// Define a route for making room reservations
router.post('/reserve', async (req, res) => {
    try {
      const { boardingHouseId, selectedRooms } = req.body;
  
    
      const boardingHouse = await BoardingHouse.findById(boardingHouseId);
  
      if (!boardingHouse) {
        return res.status(404).json({ message: 'Boarding house not found' });
      }
  
     
      for (const roomNumber of selectedRooms) {
        const roomIndex = boardingHouse.rooms.findIndex((room) => room.roomNumber === roomNumber);
        if (roomIndex !== -1) {
          boardingHouse.rooms[roomIndex].availability = false; 
          boardingHouse.rooms[roomIndex].reservedby = 'Customer Name'; 
        }
      }
  
      
      await boardingHouse.save();
  
      
      const updatedBoardingHouse = await BoardingHouse.findById(boardingHouseId);
  
      res.status(200).json({ message: 'Rooms reserved successfully', boardingHouse: updatedBoardingHouse });
    } catch (error) {
      console.error('Error reserving rooms:', error);
      res.status(500).json({ message: 'Failed to reserve rooms' });
    }
  });



router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
})

//find boarding house by owner name

router.route("/get-by-owner/:owner_name").get(async (req,res) => {
    let ownerName = req.params.owner_name;
})

//find boarding house by room reserved by

router.route("/get-by-reservedby/:reservedby").get(async (req,res) => {
    let reservedBy = req.params.reservedby;
})

  
  module.exports = router;