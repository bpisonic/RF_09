const mongoose = require('mongoose')

const Photo = mongoose.model('Photo',{
    data: {
        type: Buffer,  
    }
})

module.exports = Photo