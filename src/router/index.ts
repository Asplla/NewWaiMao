import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import { getMetaConfig } from '@/utils/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        titleKey: 'meta.home.title'
      },
      beforeEnter: (to, from, next) => {
        const locale = i18n.global.locale.value;
        const metaConfig = getMetaConfig(locale);
        
        document.title = metaConfig.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', metaConfig.description);
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', metaConfig.keywords);
        
        next();
      }
    }
  ]
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const titleKey = to.meta.titleKey as string
  document.title = titleKey ? i18n.global.t(titleKey) : 'Tiotecno'
  
  next()
})

export default router 