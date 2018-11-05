/*
* @Author: simon
* @Date:   2018-03-16 17:52:06
* @Last Modified by:   simon
* @Last Modified time: 2018-03-17 17:31:41
*/
require('./index.css')
var _mm=require('util/mm.js')
var _user=require('service/user-service.js')
var _cart=require('service/cart-service.js')
var nav={
    init:function(){
        var _this=this
        _this.loadUserInfo()
        _this.loadCartCount()
        _this.bindEvent()
        return this
    },
    bindEvent:function(){
        $('.js-login').click(function(){
            _mm.doLogin()
        })
        $('.js-register').click(function(){
            window.location.href='./user-register.html'
        })
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload()
            },function(errMsg){
                _mm.errorTips(errMsg)
            })
        })
    },
    loadUserInfo:function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().
                                find('.username').text(res.username)
        },function(errMsg){
            //do nothing
        })
    },
    loadCartCount:function(){
        _cart.getCartCount(function(res){
            $('.cart-count').text(res||0)
        },function(errMsg){
            $('.cart-count').text(0)
        })
    }
}
module.exports=nav.init()