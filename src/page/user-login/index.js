/*
* @Author: simon
* @Date:   2018-03-15 13:44:44
* @Last Modified by:   simon
* @Last Modified time: 2018-04-06 10:19:19
*/
require('./index.css')
require('page/common/nav-simple/index.js')
var _mm=require('util/mm.js')
var _user=require('service/user-service.js')

var page={
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $('.login-submit').click(function(){
            _this.loginSubmit()
        })
        $('.user-input').keyup(function(e){
            if(13===e.keyCode){
                _this.loginSubmit()
            }
        })
    },
   loginSubmit:function(){
        var _this=this
        var getData={
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val())
        }
        var validateResult=_this.validateData(getData)
        if(validateResult.status){
            _user.login(getData,function(res){//重定向相当于重新请求了一遍，之前的接口请求看不到
                window.location.href=_mm.getUrlParam('redirect')||'./index.html'
            },function(errMsg){
                _this.showError(errMsg)
            })
        }else{
            _this.showError(validateResult.msg)
        }
   },
   validateData:function(data){
        var result={
            status:false,
            msg:''
        }
        if(!_mm.validate(data.username,'require')){
            result.msg='用户名不能为空'
            return result
        }
        if(!_mm.validate(data.password,'require')){
            result.msg='用户密码不能为空'
            return result
        }
        result.msg='验证通过'
        result.status=true
        return result
   },
   showError:function(errMsg){
        $('.error').show().find('.errorMsg').text(errMsg)
   }
}
$(function(){
    page.init()
})

