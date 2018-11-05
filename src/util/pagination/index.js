
'use strict'
require('./index.css')
var templateIndex=require('./index.string')
var _mm=require('util/mm.js')

var Pagination=function(){
    var _this=this
    var defaultOption={
        pageNum:1,
        pageRange:3
    }
    $(document).on('click','.pg-item',function(){
        var $this=$(this)
        if($this.hasClass('active')||$this.hasClass('disabled')){
            return;
        }
         _this.option.selectPage($(this).data('value'))
    })
}

Pagination.prototype.render=function(userOption){
    var _this=this
    _this.option=$.extend({},_this.defaultOption,userOption)
    if(_this.option.pages<=1){return;}
    _this.option.container.html(_this.getPaginationHtml())
}
Pagination.prototype.getPaginationHtml=function(){
    var option=this.option//例 range3 pages7
        // 当前页小于等于range+1   start  是1         end是当前页+3
        // 当起那也大于等于range+2 start  是当前页-3  end是pages
    var start=option.pageNum-option.pageRange>0?
              option.pageNum-option.pageRange:1
    var end  =option.pageNum+option.pageRange<option.pages?
              option.pageNum+option.pageRange:option.pages
    var pageArray=[]
    pageArray.push({
        name:'上一页',
        value:option.previous,
        disabled:!option.hasPreviousPage
    })
    for(var i=start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            active:(i===option.pageNum)
        })
    }
    pageArray.push({
        name:'下一页', 
        value:option.nextPage,
        disabled:!option.hasNextPage
    })
    var pagination=_mm.renderHtml(templateIndex,{
        pageArray:pageArray,
        pageNum:option.pageNum,
        pages:option.pages
    })
    return pagination
}

module.exports=Pagination