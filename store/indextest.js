import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		
		serverUrl: 'http://localhost:8029/', //服务器地址http://localhost:3000/
		systemInfo:null,
		authorizeState: true, //是否授权
		config:null,
		token:null,
		userInfo:null,
		showLoginTip: false,
	},
	mutations: {
		LOGIN_TIP(state, data) {
			state.showLoginTip = data
		},
	},
	actions: {
		
	}
})

export default store