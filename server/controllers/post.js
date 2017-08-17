import PostModel from '../models/post';
import { packJSON } from './base';
import uuidv1 from 'uuid/v1';

class Post {
    constructor(){
    }
    async get(req,res,next) {
        const query = req.query;
        console.log(query);
        const posts = await PostModel.find().sort({'create_time': -1});
        res.send(packJSON(posts));
    }
    async public(req,res,next) {
        const { uid, username, title, content } = req.body;
        try {
            if(!uid || !username || !req.session.user_id){
                throw new Error('用户权限错误');
            }
            if(title === ''){
                throw new Error('标题不能为空');
            }
            if(content === ''){
                throw new Error('内容不能为空');
            }
        } catch (err) {
            res.send(packJSON(err,8));
        }
        const newPost = {
            id: uuidv1(),
            uid: uid,
            user_name: username,
            create_time: new Date().getTime(),
            title: title,
            content: content
        };
        await PostModel.create(newPost);
        res.send(packJSON('Public success!'));
    }
    async update(req,res,next) {
        const { id, post } = req.body;
        if(!id || !post) res.send(packJSON('参数错误',6));
        try {
            await PostModel.findOneAndUpdate({id: id}, post);
            res.send(packJSON('post更新成功'));
        } catch (error) {
            res.send(packJSON(error,9))
        }
    }
    async delete(req,res,next) {
        const { id } = req.body;
        if(!id) res.send(packJSON('post id 不能为空',6));
        try {
            await PostModel.remove({id: id});
            res.send(packJSON('删除成功'));
        } catch (error) {
            res.send(packJSON(error,9));
        }
    }
}

export default new Post();
