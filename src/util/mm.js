/*
* @Author: simon
* @Date:   2018-03-16 11:19:03
* @Last Modified by:   simon
* @Last Modified time: 2018-04-23 19:32:09
*/
var cof={serverHost:''}
var Hogan=require('hogan.js')
var _mm={
    request:function(param){
        var _this=this
        $.ajax({
            type:param.method||'GET',
            url :param.url||'',
            data:param.data||'',
            success:function(res){//接口请求成功
                if(0==res.status){//登录成功 data为一个对象 msg为一个string
                    param.success(res.data,res.msg)
                }
                else if(1==res.status){//登录失败
                    param.error(res.msg)
                }
                else if(10==res.status){//没有登录
                    _this.doLogin()
                }
            },
            error:function(err){//接口请求失败
                param.error(err.statusText)
            }
        })
    },
    doLogin:function(){
        window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href)
    },
    getServerUrl:function(path){
        return cof.serverHost+path
    },
    getUrlParam:function(name){
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)')
        var result=window.location.search.substring(1).match(reg)
        //地址编码乱的时候记得解码decodeURIComponent
        //Cannot GET /dist/view/http%3A%2F%2Flocalhost%3A8088%2Fdist%2Fview%2Findex.html
        return result?decodeURIComponent(result[2]):''//&test=123& & 123 &
    },
    renderHtml:function(template,data){
        var template=Hogan.compile(template)
        var render=template.render(data)
        return render
    },
    successTips:function(msg){
        alert(msg||'恭喜你操作成功~~')
    },
    errorTips:function(msg){
        alert(msg||'哪里出错了仔细检查下~~')
    },
    validate:function(value,type){
        var value=$.trim(value)
        if('require'===type){
            return !!value
        }
        if('phone'===type){
            return /^1\d{10}$/.test(value)
        }
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome:function(){
        window.location.href='./index.html'
    }

}
module.exports=_mm