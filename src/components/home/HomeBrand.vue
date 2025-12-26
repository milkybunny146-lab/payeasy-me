<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-black">精選品牌</h2>
        <router-link to="/brands" class="text-orange-500 hover:text-orange-600 transition-colors">
          看全部 >
        </router-link>
      </div>

      <!-- 品牌列表 -->
      <div class="grid grid-cols-10 gap-4 pb-4">
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
</style>
