import mongoose from 'mongoose';

const collection = 'Users';
const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    }
})

const usersModel = mongoose.model(collection,schema);

export default usersModel;