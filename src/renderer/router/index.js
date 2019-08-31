/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 15:42:24
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-26 14:38:02
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/setting').default,
    },
    {
      path: '/tiping',
      name: 'tiping',
      component: require('@/components/tiping').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/about').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
