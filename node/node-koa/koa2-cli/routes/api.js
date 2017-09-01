/**
 * 存放所有的api
 * */
import Router from 'koa-router';
import usersCtrl from './controller/usersCtrl/index'
const router = new Router();


//signin
router.post('/signin', usersCtrl.signin); //直接引入方法，不进行其他操作

//signout
router.post('/signout', usersCtrl.signout);

router.get('/users', usersCtrl.getUsers);
router.post('/users', usersCtrl.createUser);
router.put('/users/:id', usersCtrl.updateUser);
router.delete('/users/:id', usersCtrl.deleteUser);
module.exports = router;
