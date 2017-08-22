import UserDetailModel from '../models/userDetail';
import UserModel from '../models/user';
import PostModel from '../models/post';
import { packJSON } from './base';

class UserDetail{
    constructor(){

    }
    async getDetail(req,res,next){
        const uid = req.query.uid;
        if(!uid){
            res.send(packJSON('参数错误',6));
        }
        try {
            const detail = await UserDetailModel.findOne({uid});
            if(detail){
                res.send(packJSON(detail));
            }else{
                res.send(packJSON('没有相关用户信息',6));
            }
        } catch (err) {
            res.send(packJSON(err),9)
        }
    }
    async update(req,res,next){
        const { uid, user } = req.body;
        if(!uid || !user) res.send(packJSON(err,6));
        try {
            await UserDetailModel.findOneAndUpdate({uid: uid}, user);
            await UserModel.findOneAndUpdate({uid: uid}, {
                user_name: user.user_name,
                password: user.password
            });
            res.send(packJSON('更新成功'));
        } catch (err) {
            res.send(packJSON(err),9);
        }
    }
    async getPosts(req,res,next){
        const uid = req.query.uid;
        if(!uid){
            res.send(packJSON('参数错误',6));
        }
        try {
            const posts = await PostModel.find({uid});
            if (posts) {
                res.send(packJSON(posts));
            }else{
                res.send(packJSON('用户信息错误',6));
            }
        } catch (err) {
            res.send(packJSON(err),9);
        }
    }
}
export default new UserDetail();
