const mongoose = require('mongoose') 
const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name field required '],
        trim: true
    },
    duration: {
        type: String,
        trim: true,
    }, language: {
        type: String,
        trim: true,
    },
    category: {
        type: String
    }, rating: {
        type: String
    },
    total_lectures: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Description field required ']
    },
    requirements: {
        type: String,
        required: [true, 'Description field required ']
    },
    courseMainLink: String,
    courseLink: [String], 
    tags: [String], 
    topics: String,
    thumbnail: {
        type: String
    },
    create_at: {
        type: String
    },
    status:{
        type:String,
        enum:['Active','Deactive'],
        default:"Active"
    }
}, {
    timestamps: true
})

const COURSE = mongoose.model('course', courseSchema)
module.exports = COURSE