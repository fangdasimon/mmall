/*
* @Author: simon
* @Date:   2018-03-22 17:30:36
* @Last Modified by:   simon
* @Last Modified time: 2018-03-22 20:10:15
*/
require('./index.css')
var _mm=require('util/mm.js')
var navSide=require('page/common/nav-side/index.js')
var orderTemplate=require('./index.string')
var _order=require('service/order-service.js')

var page={
    data:{
        orderNo:_mm.getUrlParam('orderNo')
    },
    init:function(){
        navSide.init({
            name:"order-list"
        })
        this.loadeOrderDetail()
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $(document).on('click','.cancel-order',function(){
            if(window.confirm('确定要取消订单吗?')){
                var orderNo=_this.data.orderNo
                _order.orderCancel(orderNo,function(res){
                    _mm.successTips('订单取消成功')
                    _this.loadeOrderDetail()
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }
        })
    },
    loadeOrderDetail:function(){
        var orderNo=this.data.orderNo
        _order.orderDetail(orderNo,function(res){
            var DetailHtml=_mm.renderHtml(orderTemplate,res)
            $('.orderdetail-wrap').html(DetailHtml)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    }
}
$(function(){
    page.init()
})