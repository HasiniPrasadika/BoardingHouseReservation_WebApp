const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardinghouseSchema = new Schema({

    house_name : {
        type : String,
        require: true
    },
    owner_name : {
        type : String,
        require: true,
        unique: false,
    },
    owner_contact : {
        type : String,
        require: true
    },
    location : {
        type : String,
        require: true
    },
    description : {
        type : String,
        require: true
    },
    rooms: [
        {
          roomNumber: Number,
          price: Number,
          availability: Boolean,
          roomdetails: String,
          reservedby: String
          
        },
    ],
    images: [
        {
            filename: {
                type: String,
                required: true
              }
        },
      ]


})

const Boardinghouse = mongoose.model("Boardinghouse",boardinghouseSchema);

module.exports = Boardinghouse;




















