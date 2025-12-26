<template>
  <!-- 品牌內容區域 -->
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <h2 class="text-4xl font-[300] text-black mb-2">{{ brandName }}</h2>
      <h3 class="text-base text-gray-500 mb-6">共 {{ totalStores }} 家特約店家</h3>

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
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBrandStore } from '@/stores/brand'
import StoreCard from '@/components/common/StoreCard.vue'
import SimplePaginationBar from '@/components/common/SimplePagination.vue'

const route = useRoute()
const brandStore = useBrandStore()

// 分頁設定
const currentPage = ref(1)
const pageSize = ref(12) // 每頁顯示12張卡片

// 從路由參數獲取品牌 id
const brandId = computed(() => route.params.id)

// 從 Pinia store 獲取品牌數據
const brandData = computed(() => {
  return brandStore.getBrandById(brandId.value)
})

// 品牌名稱
const brandName = computed(() => {
  return brandData.value?.name || '品牌'
})

// 店家列表
const stores = computed(() => {
  return brandData.value?.stores || []
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

// 監聽路由變化，重置分頁
watch(brandId, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>

