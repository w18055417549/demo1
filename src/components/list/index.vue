<template>
	<div class="movie_body" ref="movieBody">
		<Bscroll :handlescroll="handlescrollFn" :handleEnd="handleEndFn">
		<ul>
			<li v-show="pulldownmsg!=''" class="pull">{{pulldownmsg}}</li>
			<li v-for="item in data" :key='item.id' @tap="showDetail(item.id)">
				<div class="pic_show"><img :src="item.img|setwh('128.100')"></div>
				<div class="info_list">
					<h2>{{item.nm}}<span v-if="item.version!=''" class="version">3D</span></h2>
					<p>观众评 <span class="grade">{{item.sc}}</span></p>
					<p>主演: {{item.star}}</p>
					<p>{{item.showInfo}}</p>
				</div>
				<div class="btn_mall">
					购票
				</div>
			</li>
			<li v-show="pullupmsg!=''" class="pull">{{pullupmsg}}</li>
		</ul>
		</Bscroll>
		<loading v-show="data.length==0"></loading>
	</div>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				data: [],
				pulldownmsg:'',
				pullupmsg:'',
				prevId:'-1'
			}
		},
		activated() { //切换keep-alive调用
			var citynm=this.$store.state.city.citynm;
			var cityId=this.$store.state.city.cityId;
			if(this.prevId==cityId){return} //城市一样不用发请求 
			this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then(res => {
				var data = res.data.data.movieList;
				var temp = [];
				for(var i = 0; i < data.length; i++) {
					temp.push(data[i])
				}
				this.data=temp;
				this.prevId=cityId;
				window.localStorage.setItem('nowCity',citynm);
				window.localStorage.setItem('nowCityId',cityId);
			})
		},
		methods:{
			showDetail(id){
				this.$router.push('/movie/detail/'+id)
			},
			handleEndFn(pos,scroll) {
				if(pos.y > 30) {
					this.pulldownmsg = '更新完成';
					//模拟请求回调
					setTimeout(() => {
						this.pulldownmsg = ''
					}, 1000)
				}
				if(pos.y <= scroll.maxScrollY) {
					this.pullupmsg = '加载完成'
					//模拟请求回调
					setTimeout(() => {
						this.pullupmsg = ''
					}, 1000)
				}
			},
			handlescrollFn(pos,scroll) {
				if(pos.y > 30) {
					this.pulldownmsg = '正在更新中'
				}
				if(pos.y <= scroll.maxScrollY) {
					this.pullupmsg = '正在加载中'
				}
			}
		}
	}
</script>

<style scoped>
	.pull{justify-content: center;font-size: 12px;color: #677;}
	.version {
		color: #f00;
		margin-left: 8px;
	}
	
	#content .movie_body {
		flex: 1;
		overflow: auto;
	}
	
	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}
	
	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}
	
	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}
	
	.movie_body .pic_show img {
		width: 100%;
	}
	
	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}
	
	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}
	
	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}
	
	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}
	
	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
</style>