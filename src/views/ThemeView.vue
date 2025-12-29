<template>
  <div class="theme-view">
    <!-- 上方全寬圖片（無留白） -->
    <div class="theme-hero">
      <img
        :src="themeImage"
        :alt="themeName"
        class="hero-image"
      />
      <div class="hero-overlay">
        <h1 class="hero-title">{{ themeName }}</h1>
        <span class="hero-count">{{ totalStores }}個店家</span>
      </div>
    </div>

    <!-- 下方內容區域 -->
    <div class="w-full flex justify-center px-4 py-6 md:px-10 md:py-8">
      <div class="max-w-7xl w-full">
        <h2 class="text-2xl font-bold text-black mb-6 md:text-xl md:mb-4">精選店家</h2>

        <!-- 使用 v-for 循環渲染卡片 -->
        <div class="stores-grid">
          <StoreCard
            v-for="store in paginatedStores"
            :key="store.id"
            :store="store"
            @coupon-click="handleCouponClick"
          />
        </div>

        <!-- 分頁組件 -->
        <SimplePaginationBar
          v-if="totalPages > 0"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import StoreCard from '@/components/common/StoreCard.vue'
import SimplePaginationBar from '@/components/common/SimplePagination.vue'

const route = useRoute()
const themeStore = useThemeStore()

// 分頁設定
const currentPage = ref(1)
const pageSize = ref(8) // 每頁顯示8張卡片（2行4列）

// 從路由參數獲取主題 id
const themeId = computed(() => route.params.id)

// 從 Pinia store 獲取主題數據
const themeData = computed(() => {
  return themeStore.getThemeById(themeId.value)
})

// 主題名稱
const themeName = computed(() => {
  return themeData.value?.name || '主題'
})

// 主題圖片
const themeImage = computed(() => {
  return themeData.value?.image || ''
})

// 店家列表
const stores = computed(() => {
  return themeData.value?.stores || []
})

// 總店家數
const totalStores = computed(() => {
  return stores.value.length
})

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(stores.value.length / pageSize.value)
})

// 計算當前頁顯示的卡片
const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return stores.value.slice(start, end)
})

// 處理分頁變化
const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleCouponClick = (store) => {
  console.log('點擊優惠券:', store.name, store.coupon)
}

// 監聽主題變化，重置分頁
watch(themeId, () => {
  currentPage.value = 1
  // 確保路由切換時滾動到頂部
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})

// 頁面加載時滾動到頂部
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style scoped>
.theme-view {
  width: 100%;
}

/* 上方全寬圖片（無留白） */
.theme-hero {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px 24px 24px 24px;
  color: white;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.hero-count {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 手機版：兩兩並排 */
@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>

