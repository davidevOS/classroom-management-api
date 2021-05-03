const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


// Home
router.get('/', (req, res) => {
    res.json('Classroom Management API');
});

// Get Teachers
router.get('/teachers', (req, res) => {
        mysqlConnection.query(`SELECT teachers.id, teachers.firstName, teachers.lastName, subjects.subjectName, groups.groupName FROM teachers JOIN groups ON teachers.group1 = groups.id OR teachers.group2 = groups.id OR teachers.group3 = groups.id OR teachers.group4 = groups.id JOIN subjects ON subjects.id = groups.id`, (err, rows, fields) => {
        if(!err) {
            let teachers = rows;
            var objs = {teachers};
            res.json(objs);
        } else {
            console.log(err);
        }
    });
});

// Get Teacher
router.get('/teachers/:id', (req, res) => {
    const { id } = req.params
    mysqlConnection.query(`SELECT teachers.id, teachers.firstName, teachers.lastName, subjects.subjectName, groups.groupName FROM teachers JOIN groups ON teachers.group1 = groups.id OR teachers.group2 = groups.id OR teachers.group3 = groups.id OR teachers.group4 = groups.id JOIN subjects ON subjects.id = groups.id WHERE teachers.id = ?`, [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })

});

// Get Students
router.get('/students', (req, res) => {
    mysqlConnection.query(`SELECT students.id, students.firstName, students.lastName, subjects.subjectName, groups.groupName, grades.q1, grades.q2, grades.q3, grades.q4, grades.avg FROM students JOIN groups ON students.groupId = groups.id JOIN subjects ON subjects.id = groups.id JOIN grades ON students.id = grades.id`, (err, rows, fields) => {
        if(!err) {
            let students = rows;
            var objs = {students};
            res.json(objs);
        } else {
            console.log(err);
        }
    });
});

// Get Student
router.get('/students/:id', (req, res) => {
    const { id } = req.params
    // console.log(id)
    mysqlConnection.query(`SELECT students.id, students.firstName, students.lastName, subjects.subjectName, groups.groupName, grades.q1, grades.q2, grades.q3, grades.q4, grades.avg FROM students JOIN groups ON students.groupId = groups.id JOIN subjects ON subjects.id = groups.id JOIN grades ON students.id = grades.id WHERE students.id = ?`, [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })

});

// Get Grades
router.get('/grades', (req, res) => {
    mysqlConnection.query(`SELECT * FROM grades`, (err, rows, fields) => {
        if(!err) {
            let grades = rows;
            var objs = {grades};
            res.json(objs);
        } else {
            console.log(err);
        }
    });
});


// Get Grades by Student ID
router.get('/grades/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    mysqlConnection.query(`SELECT * FROM grades WHERE grades.id = ?`, [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

// Update Grades
router.put('/grades/:id', (req, res) => {
    const { q1, q2, q3, q4, avg } = req.body;
    const {id} = req.params;
    const query = "UPDATE grades SET q1 = ?, q2 = ?, q3 = ?, q4 = ?, avg = ? WHERE id = ?";

    mysqlConnection.query(query, [q1, q2, q3, q4, avg, id], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Grades Updated'});
        } else {
            console.log(err);
        }
    });

});


module.exports = router;