/*
* @Author: simon
* @Date:   2018-03-18 13:33:12
* @Last Modified by:   simon
* @Last Modified time: 2018-03-18 15:02:10
*/
require('./index.css')
var _mm=require('util/mm.js')
var navSide=require('page/common/nav-side/index.js')
var _user=require('service/user-service.js')
var templateIndex=require('./index.string')

var page={
    init:function(){
        navSide.init({
            name:"user-center"
        })
        this.loadUserInfo()
    },
    loadUserInfo:function(){
        _user.getUserInfo(function(res){
            var userInfo=_mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userInfo)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    }
}
$(function(){
    page.init()
})