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
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }, 
        {
            path: '/overseaPackageTour',
            name: 'OverseaPackageTour',
            component: OverseaPackageTour
        },
        {
            path: '/interPackageTour',
            name: 'InterPackageTour',
            component: InterPackageTour
        },
        {
            path: '/aroundPackageTour',
            name: 'AroundPackageTour',
            component: AroundPackageTour
        },
        {
            path: '/mailSteamerTour',
            name: 'MailSteamerTour',
            component: MailSteamerTour
        },
        {
            path: '/military',
            name: 'MilitaryNews',
            component: MilitaryNews
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!jsCookie.get('auth')) {
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
