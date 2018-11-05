/*
* @Author: simon
* @Date:   2018-03-21 11:09:30
* @Last Modified by:   simon
* @Last Modified time: 2018-03-23 21:56:45
*/
'use strict'
require('./index.css')
var addressTemplate=require('./address.string')
var productTemplate=require('./product.string')
var _mm=require('util/mm.js')
var modal=require('./modal.js')
var _cart=require('service/cart-service.js')
var _address=require('service/address-service.js')
var _order=require('service/order-service.js')

var page={
    data:{
        selectedAddressId:''
    },
    init:function(){
        this.loadAddressList()
        this.loadCartList()
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $(document).on('click','.address-wrap',function(){
            $(this).addClass('active').siblings('.address-wrap').removeClass('active')
             _this.data.selectedAddressId=$(this).data('id')
        })
        // 提交订单
        $(document).on('click','.btn-count',function(){
            var shippingId=_this.data.selectedAddressId
            if(shippingId){
                _order.creatOrder(shippingId,function(res){
                    window.location.href='./payment.html?orderNo='+res.orderNo    
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }else{
                _mm.errorTips('您还没有选中收货地址~~')
            }
        })
        // 添加地址 添加成功后会有一个id 1选中一个地址需要id 2回填一个地址需要一个id
        $(document).on('click','.address-add',function(){
            modal.show({
                isUpdate:false,
                onSuccess:function(){
                    _this.loadAddressList()
                }
            })
        })
        // 修改地址
        $(document).on('click','.address-update',function(e){
            e.stopPropagation()//阻止外层的点击事件
            var shippingId=$(this).parents('.address-wrap').data('id')
            console.log(shippingId)
            _address.selectAddress(shippingId,function(res){
                modal.show({
                    isUpdate:true,
                    data    :res,//表单的回填
                    onSuccess:function(){
                        _this.loadAddressList()
                    }
                })
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
        })
        // 删除地址
        $(document).on('click','.address-delete',function(e){
            e.stopPropagation()//阻止外层的点击事件
            var shippingId=$(this).parents('.address-wrap').data('id')
            if(window.confirm('你确定要删除改地址')){
                _address.deleteAddress(shippingId,function(res){
                   _this.loadAddressList()
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }
        })
    },
    loadAddressList:function(){
        var addressHtml=''
        _address.addressList(function(res){
            console.log(res)
            addressHtml=_mm.renderHtml(addressTemplate,res)
            $('.address-panel').html(addressHtml)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    loadCartList:function(){
        var cartHtml=''
        _cart.cartList(function(res){
            cartHtml=_mm.renderHtml(productTemplate,res)
            $('.product-panel').html(cartHtml)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    }
}
$(function(){
    page.init()
})