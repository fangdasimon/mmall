/*
* @Author: simon
* @Date:   2018-03-15 14:03:30
* @Last Modified by:   simon
* @Last Modified time: 2018-03-23 10:54:56
*/
require('./layout.css')
require('node_modules/font-awesome/css/font-awesome.min.css')
require('page/common/footer/index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')

$(function () {
    $('.go-top').hide();//隐藏go-top按钮
         $(window).scroll(function(){
            if($(this).scrollTop() > 100){
                 $('.go-top').fadeIn();
            }else{
                 $('.go-top').fadeOut();
            }
        })
         $('.go-top').click(function(){
            $('html ,body').animate({scrollTop: 0}, 300);
            return false;
        })
})