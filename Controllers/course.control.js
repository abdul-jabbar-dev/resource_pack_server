const COURSE = require("../Schema/course.schema")
const { uploadImage, deleteImage } = require("../util/uploadMedia")

module.exports.getAllCourse = async (req, res) => {
    try {
        const query = req.query
        const fields = query.fields?.split(',')?.join(" ")
        const sort = query.sort?.split(',')?.join(" ")
        let page = (query.page) * 1 || 1
        let limit = (query.limit) * 1 || 5
        let search = (query.search)?.trim() || ''
        const count = await COURSE.find({}).count()
        let result; 
        if (search?.length > 1 ) {
            result = await COURSE.aggregate([
                {
                    $match: {
                        $or: [
                            { name: { $regex: `.*${search}.*` } },
                            { tags: { $regex: `.*${search}.*` } }
                        ]
                    }
                }
            ])
            console.log(result)
        } else {
            result = await COURSE.find({}, fields).sort(sort).skip((page - 1) * limit).limit(limit) 
        }

        res.status(200).send({ total: count, data: result })
    } catch (error) {
        console.log(error)
    }
}
module.exports.getACourse = async (req, res) => {
    try {
        const result = await COURSE.findById(req.params.id)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getCoursesBySearch = async (req, res) => {
    try {
        const result = await COURSE.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: '.*' + req.params.searchString + '.*' } },
                        { tags: { $regex: '.*' + req.params.searchString + '.*' } }
                    ]
                }
            }
        ])
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateACourse = async (req, res) => {
    try {
        const ext = await COURSE.findById(req.params.courseId)
        let data;
        if (req.files) {
            data = new Object({ ...(req.body), ...(uploadImage(req?.files)) })
        } else {
            data = new Object({ ...(req.body) })
        }
        if (data.courseLink) {
            data.courseLink = data.courseLink.split(',')
        }
        if (data.tags) {
            data.tags = data.tags.split(',')
        }
        console.log(data)
        const result = await COURSE.findByIdAndUpdate(ext._id, data)

        if (data.thumbnail !== ext.thumbnail) {
            deleteImage(ext.thumbnail)
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.postACourse = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files)) })
        if (data.courseLink) {
            data.courseLink = (data.courseLink.split(',')).filter(li => li.length > 1)
        } if (data.tags) {
            data.tags = (data.tags.split(',')).filter(t => t.length > 1)
        }
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
        if (result.thumbnail) {
            deleteImage(result.thumbnail)
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}