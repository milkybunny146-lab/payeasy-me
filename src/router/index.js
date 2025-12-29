import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/AppHome.vue'
import CateView from '../views/CateView.vue'
import BrandView from '../views/BrandView.vue'
import BrandListView from '../views/BrandListView.vue'
import TicketDetailView from '../views/TicketDetailView.vue'
import ThemeView from '../views/ThemeView.vue'
import StoreDetailView from '../views/StoreDetailView.vue'
import PromotionDetailView from '../views/PromotionDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如瀏覽器後退），則恢復該位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果從主題頁返回首頁，保留滾動位置
    if (from.name === 'theme' && to.name === 'home') {
      return false
    }
    // 否則滾動到頂部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
    },
    {
      path: '/cate/:id',
      name: 'cate',
      component: CateView,
      props: true,
    },
    {
      path: '/brands',
      name: 'brand-list',
      component: BrandListView,
    },
    {
      path: '/brand/:id',
      name: 'brand',
      component: BrandView,
      props: true,
    },
    {
      path: '/ticket/:id',
      name: 'ticket-detail',
      component: TicketDetailView,
      props: true,
    },
    {
      path: '/theme/:id',
      name: 'theme',
      component: ThemeView,
      props: true,
    },
    {
      path: '/store/:id',
      name: 'store-detail',
      component: StoreDetailView,
      props: true,
    },
    {
      path: '/store/:storeId/promotion/:promotionId',
      name: 'promotion-detail',
      component: PromotionDetailView,
      props: true,
    },
    {
      path: '/store/:storeId/ticket/:ticketId',
      name: 'store-ticket-detail',
      component: () => import('@/views/StoreTicketDetailView.vue'),
      props: true,
    },
    // 保留舊路由作為重定向（向後兼容）
    {
      path: '/restaurant',
      redirect: '/cate/restaurant',
    },
    {
      path: '/life-gorcery',
      redirect: '/cate/groceries',
    },
    {
      path: '/hotel',
      redirect: '/cate/hotel',
    },
    {
      path: '/fitness',
      redirect: '/cate/fitness',
    },
    {
      path: '/beauty',
      redirect: '/cate/beauty',
    },
    {
      path: '/coffee',
      redirect: '/cate/coffee',
    },
    {
      path: '/appliances',
      redirect: '/cate/appliances',
    },
    {
      path: '/mobile',
      redirect: '/cate/mobile',
    },
    {
      path: '/health',
      redirect: '/cate/health',
    },
    {
      path: '/furniture',
      redirect: '/cate/furniture',
    },
    {
      path: '/paper',
      redirect: '/cate/paper',
    },
    {
      path: '/tech',
      redirect: '/cate/tech',
    },
    {
      path: '/pet',
      redirect: '/cate/pet',
    },
    {
      path: '/garden',
      redirect: '/cate/garden',
    },
  ],
})

export default router
