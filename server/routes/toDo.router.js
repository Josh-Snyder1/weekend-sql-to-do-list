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

router.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM "to-do-list";    
    `
    pool.query(sqlQuery).then(response => {
        console.log('in router.get pool.query', response.rows);
        res.send(response.rows);
    }).catch((err) => {
        console.log('error getting tasks', err);
        res.sendStatus(500);
    });

}); //end router.get

router.delete('/:task', (req, res) => {
    let taskId = req.params.task;
    console.log('in router.delete',taskId);

    const sqlQuery = `
        DELETE FROM "to-do-list"
        WHERE "id" = $1;
    `
    const sqlParams = [taskId];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
        console.log('in router.delete pool.query');
        res.sendStatus(201);
    }).catch((err) => {
        console.log('delete failed', err);
        res.sendStatus(500);
    });

});//end router.delete


//client is not hitting the router.put
//getting no console.log of 'in router.put'
router.put('/:task', (req, res) => {
    console.log('in router.put');
    let sqlQuery = `
        UPDATE "to-do-list"
        SET "status" = $2
        WHERE "id" = $1
    `;
    let sqlParams = [
        req.params.task,
        req.body.status
    ];
    console.log('this should be task id', req.params.task);
    console.log('this should be status to change to', req.body.status)
    pool.query(sqlQuery, sqlParams)
    .then(() => {
        console.log('in router.put pool.then');
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;