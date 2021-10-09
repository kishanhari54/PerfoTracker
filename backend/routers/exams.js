const Exams = require('../models/exams');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const Users = require('../models/users');


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


router.get('/:regNo', async(req, res) => {

    // const user = await Users.findById({ _id: req.params.id }).select("department currentYear currentSemester")
    const user = await Users.findOne({ regNo: req.params.regNo }).select("department currentYear currentSemester")
    console.log("USER" + user);
    let filter = {};
    if (user) {
        filter = { department: user.department, year: user.currentYear, semester: user.currentSemester };
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
            semester: req.body.semester,
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


router.put("/:id", async(req, res) => {
    let exam = await Exams.findByIdAndUpdate(req.params.id, {
        year: req.body.year,
        semester: req.body.semester,
        department: req.body.department,
        subject: req.body.subject,
        dateOfExam: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
        time: req.body.time,
    }, { new: true })

    if (!exam) {
        return res.status(400).send('Exam Schedule Cannot be updated')
    }
    res.send(exam)

})

router.delete("/:id", async(req, res) => {
    try {
        const exam = await Exams.findByIdAndDelete(req.params.id);
        if (!exam) {
            res.status(404).json({ success: false, message: `Exam ${req.params.id} Coud not be Found` })
        } else {
            res.status(200).json({ success: true, message: `Exam ${ exam.subject } has been deleted` })
        }
    } catch (err) {
        res.status(400).json({ success: false, err: err });
    }
})

module.exports = router;