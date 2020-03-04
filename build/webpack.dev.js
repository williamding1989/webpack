const webpack = require('webpack')
const devConfig  = {
	mode:"development",
	devtool: 'cheap-module-eval-source-map',
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules:[
		{
			test: /\.scss$/,
			use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders:2,
					modules: true
				}
			},
			'sass-loader',
			'postcss-loader']
		},
		{
			test: /\.css$/,
			use: [
			'style-loader',
			'css-loader',
			'postcss-loader']
		}]
	},
	devServer: {
		contentBase: '/dist',
		open: true,
		historyApiFallback:true,
		proxy:{
			'/react/api': {
				target: 'http://www.dell-lee.com',
				pathRewrite:{
					'header.json': 'demo.json'
				},
				changeOrigin:false,
				secure: false
			}
		},
		port: 8091,
		hot: true
	},
	output: {
		filename : '[name].js',
		chunkFilename: '[name].js'
	}
}


module.exports  = devConfig
