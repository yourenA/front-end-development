var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin') // html-webpack-plugin: 在页面中自动注入 js 和 css
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');//html-webpack-harddisk-plugin: 每次修改 pages/tpl 内文件时，会自动在 pages/html 内生成对应的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var map = require('./map')
var ROOT = path.resolve(__dirname)
var ENV = process.env.ENV
var CDN = process.env.CDN


//cross-env 能够不分系统地在全局注入变量

var entry = {
		'vendor': [
			'jquery'
		]
	},
	plugins = []

for (chunk in map) {
	entry[chunk] = map[chunk].src
	plugins.push(new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: ROOT + '/pages/html/' + map[chunk].tpl,
		template: ROOT + '/pages/tpl/' + map[chunk].tpl,
		chunks: ['vendor', chunk]
	}))
}

if(ENV == 'DEV') {
	plugins.push(new HtmlWebpackHarddiskPlugin())
}else {
	plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))	
}

module.exports = {
	devtool: ENV == 'DEV' ? 'cheap-eval-source-map' : 'source-map',
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: CDN ? CDN : '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname,'src'),
			'pages': path.resolve(__dirname,'pages')
		}
	},
	// 当在 js 中 require d3 时，实际上是指向 `window.d3`
	externals: {
		'd3': 'window.d3'
	},
	devServer: {
		proxy: {
			'/page4.html': {
				target: 'http://localhost:8000/page4.php'
			}
		}
	},
	module: {
		loaders: [
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.js$/,
				loader: "babel",
				exclude: /node_modules/
			},
			{
				test: /(\.html|\.php)$/,
      			loader: "raw-loader" //raw-loader: 可以 require html 文件，做到每修改一次 tpl 文件，浏览器自动刷新一次页面
			}
		]
	},
	plugins: plugins.concat([
		new webpack.DefinePlugin({  //DefinePlugin 将 process.env.ENV 这个环境变量注入 ENV 中。在 main.js 中就可以区分是开发环境还是生产环境了
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new ExtractTextPlugin('[name].css'),
		//对于 jquery 这种每个页面都会使用到的库来说，每次都要 import $ from 'jQuery' 显得很不优雅。可以这样配置。在页面中就可以直接使用 $ ，而不用引入
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	])
}