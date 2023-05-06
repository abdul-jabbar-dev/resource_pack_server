const mongoose = require('mongoose')
const { Schema } = mongoose;
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
        required: [true, 'Description field required '],
        maxlength: [200, 'Maximum length 200 ']
    },
    requirements: {
        type: String,
        required: [true, 'Description field required '],
        maxlength: [200, 'Maximum length 200 ']
    },
    thumbnail: {
        type: String,
        maxlength: [200, 'Maximum length 200 ']
    },
    create_at: {
        type: String
    }
}, {
    timestamps: true
})

const COURSE = mongoose.model('course', courseSchema)
module.exports = COURSE