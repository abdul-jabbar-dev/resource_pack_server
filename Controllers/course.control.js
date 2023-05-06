const COURSE = require("../Schema/course.schema")
const { uploadImage, deleteImage } = require("../util/uploadMedia")

module.exports.getAllCourse = async (req, res) => {
    try {
        const result = await COURSE.find() 
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateACourse = async (req, res) => {
    try {
        const result = await COURSE.find() 
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.postACourse = async (req, res) => {
    try { 
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files))  }) 
        const result = await COURSE.create(data) 
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}
module.exports.deleteACourse = async (req, res) => {
    try { // not use into commant box
        const CourseId = req.params.courseId 
        const result = await COURSE.findByIdAndDelete(CourseId) 
        if (result.thumbnail){
            deleteImage(result.thumbnail)
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}