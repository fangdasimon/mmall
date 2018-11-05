/*
* @Author: simon
* @Date:   2018-03-20 16:27:51
* @Last Modified by:   simon
* @Last Modified time: 2018-03-22 13:36:01
*/
'use strict'
require('./index.css')
var templateIndex=require('./index.string')
var _mm=require('util/mm.js')
var _cart=require('service/cart-service.js')

var page={
    data:{},
    init:function(){
        this.loadCart()
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        // 单选
        $(document).on('click','.select-input',function(){
            var $this=$(this)
            //productId 缓存取不到 cartProductVoList是一个数组无法定位到哪一个对象
            //自定义的data属性接受不到大写字符   大写productId失效
             var productId=$this.parents('.cart-table').data('productid')
            if($this.is(':checked')){//这个逻辑有问题
                _cart.selectProcuct(productId,function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }else{
                _cart.unSelectProcuct(productId,function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }
        })
        //全选
        $(document).on('click','.select-input-all',function(){
            var $this=$(this)
            if($this.is(':checked')){//这个逻辑有问题
                _cart.selectProcuctAll(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }else{
                _cart.unSelectProcuctAll(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }
        })
        //单个删除
        $(document).on('click','.cell-operate',function(){
            var $this=$(this)
             var productId=$this.parents('.cart-table').data('productid')
            if(window.confirm('确定要删除改商品吗?')){
               _this.deleteCart(productId)
            }
        })
        //批量删除
        $(document).on('click','.delete-selected',function(){
            if(window.confirm('确定要删除选中的商品吗?')){
                var $this=$(this)
                var productIds=[]
                var $selectItem=$('.select-input:checked')//获取元素节点
                for(var i=0,ilength=$selectItem.length;i<ilength;i++){
                    //$selectItem[i] 一个html对象需要用$包装一下
                    productIds.push($($selectItem[i]).parents('.cart-table').data('productid'))
                    console.log(productIds)
                }
                if(productIds.length){//通过字符串的方式传过去
                    var productIds=productIds.join(',')
                    _this.deleteCart(productIds)
                }else{
                    _mm.errorTips('您还没有选中要删除的商品~~')
                }
            }
        })
        // 操作数量
        $(document).on('click','.btn-count',function(){
             var $this=$(this)
             var productId=$this.parents('.cart-table').data('productid')
             var $cartInput=$this.siblings('.cart-input') //缓存当前对象的input 不然点击一个会联动
             var currtValue=parseInt($cartInput.val())
             var minCount=1
             var maxCount=$cartInput.data('max')//多个对象缓存取不到 无法定位  设置自定义属性
             var type=$this.hasClass('plus')?'plus':'minus'
             if(type==='plus'){
                 $cartInput.val(currtValue<maxCount?currtValue+1:maxCount)
                 var count=parseInt($cartInput.val())
                _this.updateCount(productId,count)
             }else if(type==='minus'){
                $cartInput.val(currtValue>minCount?currtValue-1:minCount)
                var count=parseInt($cartInput.val())
                _this.updateCount(productId,count)
             }
            
        })
         // 购物车结算
        $(document).on('click','.submit-count',function(){
           var productTotal=_this.data.cartInfo.cartTotalPrice
           if(productTotal>0){
                window.location.href='./order-confirm.html'
           }else{
                _mm.errorTips('请选中商品后在提交付款~~')
           }
        })
    },
    loadCart:function(){
        var _this=this
       _cart.cartList(function(res){
            _this.renderCart(res)
       },function(errMsg){
            _mm.errorTips(errMsg)
       })
    },
    deleteCart:function(productIds){
        var _this=this
        _cart.deleteProcuct(productIds,function(res){
            _this.renderCart(res)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    updateCount:function(productId,count){
        var _this=this
        _cart.updateCount({
            productId:productId,
            count:count
        },function(res){
            _this.renderCart(res)
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    renderCart:function(data){
        var _this=this
        _this.filter(data)
        _this.data.cartInfo=data
        var cartHtml=_mm.renderHtml(templateIndex,data)
        $('.page-wrap').html(cartHtml)
    },
    filter:function(data){//记得加length不然空的数组也是存在的
        data.noEmpty=!!data.cartProductVoList.length
    }
}
$(function(){
    page.init()
})