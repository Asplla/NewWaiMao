import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        titleKey: 'meta.home.title'
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