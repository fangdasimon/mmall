/*
* @Author: simon
* @Date:   2018-03-22 15:31:31
* @Last Modified by:   simon
* @Last Modified time: 2018-03-22 19:21:49
*/
require('./index.css')
var _mm=require('util/mm.js')
var navSide=require('page/common/nav-side/index.js')
var _order=require('service/order-service.js')
var orderTemplate=require('./index.string')
var pagination=require('util/pagination/index.js')

var page={
    data:{
        listparam:{
            pageNum:1,
            pageSize:10
        }
    },
    init:function(){
        navSide.init({
            name:"order-list"
        })
        this.loadOrderList()
    },
    loadOrderList:function(){
        var _this=this
       _order.orderList(_this.data.listparam,function(res){
            var orderHtml=_mm.renderHtml(orderTemplate,res)
            $('.order-list-con').html(orderHtml)
            _this.loadPagination({
                    previous        :res.prePage,
                    nextPage        :res.nextPage,
                    hasPreviousPage :res.hasPreviousPage,
                    hasNextPage     :res.hasNextPage,
                    pageNum         :res.pageNum,
                    pages           :res.pages 
                })
       },function(errMsg){
            _mm.errorTips(errMsg)
       })
    },
    loadPagination:function(userInfo){
        var _this=this//每次请求数据都不一样所以都要新建一个对象 保证独立
            _this.pagination?'':(_this.pagination=new pagination())
        _this.pagination.render($.extend({},userInfo,{
            container:$('.pagination'),
            selectPage:function(pageNum){
                _this.data.listparam.pageNum=pageNum,
                _this.loadOrderList()//数据变化重新请求
            }
        }))
    }
}
$(function(){
    page.init()
})