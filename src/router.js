import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import OverseaPackageTour from './views/OverseaPackageTour.vue';
import InterPackageTour from './views/InterPackageTour.vue';
import AroundPackageTour from './views/AroundPackageTour.vue';
import MailSteamerTour from './views/MailSteamerTour.vue';
import MilitaryNews from './views/MilitaryNews.vue';
import NotFound from './views/NotFound.vue';
import PersonalCenter from './views/PersonalCenter.vue';

import jsCookie from 'js-cookie';
Vue.use(Router);
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
            path: '/perCenter',
            name: 'perCenter',
            component: PersonalCenter,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/overseaPackageTour',
            name: 'OverseaPackageTour',
            component: OverseaPackageTour,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/interPackageTour',
            name: 'InterPackageTour',
            component: InterPackageTour,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/aroundPackageTour',
            name: 'AroundPackageTour',
            component: AroundPackageTour,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mailSteamerTour',
            name: 'MailSteamerTour',
            component: MailSteamerTour,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/military',
            name: 'MilitaryNews',
            component: MilitaryNews,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!jsCookie.get('token')) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
