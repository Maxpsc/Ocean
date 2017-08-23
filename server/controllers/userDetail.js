import UserDetailModel from '../models/userDetail';
import UserModel from '../models/user';
import PostModel from '../models/post';
import { packJSON, encryption } from './base';

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
        const { uid, opassword, user } = req.body;
        if(!uid || !user || !opassword) res.send(packJSON(err,6));
        try {
            const findUser = await UserModel.findOne({uid: uid, password: encryption(opassword)});
            console.log(findUser);
            if(!findUser){
                res.send(packJSON('密码错误，请重新输入',6));
            }else{
                await UserDetailModel.findOneAndUpdate({uid: uid}, user);
                await UserModel.findOneAndUpdate({uid: uid, password: encryption(opassword)}, {
                    user_name: user.user_name,
                    password: encryption(user.password)
                });
                res.send(packJSON('更新成功'));
            }
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
