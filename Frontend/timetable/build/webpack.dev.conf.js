const { merge } = require("webpack-merge")
const BaseWebpackConf = require("./webpack.base.conf")
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(BaseWebpackConf, {
    mode: "development", // 开发模式
    devServer: {
        hot: true, // 模块热加载
        open: true, // 编译结束后，自动打开浏览器
        port: 8081, // 设置本地端口
        host: "localhost" // 设置本地url
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", //用来做模板的html的文件路径(从项目根目录开始)
            filename: "index.html", //生成的html的名字
            title: 'vue3+webpack5',//这个就对应上文的title
            inject: "body" //打包出来的那个js文件，放置在生成的body标签内
        })
    ]
})