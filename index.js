const express = require('express')
const { Router } = require('express')
const cors = require('cors')
const auth = require('./auth')

const app = express()
const route = Router()

app.use(cors())
app.use(express.json())

route.get('/auth/qrcode', auth.generateQrCode)
route.post('/auth/verify', auth.verifyToken)

app.use(route)

app.listen(3000, () => console.log('Server ON!'))