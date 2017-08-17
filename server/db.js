import mongoose from 'mongoose';
mongoose.Promise = Promise;//for async/await

const dbUrl = 'mongodb://localhost:27017/microblog';
mongoose.connect(dbUrl,{useMongoClient: true});
const db = mongoose.connection;

db.once('open', () => {
	console.log('连接数据库成功');
});
db.on('error', (error) => {
	console.log('数据库错误: ' + error);
	mongoose.disconnect();
});
db.on('close', () => {
	console.log('数据库断开，准备重新连接');
	mongoose.connect(dbUrl,{useMongoClient: true});
});

export default db;
