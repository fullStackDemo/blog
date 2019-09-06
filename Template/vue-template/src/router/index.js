import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Prefix_title = '内网平台';

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../pages/Crop'),
            meta: {
                title: '在线预览EXCEL'
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            document.querySelector('.box').scrollTop = 0;
        }
    }
});

//路由控制
router.beforeEach((to, from, next) => {
    const { title } = to.meta;
    if (title) {
        document.title = title;
    }
    // console.log(to);

    // 每个单页增加统计代码
    if (window._hmt) {
        if (to.path) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }
    next();
});

export default router;
