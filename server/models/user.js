import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: String,
    user_name: String,
    password: String,
    create_time: String,
    identity: String
});

const User = mongoose.model('User', userSchema);

export default User;
