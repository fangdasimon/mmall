/*
* @Author: simon
* @Date:   2018-03-17 09:38:27
* @Last Modified by:   simon
* @Last Modified time: 2018-03-17 10:14:37
*/
require('./index.css')
var _mm=require('util/mm.js')
var header={
    init:function(){
        var _this=this
        _this.bindEvent()
        _this.onload()
    },
    onload:function(){//搜索回填
        var keyword=_mm.getUrlParam('keyword')
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent:function(){
        var _this=this
        $('#search-btn').click(function(){
            _this.searchSubmit()
        })
        $('#search-input').keyup(function(e){//keyCode 是事件的属性
            if(13===e.keyCode){
                 _this.searchSubmit()
            }
        })
    },
    searchSubmit:function(){
        var keyword=$.trim($('#search-input').val())
        if(keyword){
            window.location.href='./list.html?keyword='+keyword
        }else{
            _mm.goHome()
        }
    }
}
header.init()