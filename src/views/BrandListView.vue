<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <h2 class="text-4xl font-[300] text-black mb-8">全部品牌</h2>

      <!-- 品牌網格（6列4行） -->
      <div class="brands-grid">
        <router-link
          v-for="brand in paginatedBrands"
          :key="brand.id"
          :to="`/brand/${brand.id}`"
          class="brand-item"
        >
          <div class="brand-avatar-wrapper">
            <el-avatar :size="200" :src="brand.image" @error="errorHandler">
              <img :src="brand.image" :alt="brand.name" />
            </el-avatar>
          </div>
          <span class="brand-name">{{ brand.name }}</span>
        </router-link>
      </div>

      <!-- 分頁組件 -->
      <PaginationBar
        v-if="totalPages > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBrandStore } from '@/stores/brand'
import PaginationBar from '@/components/common/Pagination.vue'

const brandStore = useBrandStore()

// 分頁設定
const currentPage = ref(1)

const errorHandler = () => true

// 從 Pinia store 獲取所有品牌列表
const allBrands = computed(() => {
  return brandStore.getBrandList()
})

// 計算總頁數（第一頁24個，第二頁9個，總共33個品牌）
const totalPages = computed(() => {
  const total = allBrands.value.length
  if (total <= 24) return 1
  return 2 // 第一頁24個，第二頁剩餘的
})

// 計算當前頁顯示的品牌
const paginatedBrands = computed(() => {
  const page = currentPage.value
  if (page === 1) {
    // 第一頁：24個
    return allBrands.value.slice(0, 24)
  } else {
    // 第二頁：從第25個開始，只取9個
    return allBrands.value.slice(24, 33)
  }
})

// 處理分頁變化
const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.brands-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px 24px;
  margin-bottom: 40px;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.brand-avatar-wrapper {
  position: relative;
  margin-bottom: 12px;
  display: inline-block;
}

.brand-avatar-wrapper :deep(.el-avatar) {
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.brand-item:hover .brand-avatar-wrapper :deep(.el-avatar) {
  border-color: #f78a01;
}

.brand-name {
  font-size: 14px;
  color: #333;
  text-align: center;
  transition: color 0.3s ease;
}

.brand-item:hover .brand-name {
  color: #f78a01;
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .brands-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 992px) {
  .brands-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 16px;
  }
}

@media (max-width: 480px) {
  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

