const express = require('express');
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    const user = await User.find().select('-passwordHash')

    if (!user) {
        res.status(404).json({
            message: 'user not found in database'
        })
    }
    res.status(200).json({
        user: user
    })
})

router.post('/register', async (req, res) => {
    var user = User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    const newuser = await user.save();
    if (!newuser) {
        res.status(500).json({
            message: "user not created"
        })
    }

    res.status(200).json({
        user: newuser
    })
})



router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        res.status(400).json({
            message: "user not found in database"
        })
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.SECRET_KEY;

        const token = jwt.sign({
            userId: user.id,
            isAdmin:user.isAdmin
        },
            secret
        )


        res.status(200).json({
            message: "login successfull",
            email: req.body.email,
            token: token,

        })
    } else {
        res.status(400).json({
            message: "password is wrong"
        })
    }




})







module.exports = router;