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
			path:'/movie',
			redirect:'/movie/list'
		}
	]
}
