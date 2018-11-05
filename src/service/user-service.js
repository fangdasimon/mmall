/*
* @Author: simon
* @Date:   2018-03-16 20:23:28
* @Last Modified by:   simon
* @Last Modified time: 2018-03-18 18:03:50
*/
var _mm=require('util/mm.js')
var _user={
    logout:function(resolve,reject){//请求退出
        _mm.request({
            url     :_mm.getServerUrl('/user/logout.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    checkLogin:function(resolve,reject){//验证是否已经登录,登录则欢迎
        _mm.request({
            url     :_mm.getServerUrl('/user/get_user_info.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    login:function(userInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/user/login.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    register:function(userInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/user/register.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    checkUsername:function(username,resolve,reject){//验证用户名是否已存在
        _mm.request({
            url     :_mm.getServerUrl('/user/check_valid.do'),
            data    :{
                type :'username',
                str:username
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    getQuestion:function(username,resolve,reject){//验证用户名后得到问题
        _mm.request({
            url     :_mm.getServerUrl('/user/forget_get_question.do'),
            data    :{
                username:username
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    checkAnswer:function(userInfo,resolve,reject){//验证问题答案
        _mm.request({
            url     :_mm.getServerUrl('/user/forget_check_answer.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    resetPassword:function(userInfo,resolve,reject){//重置密码
        _mm.request({
            url     :_mm.getServerUrl('/user/forget_reset_password.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    getUserInfo:function(resolve,reject){//加载个人中心
        _mm.request({
            url     :_mm.getServerUrl('/user/get_information.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    updateCenter:function(userInfo,resolve,reject){//修改个人中心
        _mm.request({
            url     :_mm.getServerUrl('/user/update_information.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    updatePass:function(userInfo,resolve,reject){//修改个人中心
        _mm.request({
            url     :_mm.getServerUrl('/user/reset_password.do'),
            data    :userInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    }

}
module.exports=_user