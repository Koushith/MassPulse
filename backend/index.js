import express from 'express'
import connectDB from './utils/db.js'

const PORT = 8000
const app = express()
app.use(cors());
app.use(express.json())
connectDB()


app.get('/', (req, res) => {
    res.send("This Route works!!")
})

app.listen(PORT, (req, res) => {
    console.log(`App is runing on the Port---${PORT}`)
})