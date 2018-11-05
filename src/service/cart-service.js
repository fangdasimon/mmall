/*
* @Author: simon
* @Date:   2018-03-16 20:23:28
* @Last Modified by:   simon
* @Last Modified time: 2018-03-21 13:58:43
*/
var _mm=require('util/mm.js')
var _cart={
    getCartCount:function(resolve,reject){//获取购物车数量
        _mm.request({
            url     :_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success :resolve,
            error   :reject
        })
    },
    addCart:function(cartInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/add.do'),
            data    :cartInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    cartList:function(resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/list.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    selectProcuct:function(productId,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/select.do'),
            data    :{
                productId:productId
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    unSelectProcuct:function(productId,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/un_select.do'),
            data    :{
                productId:productId
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    selectProcuctAll:function(resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/select_all.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    unSelectProcuctAll:function(resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/un_select_all.do'),
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    deleteProcuct:function(productIds,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/delete_product.do'),
            data    :{
                productIds:productIds
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    updateCount:function(updateInfo,resolve,reject){
        _mm.request({
            url     :_mm.getServerUrl('/cart/update.do'),
            data    :updateInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    }
    
}
module.exports=_cart