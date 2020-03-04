const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const copyPlugin = require('../plugin/copyPlugin')

//配置plugins
const makePlugins = (configs) => {
	const plugins = [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname,'../dist')
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		//自定义插件
		new copyPlugin({
			id:'12',
			goodsName: 'T恤'
		})
	]
	//多页面打包 遍历入口文件 循环创建模板
	const arr = Object.keys(configs.entry)
	arr.forEach((val,index)=>{
		plugins.push(new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: `${val}/${val}.html`,
			chunks:['vendors',`${val}`]
		}) )
	})
	return plugins
}


//动态配置入口
const makeEntry = (configs) => {
	const entry = {}
	glob.sync('./src/**/*.js').forEach((val) => {
		const key  = val.split('/')[2].split('.')[0]
		entry[key] = val
	})
	return entry
}
const commonConfig = {
	//引入的文件如果是js/jsx文件 可以不写后缀 先找js 再找jsx 
	resolve:{
		extensions:['.js','.jsx'],
		//路劲别名
		alias:{
			component:path.resolve(__dirname,'../component')
		}
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif|eot)$/,
			use: {
				loader: 'file-loader'
			}
		},
		{   
			test: /\.jsx?$/,
			include: path.resolve(__dirname,'../src'),
			use:[{
				loader: "babel-loader" ,
				options :{
				  "presets": [
				  	["@babel/preset-env",{
			  	  		"targets": {
				    		"chrome": "67"
				  		},
				  		"useBuiltIns": 'usage',
				  		"corejs": "2"
				  	}],
				  	"@babel/preset-react"
				  ]
				}
			}]
		},
		{
			test: /\.vue$/,
			use: {
				loader: 'vue-loader'
			}
		},{
			//typescript的loader
			test: /\.tsx$/,
			use: {
				loader: 'ts-loader'
			},
			//不处理的内容
			exclude: /node_modules/
		}]
	},
	output:
	{
        path: path.resolve(__dirname,'../dist'),
        publicPath: '',   
        filename: 'js/[name].js'
    },
	//code splitting
	optimization:{
		//tree shaking
		usedExports: true,
		splitChunks: {	
			chunks: 'all',
			cacheGroups:{
				vendors: {
					test:  /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors'
				}
			}
		}
	},
	performance:false
}

commonConfig.entry = makeEntry()
commonConfig.plugins = makePlugins(commonConfig)


module.exports = (env) =>{
	if( env && env.production ){
		return merge(commonConfig,prodConfig)
	}else{
		return merge(commonConfig,devConfig)
	}
}
