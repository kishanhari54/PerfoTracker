const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

router.get('/', async(req, res) => {

    const users = await Users.find().select("-password");;
    res.send(users)
})


router.use('/login', async(req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Email Id Not Registered');
        }

        if (user && bCrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                userID: user.id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
            res.status(200).send({ user, token });
        } else {
            res.status(400).send('Password Mismatch');
        }

    } catch (err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const user = await Users.findById({ _id: req.params.id }).select("-password");
        if (!user) {
            res.status(404).send('User Not Found');
        }
        res.status(200).send(user);
    } catch (err) {
        res.send(err);
    }
})


router.post(`/register`, async(req, res) => {
    try {
        let passwordHash = await bCrypt.hash(req.body.password, 10);

        let users = new Users({
            email: req.body.email,
            password: passwordHash,
            name: req.body.name,
            joiningDate: moment(req.body.joiningDate).format('YYYY-MM-DD'),
            department: req.body.department,
            currentYear: req.body.currentYear,
            currentSemester: req.body.currentSemester,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            isAdmin: req.body.isAdmin
        })

        users.save().then((user) => { res.status('201').json(user) })
            .catch(err => res.status('500').json({ error: err, success: false }))
    } catch (Err) {
        res.status(500).send(Err);
    }

})

router.put("/:id", async(req, res) => {
    try {
        const userData = await Users.findById(req.params.id);
        let passwordHash = req.body.password ? await bCrypt.hash(req.body.password, 10) : userData.passwordHash;

        const user = await Users.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            password: passwordHash,
            name: req.body.name,
            joiningDate: moment(req.body.joiningDate).format('YYYY-MM-DD'),
            department: req.body.department,
            currentYear: req.body.currentYear,
            currentSemester: req.body.currentSemester,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            isAdmin: req.body.isAdmin
        }, { new: true })

        if (!user) return res.status(500).send("unable to update");
        res.status(200).send(user)
    } catch (err) { res.send(err) }
})

router.delete('/:id', async(req, res) => {
    try {
        const deleted = await Users.findByIdAndDelete(req.params.id);
        if (deleted) { return res.status(200).send('The User is Deleted') } else { return res.status(400).send('The User could not be found') }
    } catch (err) {
        return res.status(500).send(err)
    }
})



module.exports = router;