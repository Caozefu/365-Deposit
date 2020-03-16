const resJson = require('../utils/resJson');
const loginModel = require('../model/login');
const tokenUtils = require('../utils/token');
const registerModel = require('../model/register');
const verifyModel = require('../model/verifyRegister');
const md5 = require("md5");

const User = {
    login: async (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        const {name, password} = req.body;
        await loginModel({name, password: md5(password)})
            .then(data => {
                if (data.length) {
                    const tokenData = {
                        name: data[0].user_name,
                        password: data[0].password,
                        phone: data[0].phone,
                        user_uid: data[0].user_uid
                    };
                    res.end(resJson.returnSuccess({token: tokenUtils.getToken(tokenData)}));
                } else {
                    res.end(resJson.returnError(500, '用户名或密码错误'));
                }
            }).catch(e => {
                res.end(resJson.returnError(500, '用户名或密码错误'));
            })
    },
    register: async (req, res) => {
        let flag = true;
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        const {name, password, phone} = req.body;
        // 验证用户名是否存在
        await verifyModel('user_name', name).then(data => {
            if (data.length) {
                res.end(resJson.returnError(500, '用户名已存在'));
                flag = false;
            }
        }).catch(e => {
            res.end(resJson.returnError(500, e));
            flag = false;
        });
        if (!flag) return;
        // 验证手机号是否存在
        await verifyModel('phone', phone).then(data => {
            if (data.length) {
                res.end(resJson.returnError(500, '手机号已存在'));
                flag = false;
            }
        }).catch(e => {
            res.end(resJson.returnError(500, e));
            flag = false;
        });
        if (!flag) return;

        await registerModel(req.body).then(data => {
            res.end(resJson.returnSuccess('注册成功'));
        }).catch(e => {
            res.end(resJson.returnError(500, e));
            flag = false;
        });
        if (!flag) return;
    },
};

async function searchFriends(key, value) {
    let data = await verifyModel(key, value);
    if (data.length) {
        data = data.map(item => {
            return {
                "user_uid": item.user_uid,
                "user_name": item.user_name,
                "nickname": item.nickname,
                "sex": item.sex,
                "portrait": item.portrait
            }
        })
    }
    return data;
}


module.exports = User;
