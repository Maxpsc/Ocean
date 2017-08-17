import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: String,
    uid: String,
    user_name: String,
    create_time: String,
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

export default Post;
