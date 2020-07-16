const UserModel = require('../models/user_model')
const express = require('express')
const router = express.Router()

// Get all 
router.get('/', async (req, res, next) => {
    try {

        const result = await UserModel.get()
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

//Get to login
router.get('/login', async (req, res, next) => {
    try {
        const result = await UserModel.getByLogin(req.body)
        if (!result) return res.sendStatus(404)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})


// Get one 
router.get('/:id', async (req, res, next) => {
    try {
        const result = await UserModel.getById(req.params.id)
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
        const createResult = await UserModel.create(req.body)
        if (!createResult.affectedRows) return res.sendStatus(409)

        const result = await UserModel.getById(createResult.insertId)
        res.status(201).json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Delete
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await UserModel.delete(req.params.id)
        if (!result.affectedRows) return res.sendStatus(404)
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
    }
})

// Update
router.patch('/:id', async (req, res, next) => {
    try {
        const updateResult = await UserModel.update(req.params.id, req.body)
        if (!updateResult.affectedRows) return res.sendStatus(404)

        const result = await UserModel.getById(req.params.id)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})


module.exports = router