const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
	mode:"production",
//	devtool: 'cheap-module-source-map',
	plugins:[
		new MiniCssExtractPlugin({
	      filename: '[name].css'
	    })
	],
	optimization: {
	    minimizer: [new OptimizeCSSAssetsPlugin({})],
	 },
    module: {
		rules:[
		{
			test: /\.scss$/,
			use: [
			MiniCssExtractPlugin.loader,
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
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader']
		}]
	},
	output: {
		filename : '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports  = prodConfig