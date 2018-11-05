/*
* @Author: simon
* @Date:   2018-03-19 14:37:45
* @Last Modified by:   simon
* @Last Modified time: 2018-03-19 20:26:19
*/
'use strict'
require('./index.css')
require('util/unslider/index.js')
var templateIndex=require('./index.string')
var _mm=require('util/mm.js')
var _product=require('service/product-service.js')
var pagination=require('util/pagination/index.js')

var page={
    data:{
        listParam:{
            categoryId  :_mm.getUrlParam('categoryId')||'',
            keyword     :_mm.getUrlParam('keyword')||'',
            pageNum     :_mm.getUrlParam('pageNum')||1,
            pageSize    :_mm.getUrlParam('pageSize')||20,
            orderBy     :_mm.getUrlParam('orderBy')||'default'
        }
    },
    init:function(){
        this.loadList()
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this
        $('.sort-item').click(function(){
            var $this=$(this)
            if($this.data('type')=='default'){
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item').
                    removeClass('active asc desc')
                    _this.data.listParam.orderBy='default'
                }
            }else if($this.data('type')=='price'){
                $this.addClass('active').siblings('.sort-item').
                    removeClass('active')
                    //第一次没有升序就升序如连续点击就一定是降序 再点击就是升降替换了 
                    //如果切换default在回来还是先asc升序
                    if(!$this.hasClass('asc')){
                        $this.addClass('asc').removeClass('desc')
                        _this.data.listParam.orderBy='price_asc'
                    }else{
                         $this.addClass('desc').removeClass('asc')
                        _this.data.listParam.orderBy='price_desc'
                    }
            }
            _this.loadList()//参数listParam变化 重新加载渲染
        })
    },
    loadList:function(){
        var _this=this
        var $listCon=$('.list-con')
            $listCon.html("<div class='loading'></div>")
        var listParam=_this.data.listParam
        _product.getList(listParam,function(res){
            var listHtml=_mm.renderHtml(templateIndex,{
                    list:res.list
                })
                $listCon.html(listHtml)
                 //pages多少页  pageSize允许一个页面有的产品个数
                _this.loadPagination({
                    previous        :res.prePage,
                    nextPage        :res.nextPage,
                    hasPreviousPage :res.hasPreviousPage,
                    hasNextPage     :res.hasNextPage,
                    pageNum         :res.pageNum,
                    pages           :res.pages 
                })
        },function(errMsg){
            _mm.errorTips(errMsg||'sorry 您选中的商品已下架~~')
        })
    },
    loadPagination:function(userInfo){
        var _this=this//每次请求数据都不一样所以都要新建一个对象 保证独立
            _this.pagination?'':(_this.pagination=new pagination())
        _this.pagination.render($.extend({},userInfo,{
            container:$('.pagination'),
            selectPage:function(pageNum){
                _this.data.listParam.pageNum=pageNum,
                _this.loadList()//数据变化重新请求
            }
        }))
    }
}
$(function(){
    page.init()
})
