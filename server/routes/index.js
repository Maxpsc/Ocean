import express from 'express';
import Admin from '../controllers/admin';
import Post from '../controllers/post';
import User from '../controllers/user';
const router = express.Router();

router.post('/api/login', Admin.login);
router.post('/api/reg', Admin.register);
router.get('/api/logout', Admin.logout);

router.get('/api/posts', Post.get);
router.post('/api/posts/public', Post.public);
router.post('/api/posts/update', Post.update);
router.post('/api/posts/delete', Post.delete);

router.get('/api/users', User.getList);
router.post('/api/users/update', User.update);
router.post('/api/users/delete', User.delete);

export default (app) => {
    app.use('/', router);
};
