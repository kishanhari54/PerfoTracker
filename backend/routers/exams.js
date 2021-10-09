const Exams = require('../models/exams');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');



router.get('/', async(req, res) => {
    let filter = {};
    if (req.query.department) {

        filter = { department: req.query.department };
    }

    const examSchedule = await Exams.find(filter);
    if (!examSchedule) {
        res.status(500).json({ success: false });
    }
    res.send(examSchedule);
})


router.post('/', async(req, res) => {
    try {
        let exam = new Exams({
            year: req.body.year,
            department: req.body.department,
            subject: req.body.subject,
            dateOfExam: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
            time: req.body.time
        })
        exam = await exam.save();
        if (!exam)
            return res.status(400).send('The schedule cannot be created!')
        res.send(exam);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;