/*home菜单组件*/
import menu from "./Menu";
/* 肺癌筛查中心*/
// 数据模型设置
import addModal from './dataModal/addModal'

// 所有自定义组件的插件 
export default {
    install: function (Vue) {
        Vue.component('add-modal', addModal)
        Vue.component('menu-custom', menu)
    }
}