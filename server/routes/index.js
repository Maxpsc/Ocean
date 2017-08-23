import express from 'express';
import multer from 'multer';

import Admin from '../controllers/admin';
import Post from '../controllers/post';
import User from '../controllers/user';
import UserDetail from '../controllers/userDetail';
import Upload from '../controllers/upload';

import { packJSON } from '../controllers/base';
const router = express.Router();

//no-need authority
router.get('/api/posts', Post.get);
router.post('/api/login', Admin.login);
router.get('/api/logout', Admin.logout);
router.post('/api/reg', Admin.register);

//need authority
// router.use('/api', function(req,res,next){
//     if(req.session && req.session.user_id){
//         next();
//     }else{
//         res.send(packJSON('用户权限错误',8));
//     }
// });

//user management
router.get('/api/user/detail', UserDetail.getDetail);
router.post('/api/user/update', UserDetail.update);
router.get('/api/user/posts', UserDetail.getPosts);

//for admin
router.post('/api/posts/public', Post.public);
router.post('/api/posts/update', Post.update);
router.post('/api/posts/delete', Post.delete);

router.get('/api/users', User.getList);
router.post('/api/users/update', User.update);
router.post('/api/users/delete', User.delete);

//upload
//control fileStorage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'server/static/img');
    },
    filename: function(req,file,cb){
        let type = '.' + file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now() + type);
    }
});
const upload = multer({storage: storage});
router.post('/api/upload/avatar', upload.single('avatar'), Upload.uploadAvatar);

export default (app) => {
    app.use('/', router);
};
