const OvitrapModel = require('../models/ovitrap_model')
const express = require('express')
const router = express.Router()

// Get all 
router.get('/', async (req, res, next) => {
    try {

        const result = await OvitrapModel.get()
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})



// Get one 
router.get('/:ovitrapID', async (req, res, next) => {
    try {
        const result = await OvitrapModel.getById(req.params.ovitrapID)
        if (!result) return res.sendStatus(404)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Create a new todo
router.post('/', async (req, res, next) => {
    try {
        const createResult = await OvitrapModel.create(req.body)
        if (!createResult.affectedRows) return res.sendStatus(409)

        const result = await OvitrapModel.getById(createResult.insertId)
        res.status(201).json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Delete
router.delete('/:ovitrapID', async (req, res, next) => {
    try {
        const result = await OvitrapModel.delete(req.params.ovitrapID)
        if (!result.affectedRows) return res.sendStatus(404)
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
    }
})

// Update
router.patch('/:ovitrapID', async (req, res, next) => {
    try {
        const updateResult = await OvitrapModel.update(req.params.ovitrapID, req.body)
        if (!updateResult.affectedRows) return res.sendStatus(404)

        const result = await OvitrapModel.getById(req.params.ovitrapID)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})


module.exports = router