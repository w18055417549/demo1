import Vue from 'vue';
import Vuex from 'vuex'
import App from '../App'
import axios from 'axios'
Vue.use(Vuex)

const state={
	city:{
		citynm:window.localStorage.getItem('nowCity')||'北京',
		cityId:window.localStorage.getItem('nowCityId')||'1'
	}
}
const getters={
	city(){
		return this.state.city
	}
}

const actions={
	getGetLocation(context){
		axios.get('/api/getLocation').then(res=>{
			if(res.status==200){
				context.commit('getGetLocation',res.data.data)
			}
		})
	}
}

const mutations={
	getGetLocation(state,res){
		console.log(res)
		state.city.citynm=res.nm;
		state.city.cityId=res.id
	}
}

var store=new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
export default store
