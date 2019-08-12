export default{
	path:'/movie',
	component:()=>import('@/views/movie/index.vue'),
	children:[
		{
			path : 'city',
            component : () => import('@/components/city')
		},
		{
			path:'search',
			component:()=>import('@/components/search')
		},
		{
			path:'list',
			component:()=>import('@/components/list')
		},
		{
			path:'coming',
			component:()=>import('@/components/coming')
		},
		{
			path:'detail/:movieId',
			components:{
				detail:()=>import('@/views/movie/detail')
			},
			props:{
				detail:true
			}
		},
		{
			path:'/movie',
			redirect:'/movie/list'
		}
	]
}
