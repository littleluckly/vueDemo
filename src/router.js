import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'

import jsCookie from 'js-cookie'
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!jsCookie.get('auth')) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
            })
        } else {
            next() // 确保一定要调用 next()
          }
    } else {
      next() // 确保一定要调用 next()
    }
})
export default router
