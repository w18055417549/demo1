<template>
	<div id="main">
		<vh title='影片推荐'></vh>
		<div id="content">
			<div class="movie_menu">
				<router-link class="city_name" to="/movie/city" tag='div'> 
					<span>{{$store.state.city.citynm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link  class="hot_item" to="/movie/list/" tag='div'>正在热映</router-link>
					<router-link  class="hot_item" to="/movie/coming/" tag='div'>即将上映</router-link>
				</div>
				<router-link class="search_entry" to="/movie/search" tag='div'>
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
		  		<router-view></router-view>
		  	</keep-alive>
		</div>
		<tabar></tabar>
		<router-view name="detail"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import store from '@/store'
	import vh from '@/components/header/index.vue'
	import tabar from '@/components/tabar/index.vue'
	import detail from './detail.vue'
	import {mapState,mapGetters,mapActions} from 'vuex'
	import {msgbox} from '@/components/js/index.js'
	export default {
		name: 'movie',
		data(){
			return{

			}
		},
		components: {
			vh,
			tabar,
			detail
		},
		mounted(){
			var currentPos="";
			axios.get('/api/getLocation').then(res=>{
				currentPos=res.data.data;
			})
			var that=this;
			setTimeout(function(){
				if(parseInt(that.$store.state.city.cityId)==currentPos.id){
					return
				}
				msgbox({
				title:'定位',
				content:currentPos.nm,
				cancelT:'取消',
				confirmT:"确定切换",
				confirmFn(){
					console.log(this)
					that.$store.state.city.citynm=currentPos.nm
					that.$store.state.city.cityId=currentPos.id
					that.onload()
				}
			})
			},3000)
			
		}
	}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>