import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import About from '@/components/About.vue'
import VueMaterial from 'vue-material'

Vue.use(Router)
Vue.use(VueMaterial)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/about',
			name: 'About',
			component: About
		}
	]
})
