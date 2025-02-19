import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import { getMetaConfig } from '@/utils/seo'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        titleKey: 'meta.home.title',
        requiresAuth: false
      }
    }
  ]
})

// 统一的导航守卫
router.beforeEach((to, from, next) => {
  const titleKey = to.meta.titleKey as string
  document.title = titleKey ? i18n.global.t(titleKey) : 'Tiotecno'
  next()
})

export default router 