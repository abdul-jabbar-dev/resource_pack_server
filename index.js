const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const ServiceRoute = require('./Routes/service.route')
// const BlogRoute = require('./Routes/blog.route')
const UserRoute = require('./Routes/user.route')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const path = require('path')
var crypto = require('crypto');
const CourseRoute = require('./Routes/course.route')
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.text({ type: '/' }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

async function run() {

    try {
        //mongoconnection abdul.jabbar.dev@gmail.com resourchHack->(mongoId:abduljabbardev pass:resourceHack)
        await mongoose.connect("mongodb+srv://abduljabbardev:resourceHack@cluster0.dlcc2lp.mongodb.net/launch");
        console.log('db is connetct')
        app.use('/services', ServiceRoute)
        app.use('/users', UserRoute)
        // app.use('/blogs', BlogRoute)
        app.use('/course', CourseRoute)
    } catch (error) {
        console.log(error);
    }
}
run()


app.get('/', (req, res) => {
    crypto.randomBytes(2, function (err, buffer) {
        console.log(parseInt(buffer.toString('hex'), 16))
        res.send('helo');
    });

   
}) 
app.listen(PORT, (error) => {
    console.log('server listening')
})