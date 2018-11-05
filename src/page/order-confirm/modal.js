/*
* @Author: simon
* @Date:   2018-03-21 16:01:19
* @Last Modified by:   simon
* @Last Modified time: 2018-04-04 20:44:42
*/
'use strict'
var _mm=require('util/mm.js')
var location=require('util/city/city.js')
var modalTempalte=require('./modal.string')
var _address=require('service/address-service.js')

var modal={
    data:{},
    show:function(option){
        this.option=option
        this.$modalWrap=$('.modal-wrap')//挂载到对象上全局使用
        this.loadModal()
        this.bindEvent()
    },
    hide:function(){
        //empty()直接移除掉其文本内容改的是html hide()是加一个displaynone属性
        //想再次显示就必须show了因为它改的是css
        this.$modalWrap.empty()  
    },
    loadModal:function(){
        var _this=this
        var modalHtml=_mm.renderHtml(modalTempalte,{
            isUpdate:_this.option.isUpdate,
            data:_this.option.data//回填需要的data
        })
        _this.$modalWrap.html(modalHtml)
        _this.loadProvince()
    },
    loadProvince:function(){
        var _this=this
        var provinces=location.getProvinces()
        var $Province=_this.$modalWrap.find('#receiverProvince')
        $Province.html(_this.getOptionHtml(provinces))
        if(_this.option.isUpdate && _this.option.data.receiverProvince){
             $Province.val(_this.option.data.receiverProvince)//编辑下回填
             _this.loadCity(_this.option.data.receiverProvince)
        }
    },
    loadCity:function(provinceName){
        var _this=this
        var cities=location.getCities(provinceName)
        var $city=_this.$modalWrap.find('#receiverCity')
        $city.html(_this.getOptionHtml(cities))
        if(_this.option.isUpdate && _this.option.data.receiverCity){
             $city.val(_this.option.data.receiverCity)//编辑下回填
        }
    },
    getOptionHtml:function(option){
        var html='<option value="请选择">请选择</option>'
        for (var i=0,length=option.length;i<length;i++){
            html+='<option value="'+option[i]+'">'+option[i]+'</option>'
        }
        return html
    },
    validateAddress:function(){
        var _this=this
        var receiverInfo={}
        var result={
            status:false,
            msg:''
        }
        //**address receiverAddress 接受不到引起的错误 名字要对应接口字段取**
        receiverInfo.receiverName    =$.trim(_this.$modalWrap.find('#name').val())
        receiverInfo.receiverProvince=$.trim(_this.$modalWrap.find('#receiverProvince').val())
        receiverInfo.receiverCity    =$.trim(_this.$modalWrap.find('#receiverCity').val())
        receiverInfo.receiverAddress =$.trim(_this.$modalWrap.find('#address').val())
        receiverInfo.receiverPhone   =$.trim(_this.$modalWrap.find('#phone').val())
        receiverInfo.receiverZip     =$.trim(_this.$modalWrap.find('#zip').val())
        if(_this.option.isUpdate){//回填状态下要有id字段
            receiverInfo.id=_this.$modalWrap.find('#addressId').val()
        }
        if(!receiverInfo.receiverName ){
            result.msg='收件人不能为空'
        }
        else if(!receiverInfo.receiverProvince ){
            result.msg='省份信息不能为空'
        }
        else if(!receiverInfo.receiverCity ){
            result.msg='城市信息不能为空'
        }
        else if(!receiverInfo.receiverAddress ){
            result.msg='收件人地址不能为空'
        }
        else if(!receiverInfo.receiverPhone ){
            result.msg='收件人手机号不能为空'
        }else{
            result.status=true
            result.data=receiverInfo
        }
        return result
    },
    bindEvent:function(){
        var _this=this
        // _this.$modalWrap 指定当前对象
        _this.$modalWrap.find('#receiverProvince').change(function(){
            if(_this.option.isUpdate===true){
                _this.option.data.receiverCity=false//一个value去覆盖对个value时会空白
            }
            var selectItem=$('#receiverProvince').val()
            _this.loadCity(selectItem)
        })
        _this.$modalWrap.find('.save-address').click(function(){
            var receiverInfo=_this.validateAddress()
            var isUpdate=_this.option.isUpdate
            if(!isUpdate&&receiverInfo.status){//非编辑状态 验证成功
                _address.addAddress(receiverInfo.data,function(res){
                    _mm.successTips('添加地址成功~~')
                    _this.option.onSuccess(res)
                    _this.hide()
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }else if(isUpdate&&receiverInfo.status){//编辑状态 验证成功
                _address.updateAddress(receiverInfo.data,function(res){
                    _mm.successTips('修改地址成功~~')
                    _this.option.onSuccess()
                    _this.hide()
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }
            else{//验证不成功
                _mm.errorTips(receiverInfo.msg) 
            }
            
        })
        _this.$modalWrap.find('#close').click(function(){
            _this.hide()
        })
        _this.$modalWrap.find('.modal').click(function(){
            _this.hide()
        })
        _this.$modalWrap.find('.modal-con').click(function(e){
            e.stopPropagation()
        })
    }
}
module.exports=modal