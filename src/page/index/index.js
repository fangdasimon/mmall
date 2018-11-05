/*
* @Author: simon
* @Date:   2018-03-15 13:44:34
* @Last Modified by:   simon
* @Last Modified time: 2018-03-19 12:12:51
*/
'use strict'
require('./index.css')
require('util/unslider/index.js')
var templateIndex=require('./index.string')
var _mm=require('util/mm.js')

$(function(){
    var bannerHtml=_mm.renderHtml(templateIndex)
    $('.banner-content').html(bannerHtml)
    var $slider=$('.banner-con').unslider({
        dots:true
    })
    $('.banner-arrow').click(function(){
        var forword=$(this).hasClass('prev')?'prev':'next'
        $slider.data('unslider')[forword]()
    })

})




