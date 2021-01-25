import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/home/index',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/home/index',
      children: [{
        path: '/home/index',
        component: () => import('@/views/Main/main'),
        name: 'main',
        meta: {
          title: '首页',
          pageLevel: 1
        },
      }]
    }, 
  ]
})
