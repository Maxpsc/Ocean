import UserModel from '../models/user';
import { packJSON } from './base';

class User{
    constructor(){

    }
    async getList(req,res,next) {
        try {
            const users = await UserModel.find().sort({'create_time': -1});
            res.send(packJSON(users));
        }catch (error) {
            res.send(packJSON(error,9));
        }
    }
    async update(req,res,next) {
        const { uid, user } = req.body;
        if(!uid || !user) res.send(packJSON('参数错误',6));
        try {
            await UserModel.findOneAndUpdate({uid: uid}, user);
            res.send(packJSON('user更新成功'));
        } catch (error) {
            res.send(packJSON(error,9))
        }
    }
    async delete(req,res,next) {
        const { uid } = req.body;
        if(!uid) res.send(packJSON('user id 不能为空',6));
        try {
            await UserModel.remove({uid: uid});
            res.send(packJSON('删除成功'));
        } catch (error) {
            res.send(packJSON(error,9));
        }
    }
};

export default new User();
