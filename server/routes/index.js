import express from 'express';
import Admin from '../controllers/admin';
import Post from '../controllers/post';
import User from '../controllers/user';
import { packJSON } from '../controllers/base';
const router = express.Router();

//no-need authority
router.get('/api/posts', Post.get);
router.post('/api/login', Admin.login);
router.get('/api/logout', Admin.logout);
router.post('/api/reg', Admin.register);

//need authority
router.use('/api', function(req,res,next){
    if(req.session && req.session.user_id){
        next();
    }else{
        res.send(packJSON('用户权限错误',8));
    }
});
router.post('/api/posts/public', Post.public);
router.post('/api/posts/update', Post.update);
router.post('/api/posts/delete', Post.delete);

router.get('/api/users', User.getList);
router.post('/api/users/update', User.update);
router.post('/api/users/delete', User.delete);

export default (app) => {
    app.use('/', router);
};
