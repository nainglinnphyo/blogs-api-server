const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash:{
        type: String,
        required:true
    },
    created_date:{
        type:Date,
        default:Date.now()
    }
})


userSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

exports.User = mongoose.model('User', userSchema);