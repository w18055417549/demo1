<template>
	<div id="detailWarpper">
		<vh title="影片详情"><i class="iconfont icon-right" @click="back"></i></vh>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.albumImg" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>剧情,{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailMovie.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="item in detailMovie.photos">
						<div>
							<img :src="item|setwh('80*100')" alt="">
						</div>
						<!--<p>陈建斌</p>
						<p>马先勇</p>-->
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import vh from '@/components/header/index.vue';
	import Swiper from 'swiper';
	export default({
		data() {
			return {
				detailMovie: ''
			}
		},
		components: {
			vh
		},
		props: ['movieId'],
		mounted() {
			this.axios.get('/api/detailmovie?movieId=' + this.movieId).then(res => {
				if(res.data.msg == 'ok') {
					this.detailMovie = res.data.data.detailMovie;
					this.$nextTick(() => {
						new Swiper(this.$refs.detail_player, {
							slidesPerView: 'auto',
							freeMode: true,
							freeModeSticky: true
						});
					})
				}
			})
		},
		methods: {
			back() {
				this.$router.back()
			}
		}
	})
</script>

<style>
	#detailWarpper {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		min-height: 100%;
		width: 100%;
		background: #fff;
	}
	
	#content.contentDetail {
		display: block;
		margin-bottom: 0;
	}
	
	#content .detail_list {
		height: 200px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.detail_list .detail_list_bg {
		width: 100%;
		height: 100%;
		background: url(../../../static/images/movie_1.jpg) 0 40%;
		filter: blur(20px);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.detail_list .detail_list_filter {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #40454d;
		opacity: .55;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.detail_list .detail_list_content {
		display: flex;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}
	
	.detail_list .detail_list_img {
		width: 108px;
		height: 150px;
		border: solid 1px #f0f2f3;
		margin: 20px;
	}
	
	.detail_list .detail_list_img img {
		width: 100%;
		height: 100%;
	}
	
	.detail_list .detail_list_info {
		margin-top: 20px;
	}
	
	.detail_list .detail_list_info h2 {
		font-size: 20px;
		color: white;
		font-weight: normal;
		line-height: 40px;
	}
	
	.detail_list .detail_list_info p {
		color: white;
		line-height: 20px;
		font-size: 14px;
		color: #ccc;
	}
	
	#content .detail_intro {
		padding: 10px;
	}
	
	#content .detail_player {
		margin: 20px;
	}
	
	.detail_player .swiper-slide {
		width: 70px;
		margin-right: 20px;
		text-align: center;
		font-size: 14px;
	}
	
	.detail_player .swiper-slide img {
		width: 100%;
		margin-bottom: 5px;
		min-height: 100px;
		background: #f6f6f6;
	}
	
	.detail_player .swiper-slide p:nth-of-type(2) {
		color: #999;
	}
</style>