class copyPlugin {
	constructor(options){
		console.log(options)	
	}
	apply(compiler){
		compiler.hooks.emit.tapAsync('copyPlugin',(compilation,callback)=>{
			//文件添加
			compilation.assets['copy.txt'] = {
				source : function () {
					return  'hello dingding'
				},
				size : function () {
					return 20
				}
			}
			callback()
		})
	}
}

module.exports =  copyPlugin