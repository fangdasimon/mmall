/*
* @Author: simon
* @Date:   2018-03-21 13:55:08
* @Last Modified by:   simon
* @Last Modified time: 2018-03-22 13:14:29
*/
var _mm=require('util/mm.js')
var _address={
    addressList:function(resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/shipping/list.do'),
            data    :{
                pageSize:30
            },
            success :resolve,
            error   :reject
        })
    },
    addAddress:function(revceiverInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/shipping/add.do'),
            data    :revceiverInfo,
            success :resolve,
            error   :reject
        })
    },
    selectAddress:function(shippingId,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/shipping/select.do'),
            data    :{
                shippingId:shippingId
            },
            success :resolve,
            error   :reject
        })
    },
    updateAddress:function(revceiverInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/shipping/update.do'),
            data    :revceiverInfo,
            success :resolve,
            error   :reject
        })
    },
    deleteAddress:function(shippingId,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/shipping/del.do'),
            data    :{
                shippingId:shippingId
            },
            success :resolve,
            error   :reject
        })
    }
    
}
module.exports=_address