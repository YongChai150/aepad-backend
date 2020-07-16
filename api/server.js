const port = process.env.PORT || 3000
const express = require('express')
const reportRouter = require('./controllers/report_controller')
const userRouter = require('./controllers/user_controller')
const ovitrapRouter = require('./controllers/ovitrap_controller')
const cupRouter = require('./controllers/cup_controller')
const app = express()

app.use(express.json())

app.get('/', (req, res, next) => res.send(`Server is running on port ${port}`))
app.use('/report', reportRouter)
app.use('/users', userRouter)
app.use('/ovitrap', ovitrapRouter)
app.use('/cup', cupRouter)

app.listen(port, () => { console.log(`Server is running on port ${port}`) })
