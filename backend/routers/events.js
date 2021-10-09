const Events = require('../models/events');
const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
//const moment = require('moment');

router.get('/', async(req, res) => {
    let filter = {};
    if (req.query.type) {

        filter = { type: req.query.type };
    }

    const eventSchedule = await Events.find(filter);
    if (!eventSchedule) {
        res.status(500).json({ success: false });
    }
    res.send(eventSchedule);
})


router.post('/', async(req, res) => {
    try {
        let event = new Events({
            type: req.body.type,
            info: req.body.info,
            subject: req.body.subject,
            date: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
            time: req.body.time
        })
        event = await event.save();
        if (!event)
            return res.status(400).send('The Event cannot be created!')
        res.send(event);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;