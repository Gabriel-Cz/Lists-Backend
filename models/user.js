import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electronico es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

userSchema.plugin(uniqueValidator, { message: "Error, esperaba {PATH} unico."});

/* Won't save the password in JSON */
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
} 

const User = mongoose.model('User', userSchema);

export default User;