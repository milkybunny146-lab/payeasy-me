<template>
  <div>
    <!-- 桌面版搜尋區域 -->
    <div class="hidden md:flex justify-center items-center pt-8 pb-3 px-10">
      <form @submit.prevent="handleSearch" class="relative w-[600px]">
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="請輸入品牌、店家"
          class="search-input w-full pl-9 pr-10 py-3 border border-gray-300 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          class="absolute right-1 top-1/2 transform -translate-y-1/2 px-5 py-2 bg-orange-500 hover:bg-[#e66a00] text-white rounded-[50px] transition-colors font-medium text-sm shadow-md hover:shadow-lg z-10 cursor-pointer"
        >
          搜尋
        </button>
      </form>
    </div>

    <!-- 桌面版熱門搜尋 -->
    <div class="hidden md:flex justify-center items-center px-10 pb-5 -mt-1 border-b border-gray-200">
      <div class="w-[600px] flex items-center gap-3">
        <span class="text-sm text-gray-500 whitespace-nowrap">大家都在搜:</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in popularTags"
            :key="tag"
            type="button"
            @click="handleTagClick(tag)"
            class="px-2 py-1 rounded-full text-sm bg-[#fef3e6] border border-[#f79d42] text-[#f79d42] hover:border-orange-500 cursor-pointer"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrandStore } from '@/stores/brand'
import { useStoreStore } from '@/stores/store'

const router = useRouter()
const brandStore = useBrandStore()
const storeStore = useStoreStore()

const searchQuery = ref('')

const popularTags = [
  '星巴克',
  'IKEA',
  '全聯',
  '家樂福',
  '誠品書店',
  '康是美',
  '屈臣氏',
  '寶雅'
]

// 標籤名稱到品牌 ID 的映射
const tagToBrandIdMap = {
  '星巴克': 'starbucks',
  'IKEA': 'ikea',
  '全聯': 'pxmart',
  '家樂福': 'carrefour',
  '誠品書店': 'eslite',
  '康是美': 'cosmed',
  '屈臣氏': 'watson',
  '寶雅': 'poya'
}

const handleTagClick = (tag) => {
  // 根據標籤名稱找到對應的品牌 ID
  const brandId = tagToBrandIdMap[tag]

  if (brandId) {
    // 直接跳轉到品牌頁面
    router.push(`/brand/${brandId}`)
  } else {
    // 如果找不到對應的品牌，則填入搜尋框
    searchQuery.value = tag
    console.log('未找到對應品牌:', tag)
  }
}

const handleSearch = (e) => {
  if (e) {
    e.preventDefault()
  }
  const keyword = searchQuery.value.trim()
  if (!keyword) {
    return
  }

  // 先檢查是否匹配熱門標籤
  const brandId = tagToBrandIdMap[keyword]
  if (brandId) {
    router.push(`/brand/${brandId}`)
    return
  }

  // 搜尋品牌名稱
  const brandList = brandStore.getBrandList()
  const matchedBrand = brandList.find(brand =>
    brand.name.toLowerCase().includes(keyword.toLowerCase())
  )

  if (matchedBrand) {
    // 找到匹配的品牌，跳轉到品牌頁面
    router.push(`/brand/${matchedBrand.id}`)
    return
  }

  // 搜尋店家（store.js 中的店家）
  const storeResults = storeStore.searchStores(keyword)
  if (storeResults.length > 0) {
    // 找到匹配的店家，跳轉到第一個店家的詳情頁
    const firstStore = storeResults[0]
    router.push(`/store/${firstStore.storeId}`)
    return
  }

  // 搜尋不到結果
  console.log('未找到匹配的品牌或店家:', keyword)
}
</script>

<style scoped>
/* 桌面版搜尋輸入框樣式 */
.search-input {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.search-input:hover {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1),
              0 0 0 4px rgba(249, 115, 22, 0.05),
              0 2px 4px rgba(249, 115, 22, 0.15);
  border-color: #f97316;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1),
              0 0 0 4px rgba(249, 115, 22, 0.05),
              0 2px 4px rgba(249, 115, 22, 0.15);
}
</style>
