//共同写js组件的地方，页面搭建各自写
import Vue from 'vue'
import msg from './msgbox'
export var msgbox=(function(){
	var defaults={  //默认值
		title:'',
		content:'',
		cancelT:'',
		confirmT:'',
		confirmFn:null,
		cancelFn:null
	}
	var myComponents=Vue.extend(msg) //相当于构造函数
	return function(opts){
		console.log(opts)
		for(var attr in opts){
			defaults[attr]=opts[attr]
		}//覆盖传来的值
		
		var vm=new myComponents({
			el:document.createElement('div'),
			data:{
				title:defaults.title,
				content:defaults.content,
				cancelT:defaults.cancelT,
				confirmT:defaults.confirmT,
			},
			methods:{
				confirmFn(){
					defaults.confirmFn&&defaults.confirmFn.call(this)
					document.body.removeChild(vm.$el)
				},
				cancelFn(){
					defaults.cancelFn&&defaults.cancelFn.call(this)
					document.body.removeChild(vm.$el)
				}
			}
		})
		document.body.appendChild(vm.$el)
	}
})()
