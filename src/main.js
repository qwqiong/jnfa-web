// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/index.css'

// 引入echarts
import Echarts from 'echarts'

// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import "@/assets/Iconfont/iconfont.css";
import "@/assets/Iconfont/iconfont.js";

import ElementUI from 'element-ui'

import router from './router'

import Component from './components' // 自定义组件

Vue.config.productionTip = false;

Vue.prototype.$echarts = Echarts;
Vue.prototype.userInfo = {}
Vue.use(ElementUI);

Vue.use(Component) // 全局注册自定义组件

Vue.component(CollapseTransition.name, CollapseTransition);

// GetLoginUserInfo().then(res => {
//     if (res.status == 200) {
//         /**
//          *
//          *   roleCode: "c60853fb-deb8-46cc-8630-5be4d3094361",
//          *   roleId: 39, // 39:管理员   38:普通用户  37 评审员
//          *   roleIds: "38,39",
//          *   roleName: "项目管理员",
//          *   roleType: "SYSTEM",
//          *   systemCodes: "65ed1585-fe50-4227-95f6-14582199c072,c60853fb-deb8-46cc-8630-5be4d3094361",
//          *   systemId: 26,
//          *   systemNames: "普通用户,项目管理员",
//          *   systemRoleIds: "38,39",
//          *   userId: 57890
//          *
//          *
//          * */
//         Vue.prototype.userInfo = res.dataObject // 用户信息
//     }
// })
// .catch(err => {
//     console.log('err ----->>>', err)
// })

/* eslint-disable no-new */

Vue.prototype.userInfo = {
	userRole: "项目管理员",
	userName: "张三",
} // 用户信息

new Vue({
	el: '#app',
	router,
	components: {
		App,
	},
	template: '<App/>'
})
