const Events = require('../models/events');
const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const moment = require('moment');

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

router.get('/:id', async(req, res) => {
    let filter = {};
    if (req.params.id) {

        filter = { type: req.params.id };
    }

    const eventSchedule = await Events.findById({ _id: req.params.id });
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
            date: moment(req.body.date).format('YYYY-MM-DD'),
            time: req.body.time
        })
        event = await event.save();

        if (!event) {
            return res.status(400).send('The Event cannot be created!')
        }
        res.send(event);
    } catch (err) {
        res.send(err);
    }
})


router.put("/:id", async(req, res) => {
    let events = await Events.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        info: req.body.info,
        subject: req.body.subject,
        date: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
        time: req.body.time
    }, { new: true })

    if (!events) {
        return res.status(400).send('Event  Cannot be updated')
    }
    res.send(events)

})

router.delete("/:id", async(req, res) => {
    try {
        const events = await Events.findByIdAndDelete(req.params.id);
        if (!events) {
            res.status(404).json({ success: false, message: `Event  ${req.params.id} Coud not be Found` })
        } else {
            res.status(200).json({ success: true, message: `Event  ${ events.subject } has been deleted` })
        }
    } catch (err) {
        res.status(400).json({ success: false, err: err });
    }
})
module.exports = router;