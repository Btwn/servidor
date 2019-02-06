import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App.vue'
import store from '@/store/index.js'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	// components: { App },
	render: h => h(App),
	template: '<App/>'
})
