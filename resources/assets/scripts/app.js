import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App.vue'
import store from '@/store/index.js'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

new Vue({
	// el: '#app',
	router,
	store,
	// components: { App },
	render: h => h(App),
	// template: '<App/>'
}).$mount('#app')
