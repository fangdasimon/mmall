/*
* @Author: simon
* @Date:   2018-03-15 13:40:07
* @Last Modified by:   simon
* @Last Modified time: 2018-05-03 12:23:18
*/
var webpack= require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WEBPACK_ENV=process.env.WEBPACK_ENV||'dev'

var getTemplateHtml=function(name,title){
    return  {
            template:'./src/view/'+name+'.html',
            filename:'view/'+name+'.html',
            favicon :'./favicon.ico',
            title:title,
            inject:true,
            hash:true,
            chunks:['common',name]
        }
}
var config={
    entry:{
        'common'            :['./src/page/common/index.js'],
        'index'             :['./src/page/index/index.js'],
        'list'              :['./src/page/list/index.js'],
        'detail'            :['./src/page/detail/index.js'],
        'cart'              :['./src/page/cart/index.js'],
        'order-confirm'     :['./src/page/order-confirm/index.js'],
        'order-list'        :['./src/page/order-list/index.js'],
        'order-detail'      :['./src/page/order-detail/index.js'],
        'payment'           :['./src/page/payment/index.js'],
        'result'            :['./src/page/result/index.js'],
        'user-login'        :['./src/page/user-login/index.js'],
        'user-register'     :['./src/page/user-register/index.js'],
        'user-forget-pass'  :['./src/page/user-forget-pass/index.js'],
        'user-center'       :['./src/page/user-center/index.js'],
        'user-center-update':['./src/page/user-center-update/index.js'],
        'user-pass-reset'   :['./src/page/user-pass-reset/index.js'],
    },
    output: {
        path        :__dirname+"/dist/",//要加__dirname当前路径否则dist不生效
        publicPath  :'dev' === WEBPACK_ENV ? '/dist/' : '//s.damonstore.cn/mmall/dist/',
        filename    : "js/[name].js"
    },
    externals:{//配置全局的jQuery
        'jquery':'window.jQuery'
    },
    resolve:{
        alias:{
            image        :__dirname+'/src/image',
            page         :__dirname+'/src/page',
            service      :__dirname+'/src/service',
            util         :__dirname+'/src/util',
            node_modules :__dirname+'/node_modules'
        }
    },
    module: {
      loaders: [
          {
            test: /\.css$/,
            loader:ExtractTextPlugin.extract('style-loader', 'css-loader')
          },
          { // \??.* 表示是否有?如果有后面可以跟随多个任意字符
            test: /\.(gif|png|jpg|woff|eot|svg|ttf)\??.*$/,
            loader:'url-loader?limit=100&name=resource/[name].[ext]'
          },
          {
            test: /\.string$/,
            loader:'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
          }
      ]
    },
    plugins:[
         new webpack.optimize.CommonsChunkPlugin({
            name:'common',//common下的index文件放入base文件
            filename:'js/base.js'
         }),
        new ExtractTextPlugin("css/[name].css"),//对应入口文件的name
        new HtmlWebpackPlugin(getTemplateHtml('index','首页')),
        new HtmlWebpackPlugin(getTemplateHtml('list','商品列表页')),
        new HtmlWebpackPlugin(getTemplateHtml('detail','商品详情页')),
        new HtmlWebpackPlugin(getTemplateHtml('cart','购物车页面')),
        new HtmlWebpackPlugin(getTemplateHtml('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getTemplateHtml('order-list','订单列表页')),
        new HtmlWebpackPlugin(getTemplateHtml('order-detail','订单详情页')),
        new HtmlWebpackPlugin(getTemplateHtml('payment','订单支付页')),
        new HtmlWebpackPlugin(getTemplateHtml('result','操作结果')),
        new HtmlWebpackPlugin(getTemplateHtml('user-login','用户登录')),
        new HtmlWebpackPlugin(getTemplateHtml('user-register','用户注册')),
        new HtmlWebpackPlugin(getTemplateHtml('user-forget-pass','忘记密码')),
        new HtmlWebpackPlugin(getTemplateHtml('user-center','用户中心')),
        new HtmlWebpackPlugin(getTemplateHtml('user-center-update','修改用户中心')),
        new HtmlWebpackPlugin(getTemplateHtml('user-pass-reset','修改用户密码')),
        new HtmlWebpackPlugin(getTemplateHtml('about','关于MMALL')),
    ]
}

if('dev'==WEBPACK_ENV){//重启一个端口避免使用iframe模式
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports=config