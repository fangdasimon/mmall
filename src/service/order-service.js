/*
* @Author: simon
* @Date:   2018-03-22 11:03:35
* @Last Modified by:   simon
* @Last Modified time: 2018-03-23 09:48:52
*/
var _mm=require('util/mm.js')
var _order={
    creatOrder:function(shippingId,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/create.do'),
            data    :{
                shippingId:shippingId
            },
            success :resolve,
            error   :reject
        })
    },
    orderList:function(listparam,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/list.do'),
            data    :listparam,
            success :resolve,
            error   :reject
        })
    },
    orderDetail:function(orderNo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/detail.do'),
            data    :{
                orderNo:orderNo
            },
            success :resolve,
            error   :reject
        })
    },
    orderCancel:function(orderNo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/cancel.do'),
            data    :{
                orderNo:orderNo
            },
            success :resolve,
            error   :reject
        })
    },
    goPayment:function(orderNo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/pay.do'),
            data    :{
                orderNo:orderNo
            },
            success :resolve,
            error   :reject
        })
    },
    getOrderStatus:function(orderNo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/order/query_order_pay_status.do'),
            data    :{
                orderNo:orderNo
            },
            success :resolve,
            error   :reject
        })
    }
    
    
}
module.exports=_order