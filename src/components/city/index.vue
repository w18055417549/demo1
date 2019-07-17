<template>
	<div class="city_body">
		<div class="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
					<li v-for="item in cityData.hotlist" :key="item.id">{{item.nm}}</li>
				</ul>
			</div>
			<div class="city_sort" ref="city">
				<div v-for="item in cityData.data">
					<h2>{{item.index}}</h2>
					<ul v-for="v in item.list">
						<li :key="v.id">{{v.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cityData.data" :key="item.index" @click="tap(index)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'city',
		data() {
			return {
				cityData: {
					hotlist: [],
					data: []
				}
			}
		},
		mounted() {
			const _this = this;
			this.axios.get('/api/citylist').then((res) => {
				var data = res.data.data.cities;
				if(res.status == 200) {
						_this.formaData(data)
				}
			})
		},
		methods: {
			formaData(data) {
				var hotlist = [];
				var citylist = [];
				//需要的数据格式[{index:'A',[{name:'',id:''},{name:'',id:''}]}]
				for(var i = 0; i < data.length; i++) {
					if(data[i].isHot == 1) {
						hotlist.push(data[i]);
					}
					var firstLetter = data[i].py.substring(0, 1).toUpperCase();
					if(toAdd(firstLetter)){
						citylist.push({index:firstLetter,list:[{name:data[i].nm,id:data[i].id}]})
					}else{
						for(var j=0;j<citylist.length;j++){
							if(citylist[j].index==firstLetter){
								citylist[j].list.push({name:data[i].nm,id:data[i].id})
							}
						}
					}
				}
				function toAdd(firstLetter){
					for(var k = 0; k < citylist.length; k++) {
						if(citylist[k].index == firstLetter) {
							return false;
						}
					}
					return true;
				}
				citylist.sort(function(a,b){
					if(a.index<b.index){
						return -1
					}else{
						return 1
					}
				})
				this.$data.cityData.hotlist=hotlist;
				this.$data.cityData.data=citylist;
				console.log(this.$data.cityData.hotlist)
			},
			tap(index){
				var h2=this.$refs.city.getElementsByTagName('h2');
				this.$refs.city.parentNode.scrollTop=h2[index].offsetTop;
			}

		}

	}
</script>

<style scoped>
	#content .city_body {
		margin-top: 45px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	
	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}
	
	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}
	
	.city_body .city_hot {
		margin-top: 20px;
	}
	
	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}
	
	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}
	
	.city_body .city_sort div {
		margin-top: 20px;
	}
	
	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}
	
	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}
	
	.city_body .city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}
	
	.city_body .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border-left: 1px #e6e6e6 solid;
	}
</style>