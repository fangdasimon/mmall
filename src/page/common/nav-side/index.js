/*
* @Author: simon
* @Date:   2018-03-17 10:19:00
* @Last Modified by:   simon
* @Last Modified time: 2018-03-18 17:51:12
*/
require('./index.css')
var _mm=require('util/mm.js')
var templateIndex=require('./index.string')
var navSide={
    option:{
        name:'',
        navList:[
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'user-pass-reset',desc:'修改密码',href:'./user-pass-reset.html'},
            {name:'about',desc:'关于MMall',href:'./about.html'}
        ]
    },
    init:function(option){
        $.extend(this.option,option)//传过来的option会修改this.option里的name
        this.renderNavSide()
    },
    renderNavSide:function(){
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.name===this.option.navList[i].name){
               this.option.navList[i].isActive=true
            }
        }
        var navHtml=_mm.renderHtml(templateIndex,{
            navList:this.option.navList
        })
        $('.nav-side').html(navHtml)
    }
}
module.exports=navSide