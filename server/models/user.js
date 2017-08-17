const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    user_name: String,
    password: String,
    create_time: String,
    identity: String
});
