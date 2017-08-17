import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    uid: String,
    user_name: String,
    password: String,
    create_time: String,
    identity: String,
    avatar: String,
    posts: [String]
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);

export default UserDetail;
