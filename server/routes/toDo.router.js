const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.post('/', (req, res) => {
    console.log('in router.post', req.body);

    const sqlQuery = `
        INSERT INTO "to-do-list" 
            ("task")
        VALUES ($1);
    `
    const sqlParams = [req.body.task];

    pool.query(sqlQuery,sqlParams)
    .then(() => {
        console.log('in router.post pool.then');
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error in post pool',err)
        res.sendStatus(500);
    })
}); //end router.post


module.exports = router;