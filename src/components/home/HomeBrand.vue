<template>
  <div class="w-full flex justify-center px-4 md:px-10 py-6 md:py-8">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-xl md:text-2xl font-[350] text-black">精選品牌</h2>
        <router-link to="/brands" class="text-sm md:text-base text-orange-500 hover:text-orange-600 transition-colors">
          看全部 >
        </router-link>
      </div>

      <!-- 品牌列表 - 桌面版 -->
      <div class="hidden md:grid grid-cols-10 gap-4 pb-4">
        <router-link
          v-for="brand in brandList"
          :key="brand.id"
          :to="`/brand/${brand.id}`"
          class="flex flex-col items-center cursor-pointer group"
        >
          <el-avatar :size="80" :src="brand.image" @error="errorHandler" class="mb-2">
            <img :src="brand.image" :alt="brand.name" />
          </el-avatar>
          <span class="text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
            {{ brand.name }}
          </span>
        </router-link>
      </div>

      <!-- 品牌列表 - 手機版（兩排，上五下五） -->
      <div class="md:hidden grid grid-cols-5 gap-x-4 gap-y-4 pb-4">
        <router-link
          v-for="brand in brandList"
          :key="brand.id"
          :to="`/brand/${brand.id}`"
          class="flex flex-col items-center cursor-pointer group"
        >
          <el-avatar :size="56" :src="brand.image" @error="errorHandler" class="mb-2">
            <img :src="brand.image" :alt="brand.name" />
          </el-avatar>
          <span class="text-xs text-gray-700 group-hover:text-orange-500 transition-colors whitespace-nowrap text-center">
            {{ brand.name }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBrandStore } from '@/stores/brand'

const brandStore = useBrandStore()

const errorHandler = () => true

// 從 Pinia store 獲取品牌列表（只取前10個）
const brandList = computed(() => {
  return brandStore.getBrandList().slice(0, 10)
})
</script>

<style scoped>
.brands-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.brand-item:hover {
  transform: translateY(-4px);
}

.brand-avatar-wrapper {
  margin-bottom: 12px;
}

.brand-name {
  font-size: 16px;
  font-weight: 400;
  color: #333;
  text-align: center;
}
</style>
