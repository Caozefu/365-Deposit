const express = require('express');
const router = express.Router();
const User = require('./controller/modules/User');

/*
* User
* 用户相关模块
* */
// 登陆状态
// router.get('/login/status', controller.loginStatus);
// 获取用户信息
// router.get('/getUserInfo', controller.getUserInfo);
// 修改用户信息
// router.post('/updateUserInfo', controller.updateUserInfo);
// 注册
router.get('/register', User.register);
// 登陆
// router.post('/login', User.login);


module.exports = router;
