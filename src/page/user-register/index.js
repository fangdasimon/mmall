/*
* @Author: simon
* @Date:   2018-03-17 17:48:51
* @Last Modified by:   simon
* @Last Modified time: 2018-04-06 10:20:39
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
        $('#username').blur(function(){
            var username=$.trim($('#username').val())
            if (!username) {return;} 
            _user.checkUsername(username,function(res){
                $('.error').hide() //0 第一次错误之后如果正确可以马上隐藏错误
            },function(errMsg){
                _this.showError(errMsg)//1 用户名存在
            })
        })
        $('.register-submit').click(function(){
            _this.registerSubmit()
        })
        $('.user-input').keyup(function(e){
            if(13===e.keyCode){
                _this.registerSubmit()
            }
        })
    },
   registerSubmit:function(){
        var _this=this
        var getData={
            username        :$.trim($('#username').val()),
            password        :$.trim($('#newPassword').val()),
            phone           :$.trim($('#phone').val()),
            email           :$.trim($('#email').val()),
            question        :$.trim($('#question').val()),
            answer          :$.trim($('#answer').val()),
        }
        var validateResult=_this.validateData(getData)
        if(validateResult.status){
            _user.register(getData,function(res){
                window.location.href='./result.html?type=register'
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
        if(data.password.length<6){
            result.msg='密码长度不能少于6位'
            return result
        }
        if($.trim($('#cfm-password').val())!==data.password){
            result.msg='两次的密码输入不一致'
            return result
        }
        if(!_mm.validate(data.phone,'phone')){
            result.msg='手机格式不准确'
            return result
        }
        if(!_mm.validate(data.email,'email')){
            result.msg='邮箱地址格式不准确'
            return result
        }
        if(!_mm.validate(data.question,'require')){
            result.msg='密码提示问题不能为空'
            return result
        }
        if(!_mm.validate(data.answer,'require')){
            result.msg='密码提示答案不能为空'
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