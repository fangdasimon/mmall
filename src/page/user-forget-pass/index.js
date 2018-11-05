/*
* @Author: simon
* @Date:   2018-03-18 09:52:22
* @Last Modified by:   simon
* @Last Modified time: 2018-04-09 20:09:54
*/
require('./index.css')
require('page/common/nav-simple/index.js')
var _mm=require('util/mm.js')
var _user=require('service/user-service.js')

var page={
    data:{
        username:'',
        questionL:'',
        token:''
    },
    init:function(){
        var _this=this
        _this.loadUsername()
        _this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $('#btn-username').click(function(){
            var username=$.trim($('#username').val())
            _user.getQuestion(username,function(res){
                _this.data.username=username
                _this.data.question=res
                _this.loadQuestion(res)
            },function(errMsg){
                _this.showError(errMsg)
            })
        })
        $('#btn-question').click(function(){
            var answer=$.trim($('#answer').val())
            _user.checkAnswer({
               username:_this.data.username, 
               question:_this.data.question, 
               answer  :answer
            },function(res){
                _this.data.token=res
                _this.loadPassword()
            },function(errMsg){
                _this.showError(errMsg)
            })
        })
        $('#btn-password').click(function(){
            var newPassowrd=$.trim($('#newPassowrd').val())
            if(newPassowrd && newPassowrd.length >= 6){
                _user.resetPassword({
                   username     :_this.data.username, 
                   passwordNew  :newPassowrd, 
                   forgetToken  :_this.data.token
                },function(res){
                   window.location.href='./result.html?type=forget-pass'
                },function(errMsg){
                    _this.showError(errMsg)
                })
            }else{
                _this.showError('密码位数不能少于六位')
            }
        })
    },
    loadUsername:function(){
        $('.step-name').show()
    },
    loadQuestion:function(res){
        $('.error').hide()//隐藏上一层错误的提示
        $('.step-name').hide().siblings('.step-question').
        show().find('.question').text(res)
    },
    loadPassword:function(){
        $('.error').hide()
        $('.step-question').hide().siblings('.step-newPassowrd').
        show()
    },
    showError:function(errMsg){
        $('.error').show().find('.errorMsg').text(errMsg)
    }
}
$(function(){
    page.init()
})