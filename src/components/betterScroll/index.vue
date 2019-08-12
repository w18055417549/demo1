<template>
	<div class="scrollBox" ref='scrollBox'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'betterScroll',
		props:{
			handlescroll:{
				type:Function,
				default:function(){}
			},
			handleEnd:{
				type:Function,
				default:function(){}
			}
		},
		mounted() {
			var scroll = new BScroll(this.$refs.scrollBox, {
				tap: true,
				probeType: 1
			})
			this.scroll=scroll;
			scroll.on('scroll', (pos) => {
				//上拉刷新
				this.handlescroll(pos,scroll)
			})
			scroll.on('touchEnd', (pos) => {
				//下拉加载
				this.handleEnd(pos,scroll)
			})
		},
		methods:{
			toscrollTop(y){
				this.scroll.scrollTo(0,y)
			}
		}
	}
</script>

<style>
	.scrollBox {
		height: 100%;
	}
</style>