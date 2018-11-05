/*
* @Author: simon
* @Date:   2018-03-18 17:16:06
* @Last Modified by:   simon
* @Last Modified time: 2018-03-23 22:01:23
*/
require('./index.css')
var _mm=require('util/mm.js')
var navSide=require('page/common/nav-side/index.js')
var _user=require('service/user-service.js')

var page={
    init:function(){
        navSide.init({
            name:"user-pass-reset"
        })
        this.bindEvent()
    },
    bindEvent:function(){
            var _this=this
            //click 方法不能处理动态添加修改的元素 多以要用代理 
            $(document).on('click','#pass-reset-btn',function(){
                var userInfo={
                    password        :$.trim($('#password').val()),
                    newPassword     :$.trim($('#newPassword').val()),
                    cfmPassword     :$.trim($('#cfmPassword').val())
                }
                var validateResult=_this.validateData(userInfo)
                if(validateResult.status){
                    _user.updatePass({
                        passwordOld:userInfo.password,
                        passwordNew:userInfo.newPassword
                    },function(data,msg){//一定要带上data不然空对象的data会覆盖msg
                        _mm.successTips(msg)
                    },function(errMsg){
                        _mm.errorTips(errMsg)
                    })
                }else{
                    _mm.errorTips(validateResult.msg)
                }
            })
    },
    validateData:function(userInfo){
        var result={
            status:false,
            msg:''
        }
        if(!_mm.validate(userInfo.password,'require')){
            result.msg='密码输入不能为空'
            return result
        }
        if(!userInfo.newPassword || userInfo.newPassword.length<6){
            result.msg='密码不能少于六位'
            return result
        }
        if(userInfo.newPassword!==userInfo.cfmPassword){
            result.msg='两次的密码输入不一致'
            return result
        }
        result.status=true
        result.msg='修改成功'
        return result
    }
}
$(function(){
    page.init()
})