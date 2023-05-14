const express = require('express')

 const { upload } = require('../Config/multer')
const { postACourse, deleteACourse, getAllCourse ,getACourse, updateACourse} = require('../Controllers/course.control')
const CourseRoute = express.Router()

CourseRoute
    .get('/', getAllCourse)
    .get('/:id', getACourse)
    .post('/', upload('course').any(), postACourse)
    .delete('/:courseId',deleteACourse)
    .put('/:courseId', upload('service').any(),updateACourse)


// ServiceRoute
//     .post('/review/:serviceId', postAServiceReview)
//     .delete('/review/:reviewId', deleteAServiceReview)

module.exports = CourseRoute