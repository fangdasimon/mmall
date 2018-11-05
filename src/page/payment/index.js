/*
* @Author: simon
* @Date:   2018-03-23 09:36:38
* @Last Modified by:   simon
* @Last Modified time: 2018-05-03 12:52:15
*/
require('./index.css')
var _mm=require('util/mm.js')
var _order=require('service/order-service.js')
var paymentTemplate=require('./index.string')

var page={
    data:{
        orderNo:_mm.getUrlParam('orderNo')
    },
    init:function(){
        this.loadPayment()
    },
    loadPayment:function(){
        var _this=this
       _order.goPayment(_this.data.orderNo,function(res){
            var paymentHtml=_mm.renderHtml(paymentTemplate,res)
            $('.page-wrap').html(paymentHtml)
            _this.loadOrderStatus()
       },function(errMsg){
            _mm.errorTips(errMsg)
       })
    },
    loadOrderStatus:function(){
        var _this=this
        window.setInterval(function(){
            _order.getOrderStatus(_this.data.orderNo,function(res){
                if(true==res){//回调不稳定一直是false状态
                    window.location.href='./result.html?type=payment&orderNo='+_this.data.orderNo
               }
           },function(errMsg){
                _mm.errorTips(errMsg)
           })
        },5e3)
    }
}
$(function(){
    page.init()
})