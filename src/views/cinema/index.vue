<template>
	<div id="main">
		<vh title='我的影院'></vh>
		<div id="content">
			<div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
			<div class="cinema_body">
				<Bscroll>
				<ul>
					<li v-for="item in cinemasData" :key="item.id">
						<div>
							<span>{{item.nm}}</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distance}}km</span>
						</div>
						<div class="card">
                			<div v-for="(num,key) in item.tag" :key='key' v-if="num=='1'">{{key | formaTag}}</div>
       					</div>
					</li>
				</ul>
				</Bscroll>
			</div>
		</div>
		<loading v-show="cinemasData.length==0"></loading>
		<tabar></tabar>
	</div>
</template>

<script>
	import vh from '@/components/header/index.vue'
	import tabar from '@/components/tabar/index.vue'
	
	export default{
		name:'cinema',
		data(){
			return{
				cinemasData:[]
			}
		},
		components:{
			vh,
			tabar
		},
		filters:{
			formaTag(key){
				var card=[{k:'allowRefund',v:'改签'},{k:'endorse',v:'退'},{k:'sell',v:'折扣卡'},{k:'snack',v:'小吃'}]
				for(var i=0;i<card.length;i++){
					if(card[i].k==key){
						return card[i].v;
					}
				}
			}
		},
		mounted(){
			this.axios.get('/api/cinemaList?cityId='+this.$store.state.city.cityId).then(res=>{
				if(res.status==200){
					this.cinemasData=res.data.data.cinemas;
				}
			})
		}
	}
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}

</style>