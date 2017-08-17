import UserModel from '../models/user';
import UserDetailModel from '../models/userDetail';
import { packJSON } from './base';
import crypto from 'crypto';//用于加密生成各种散列
import uuidv1 from 'uuid/v1';//生成唯一id, v1基于timestamp,v4基于random

class Admin{
    constructor(){
        this.login = this.login.bind(this);
        this.Md5 = this.Md5.bind(this);
        this.register = this.register.bind(this);
    }
    //MD5 16进制加密
    Md5(password){
        let md5 = crypto.createHash('md5');
        return md5.update(password).digest('hex');
    }
    async login(req, res, next){
        const { username, password } = req.body;
        try {
            if(username === '' || password === '') {
                throw new Error('登录信息有误');
            }
        } catch (err) {
            res.send(packJSON(err,7));
        }
        const newPassword = this.Md5(password);

        try {
            const user = await UserModel.findOne({user_name: username, password: newPassword});
            if(user){
                req.session.user_id = user.id;
                console.log('login success');
                res.send(packJSON({
                    uid: user.uid,
                    user_name: user.user_name,
                    identity: user.identity
                }));
            }else{
                req.session.user_id = null;
                console.log('login fail');
                res.send(packJSON('用户名/密码错误',6));
            }
        } catch (err) {
            res.send(packJSON(err,6));
        }
    }
    async register(req,res,next){
        const { username, password, repassword } = req.body;
        try {
            if(username === ''){
                throw new Error('用户名不可为空')
            }
            if(password === ''){
                throw new Error('密码不可为空');
            }
            if(password !== repassword){
                throw new Error('两次密码不一致');
            }
        } catch (err) {
            res.send(packJSON(err,6));
        }
        try {
            const user = await UserModel.findOne({user_name: username});
            if(user){
                res.send(packJSON('用户名已存在',6));
            }else{
                const newPassword = this.Md5(password);
                const newUser = {
                    uid: uuidv1(),
                    user_name: username,
                    password: newPassword,
                    create_time: new Date().getTime(),
                    identity: 'user'
                };
                await UserModel.create(newUser);
                await UserDetailModel.create({
                    ...newUser,
                    avatar:'img_url',
                    posts:[]
                });
                res.send(packJSON('注册成功'));
            }
        } catch (err) {
            console.log(err);
            res.send(packJSON(err,6));
        }

    }
    async logout(req,res,next){
        req.session.destroy();
        console.log(('logout'));
        res.send(packJSON('登出成功'));
    }
}
export default new Admin();
