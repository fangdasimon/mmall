/*
* @Author: simon
* @Date:   2018-03-17 11:45:09
* @Last Modified by:   simon
* @Last Modified time: 2018-03-23 10:32:27
*/
require('./index.css')
var _mm=require('util/mm.js')
require('page/common/nav-simple/index.js')
$(function(){
    var type=_mm.getUrlParam('type')||'default'
    var $element=$('.'+type+'-success')
    if('payment'==type){
        var orderNo=_mm.getUrlParam('orderNo')
        var $orderNumber=$element.find('.orderNumber')
        $('.orderNumber').attr('href',$orderNumber.attr('href')+orderNo)
    }
    $element.show()
})
