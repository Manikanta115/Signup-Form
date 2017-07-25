var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {

    // get POST Body data from request object.
    var data = req.body;

    // validate form data (it is always good to validate at server side)

    if (data.name && data.email && data.psd1 && data.psd2 && data.mobile && data.dob && data.gender) {
        // valid form data

        // crate an instance to UserModel (mongoose)

        var reg = new RegModel({
            name: data.name,
            email: data.email,
            password: data.psd1,
            password: data.psd2,
            mobile: data.mobile,
            dob: data.dob,
            gender: data.gender
        });

        // save reg doc to DB
        reg.save().then(function (regDoc) {

            // success callback
            // send user document as a JSON Response
            res.status(200).json(regDoc);

        }).catch(function (err) {

            // error callback

            if (err.code === 11000) {
                // duplicate entry
                // send error as a JSON Response
                res.status(406).json({"err": "User already exists"});
            } else {
                // other than duplicate entry errors
                // send error as a JSON Response
                res.status(406).json({"err": err});
            }

        });

    } else {
        // invalid form data
        // send error as a JSON Response
        res.status(406).json({"err": "Missing required fields"});
    }

});


// Define User Schema

var RegSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    dob: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    meta: {

        created_at: {
            type: Date,
            default: Date.now()
        }

    }

});

// Crate User Model by Using User Schema
var RegModel = mongoose.model('Reg', RegSchema);

module.exports = router;
