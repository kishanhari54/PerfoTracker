const examResults = require('../models/examresults');
const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const moment = require('moment');

router.get('/', async(req, res) => {
    let filter = {};
    if (req.query.department) {

        filter = { department: req.query.department };
    }

    const examResult = await examResults.find(filter);
    if (!examResult) {
        res.status(500).json({ success: false });
    }
    res.send(examResult);
})


router.get('/getById/:id', async(req, res) => {
    try {
        //   const userData = await Users.findOne({ regNo: req.params.regNo });
        // let filter = {};

        //filter = { studentRegNo: userData.studentRegNo };
        console.log(req.params)
        const examResult = await examResults.findById({ _id: req.params.id });
        if (!examResult) {
            res.status(500).json({ success: false });
        }
        res.send(examResult);
    } catch (err) { res.send(err) }
})

router.get('/:regNo', async(req, res) => {
    try {
        //   const userData = await Users.findOne({ regNo: req.params.regNo });
        // let filter = {};

        //filter = { studentRegNo: userData.studentRegNo };

        filter = { studentRegNo: req.params.regNo };
        const examResult = await examResults.find(filter);
        if (!examResult) {
            res.status(500).json({ success: false });
        }
        res.send(examResult);
    } catch (err) { res.send(err) }
})

router.post('/', async(req, res) => {
    try {
        let examResult = new examResults({
            year: req.body.year,
            semester: req.body.semester,
            department: req.body.department,
            subject: req.body.subject,
            dateOfExam: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
            studentRegNo: req.body.studentRegNo
        })
        examResult = await examResult.save();

        if (!examResult) {
            return res.status(400).send('The Data cannot be created!')
        }
        res.send(examResult);
    } catch (err) {
        res.send(err);
    }
})


router.put("/:id", async(req, res) => {
    let events = await examResults.findByIdAndUpdate(req.params.id, {
        year: req.body.year,
        semester: req.body.semester,
        department: req.body.department,
        subject: req.body.subject,
        dateOfExam: moment(req.body.dateOfExam).format('YYYY-MM-DD'),
        studentRegNo: req.body.studentRegNo
    }, { new: true })

    if (!events) {
        return res.status(400).send('Result  Cannot be updated')
    }
    res.send(events)

})

router.delete("/:id", async(req, res) => {
    try {
        const events = await examResults.findByIdAndDelete(req.params.id);
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