const express = require('express')

 const { upload } = require('../Config/multer')
const { postACourse, deleteACourse, getAllCourse ,getACourse} = require('../Controllers/course.control')
const CourseRoute = express.Router()

CourseRoute
    .get('/', getAllCourse)
    .get('/:id', getACourse)
    .post('/', upload('course').any(), postACourse)
    .delete('/:courseId',deleteACourse)
    // .put('/:serviceId', upload('service').any(),updateAService)


// ServiceRoute
//     .post('/review/:serviceId', postAServiceReview)
//     .delete('/review/:reviewId', deleteAServiceReview)

module.exports = CourseRoute