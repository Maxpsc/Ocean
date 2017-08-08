const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: "source-map",
	entry: {
        app: path.join(__dirname, "./src/main.js"),
        vendors:['react','redux','react-redux']
    },
	output: {
		path: path.join(__dirname, "./dist"),
		publicPath: path.join(__dirname, "./dist"),
		filename: "[name].bundle.js"
	},
    //不需要构建到bundle的类库,需要在html手动引入
    // externals:{
    //
    // },
	module: {
		rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,//需要排除的目录
			use:[
				{
					loader:"babel-loader",
					options:{
						presets:["es2015", 'react', 'stage-1']
					}
				}
			]
		},
		{
			test: /\.css$/,
			use:[
				{
					loader:"style-loader"
				},
				{
					loader:"css-loader",
					options:{
						modules:true
					}
				}
			]
		},
		{
	      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
	      use:[
	      		{
	      			loader:"file-loader",
	      			query: {
						name: '/img/[name].[ext]'
					}
	      		}
	      ]
	    }]
	},
	resolve: {
		extensions: ['.js', '.jsx','.css','.scss'],
		alias: {
			src: path.resolve(__dirname, 'src/')
		}
	},
	plugins: [
		//   	new ExtractTextPlugin("bundle.css"),//分离css
        // //根据模板自动生成html
        // new HtmlWebpackPlugin({
        //     title: 'MicroBlog'
        // }),
        // //提取公共资源
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name:'vendor',
		// 	filename:'vendor.js',
		// 	minChunk: Infinity
		// }),
        new webpack.HotModuleReplacementPlugin()//热替换
  	],
    devServer: {
		contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/api":"http://localhost:3000"
        }
    }
};
