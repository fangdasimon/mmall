/*
* @Author: simon
* @Date:   2018-03-20 10:11:26
* @Last Modified by:   simon
* @Last Modified time: 2018-03-20 16:04:38
*/
'use strict'
require('./index.css')
var templateIndex=require('./index.string')
var _mm=require('util/mm.js')
var _product=require('service/product-service.js')
var _cart=require('service/cart-service.js')

var page={
    data:{
        productId:_mm.getUrlParam('productId')
    },
    init:function(){
        this.loadDetail()
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $(document).on('mouseenter','.img-item',function(){
            //var imgUrl2=$('.p-img').attr('src')  只能获得第一个图片
            var imgUrl=$(this).find('.p-img').attr('src')
            $('.p-main-img').attr('src',imgUrl)
        })
        $(document).on('click','.info-mount',function(){
            var $this=$(this),
                $infoCount=$('.info-input'),
                currtValue=parseInt($infoCount.val()),
                minValue=1,
                maxValue=_this.data.detailInfo.stock||1,
                type=$this.hasClass('plus')?'plus':'minus';
            if(type==='plus'){
                //++在三目运算符 中不能用
                $infoCount.val(currtValue<maxValue?currtValue+1:maxValue)
            }else if(type==='minus'){
                $infoCount.val(currtValue=currtValue>minValue?currtValue-1:minValue)
            }
        })
        $(document).on('click','#cart-add',function(){
            _cart.addCart({
                productId:_this.data.productId,
                count    :$('.info-input').val()
            },function(res){
                window.location.href='./result.html?type=add-cart'
            },function(errMsg){
                _mm.errorTips(errMsg)
            })
        })
    },
    loadDetail:function(){
        var _this=this
        _product.productDetail(_this.data.productId,function(res){
            _this.data.detailInfo=res
            _this.filterImg(res)
        var detailHtml=_mm.renderHtml(templateIndex,res)
            $('.page-wrap').html(detailHtml)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    filterImg:function(data){
        data.subImages=data.subImages.split(',')
    }
}
$(function(){
    page.init()
})