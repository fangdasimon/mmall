/*
* @Author: simon
* @Date:   2018-03-18 15:36:02
* @Last Modified by:   simon
* @Last Modified time: 2018-03-18 17:02:35
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
        this.bindEvent()
    },
    bindEvent:function(){
        // $('#center-update').click(function(){
            var _this=this
            $(document).on('click','#center-update',function(){
                var userInfo={
                    email   :$.trim($('#email').val()),
                    phone   :$.trim($('#phone').val()),
                    question:$.trim($('#question').val()),
                    answer  :$.trim($('#answer').val())
                }
                var validateResult=_this.validateData(userInfo)
                if(validateResult.status){
                    _user.updateCenter(userInfo,function(data,msg){
                        _mm.successTips(msg)//没有data但是必须接收
                        window.location.href='./user-center.html'
                    },function(errMsg){
                        _mm.errorTips(errMsg)
                    })
                }else{
                    _mm.errorTips(validateResult.msg)
                }
            })
        // })
    },
    validateData:function(userInfo){
        var result={
            status:false,//不能带引号否则string类型强制转Boolean为true了
            msg:''
        }
        if(!_mm.validate(userInfo.phone,'phone')){
            result.msg='手机格式不正确'
            return result
        }
        if(!_mm.validate(userInfo.email,'email')){
            result.msg='邮箱地址格式不正确'
            return result
        }
        if(!_mm.validate(userInfo.question,'require')){
            result.msg='密码提示问题不能为空'
            return result
        }
        if(!_mm.validate(userInfo.answer,'require')){
            result.msg='密码提示答案不能为空'
            return result
        }
        result.status=true
        result.msg='修改成功'
        return result
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