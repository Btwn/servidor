import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App.vue'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	// components: { App },
	render: h => h(App),
	template: '<App/>'
})
