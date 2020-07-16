const CupModel = require('../models/cup_model')
const express = require('express')
const router = express.Router()

// Get all 
router.get('/', async (req, res, next) => {
    try {

        const result = await CupModel.get()
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

//get all under one ovitrap
router.get('/ovitrap/:ovitrapID', async (req, res, next) => {
    try {

        const result = await CupModel.getByOvitrapID(req.params.ovitrapID)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})



// Get one 
router.get('/:cupNo', async (req, res, next) => {
    try {
        const result = await CupModel.getById(req.params.cupNo)
        if (!result) return res.sendStatus(404)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

//create
router.post('/:cupNo', async (req, res, next) => {
    try {
        const createResult = await CupModel.create(req.body, req.params.cupNo)
        if (!createResult.affectedRows) return res.sendStatus(409)

        const result = await CupModel.getById(createResult.insertId)
        res.status(201).json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Delete
router.delete('/:cupNo', async (req, res, next) => {
    try {
        const result = await CupModel.delete(req.params.cupNo)
        if (!result.affectedRows) return res.sendStatus(404)
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
    }
})

// Update
router.patch('/:cupNo', async (req, res, next) => {
    try {
        const updateResult = await CupModel.update(req.params.cupNo, req.body)
        if (!updateResult.affectedRows) return res.sendStatus(404)

        const result = await CupModel.getById(req.params.cupNo)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})


module.exports = router