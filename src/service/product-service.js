/*
* @Author: simon
* @Date:   2018-03-19 15:40:01
* @Last Modified by:   simon
* @Last Modified time: 2018-03-20 19:52:19
*/
var _mm=require('util/mm.js')
var _product={
    getList:function(listInfo,resolve,reject){//请求退出
        _mm.request({
            url     :_mm.getServerUrl('/product/list.do'),
            data    :listInfo,
            method  :'POST',
            success :resolve,
            error   :reject
        })
    },
    productDetail:function(productId,resolve,reject){//请求退出
        _mm.request({
            url     :_mm.getServerUrl('/product/detail.do'),
            data    :{
                productId:productId
            },
            method  :'POST',
            success :resolve,
            error   :reject
        })
    }

}
module.exports=_product