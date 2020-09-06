const mongoose = require('mongoose')

const PostShema = mongoose.Schema({
    postedAt:{
        type: String,
        trim: true,
        required: true

    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cijena:{
        type: Number,
        required: true,
        trim: true
    },
    zupanija:{
        type: String,
        required: true,
        trim: true
    },
    grad:{
        type: String,
        required: true,
        trim: true

    },
    naselje:{
        type: String,
        trim: true
    },
    ljubimci:{
        type: Boolean,
        default: false
    },
    dostupnoGod:{
        type: Boolean,
        default: false
    },
    odvojenaSoba:{
        type: Boolean,
        default: false
    },
    terasa:{
        type: Boolean,
        default: false
    },
    ukljuceneRezije:{
        type: Boolean,
        default: false
    },
    opis:{
        type: String,
        required: false
    },
    idsOfPhotos: [],
    kontaktBroj:{
        type: Number
    },
    kontaktMail:{
        type: String
    }
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostShema)

module.exports = Post