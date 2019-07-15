import Vue from 'vue'
import Router from 'vue-router'
import movieRoute from './movie'
import mineRoute from './mine'
import cinemaRoute from './cinema'


Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
  	movieRoute,mineRoute,cinemaRoute,
  	{
  		path:'/*',
  		redirect:'/movie'
  	}
  ]
})
