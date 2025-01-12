const path = require("path");
const {VueLoaderPlugin} = require("vue-loader/dist/index")
const TerserWebpackPlugin = require("terser-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, "..", dir)
}



module.exports = {
    entry: path.resolve(__dirname, "../src/main.js"), // 入口文件，打包从这个文件开始
    output: {
        publicPath: './',
        path: path.resolve(__dirname, "../dist"), // 出口文件，打包生成的文件放置到这个文件夹下
        filename: "./js/[name].[chunkhash.6].js", //打包成的文件名。name取的原始文件名，chunkhash生成哈希值，这样每次打包出来不一样，避免浏览器缓存读取旧文件。
        assetModuleFilename: "assets/img/[name][ext]" // 自定义asset module资源打包后的路径和名字

    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"],
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // 放在最后面，最早执行
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', "sass-loader", "postcss-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
                type: 'asset', // asset 资源类型可以根据指定的图片大小来判断是否需要转化为 base64
                generator: {
                    filename: 'assets/img/[hash][ext][query]'// 局部指定输出位置，这里配置的文件输出路径优先级比第一步的配置高
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024 // 限制于 30kb
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash:8].[name][ext]"
                }
            }
        ]
    },

    // devServer: {
    //     hot: true, //模块的热替换
    //     open: true, // 编译结束后自动打开浏览器
    //     port: 8080, // 设置本地端口号
    //     host: "localhost" //设置本地url
    // },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin()
        ]
    },
    resolve: {
        // 快捷访问路径配置
        alias: {
            "@": resolve("src"),
            "@components": resolve("src/components"),
            "@assets": resolve("src/assets"),
            "@img": resolve("src/assets/img")
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: "./public/index.html", //用来做模板的html的文件路径(从项目根目录开始)
        //     filename: "index.html", //生成的html的名字
        //     title:'vue3+webpack5',//这个就对应上文的title
        //     inject: "body" //打包出来的那个js文件，放置在生成的body标签内
        // }),
        new VueLoaderPlugin()
    ],
    mode: "development"  //开发模式
};