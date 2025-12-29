<template>
  <div class="bg-white w-full">
    <!-- ========== 桌面版 Header ========== -->
    <header class="hidden md:flex justify-between items-center px-10 py-5 border-b border-gray-200 shadow-md">
      <div class="flex items-center">
        <router-link to="/" class="cursor-pointer">
          <img
            src="/logo.jpg"
            alt="台積電 PayEasy 企業福利網"
            class="h-12 object-contain"
          />
        </router-link>
      </div>
      <div class="flex items-center">
        <button
          @click="showLoginModal = true"
          class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#f79d42] text-[#f79d42] bg-white hover:bg-[#fef3e6] transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>登入</span>
        </button>
      </div>
    </header>

    <!-- 桌面版導航欄 -->
    <nav class="hidden md:flex w-full justify-center">
      <div class="flex items-center justify-between h-16 w-full max-w-7xl px-10">
        <!-- 左側導航項目 -->
        <div class="flex items-center h-full -ml-4">
          <a
            v-for="item in navItems"
            :key="item.index"
            :href="`#${item.index}`"
            @click.prevent="handleNavClick(item.index)"
            class="px-4 h-full flex items-center text-sm text-gray-600 transition-colors cursor-pointer whitespace-nowrap shrink-0 first:pl-0"
          >
            <span
              :class="[
                'inline-block relative',
                activeIndex === item.index
                  ? 'text-orange-500'
                  : 'hover:text-orange-500'
              ]"
            >
              {{ item.label }}
              <span
                v-if="activeIndex === item.index"
                class="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-orange-500"
              ></span>
            </span>
          </a>
        </div>

        <!-- 右側全部分類篩選面板 -->
        <div class="relative ml-2 shrink-0 h-full flex items-center">
          <button
            @click="showFilterPanel = !showFilterPanel"
            class="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-500 transition-colors whitespace-nowrap"
          >
            全部分類
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform"
              :class="{ 'rotate-180': showFilterPanel }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- ========== 手機版 Header ========== -->
    <header class="md:hidden">
      <!-- 頂部：返回鍵 + Logo + 登入按鈕 -->
      <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <!-- 返回鍵（只在非首頁時顯示） -->
          <button
            v-if="route.path !== '/'"
            @click="handleBack"
            class="back-button"
            aria-label="返回"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <router-link to="/" class="cursor-pointer" :class="{ 'logo-with-back': route.path !== '/' }">
            <img
              src="/logo.jpg"
              alt="台積電 PayEasy 企業福利網"
              class="h-8 object-contain"
            />
          </router-link>
        </div>
        <button
          @click="showLoginModal = true"
          class="h-10 px-6 rounded-full border border-[#f79d42] text-[#f79d42] bg-white hover:bg-[#fef3e6] transition-colors cursor-pointer flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      <!-- 搜尋框 + 篩選按鈕 -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <!-- 搜尋框 -->
        <form @submit.prevent="handleMobileSearch" class="flex-1 relative">
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="請輸入品牌、店家名稱"
            class="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded-full text-sm outline-none border-2 border-transparent hover:border-[#fde8d8] focus:border-[#f79d42] transition-colors"
          />
        </form>

        <!-- 篩選按鈕（橫向 sliders） -->
        <button
          @click="showFilterPanel = true"
          class="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
            <line x1="8" y1="3" x2="8" y2="9"></line>
            <line x1="16" y1="9" x2="16" y2="15"></line>
            <line x1="12" y1="15" x2="12" y2="21"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- 登入模態框 -->
    <LoginModal v-model:visible="showLoginModal" />

    <!-- 篩選面板（桌面版+手機版都在這裡） -->
    <FilterPanel v-model:visible="showFilterPanel" @filter="handleFilter" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBrandStore } from '@/stores/brand'
import { useStoreStore } from '@/stores/store'
import LoginModal from '@/components/common/LoginModal.vue'
import FilterPanel from '@/components/common/FilterPanel.vue'

const router = useRouter()
const route = useRoute()
const brandStore = useBrandStore()
const storeStore = useStoreStore()

const activeIndex = ref('health')
const showFilterPanel = ref(false)
const showLoginModal = ref(false)
const searchKeyword = ref('')

const navItems = [
  { index: 'restaurant', label: '美味餐廳', path: '/cate/restaurant' },
  { index: 'groceries', label: '生活雜貨', path: '/cate/groceries' },
  { index: 'hotel', label: '飯店旅館', path: '/cate/hotel' },
  { index: 'fitness', label: '運動健身', path: '/cate/fitness' },
  { index: 'beauty', label: '美容保養', path: '/cate/beauty' },
  { index: 'coffee', label: '咖啡飲品', path: '/cate/coffee' },
  { index: 'appliances', label: '家電', path: '/cate/appliances' },
  { index: 'health', label: '保健醫療', path: '/cate/health' },
  { index: 'furniture', label: '傢俱收納', path: '/cate/furniture' },
  { index: 'mobile', label: '手機相機', path: '/cate/mobile' },
  { index: 'paper', label: '日用紙品', path: '/cate/paper' },
  { index: 'tech', label: '3C周邊', path: '/cate/tech' },
  { index: 'pet', label: '寵物用品', path: '/cate/pet' },
  { index: 'garden', label: '園藝', path: '/cate/garden' }
]

const handleNavClick = (key) => {
  activeIndex.value = key
  showFilterPanel.value = false

  const navItem = navItems.find(item => item.index === key)
  if (navItem && navItem.path) {
    router.push(navItem.path)
  }
}

// 處理篩選
const handleFilter = (filterParams) => {
  console.log('篩選條件:', filterParams)
  showFilterPanel.value = false
}

// 處理返回按鈕點擊
const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

// 標籤名稱到品牌 ID 的映射（與 SearchInput.vue 保持一致）
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

// 處理手機版搜尋
const handleMobileSearch = (e) => {
  if (e) {
    e.preventDefault()
  }
  const keyword = searchKeyword.value.trim()
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

// 根據當前路由設置活動狀態
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/cate/')) {
    const categoryId = newPath.replace('/cate/', '')
    const currentNav = navItems.find(item => item.index === categoryId)
    if (currentNav) {
      activeIndex.value = currentNav.index
    }
  } else {
    const currentNav = navItems.find(item => item.path === newPath)
    if (currentNav) {
      activeIndex.value = currentNav.index
    } else if (newPath === '/') {
      activeIndex.value = 'health'
    }
  }
}, { immediate: true })
</script>

<style scoped>
/* 手機版返回鍵 */
.back-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #191919;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  flex-shrink: 0;
}

.back-button:hover {
  color: #191919;
  opacity: 0.7;
  transform: translateX(-2px);
}

.back-button:active {
  transform: translateX(0);
}

/* Logo 有返回鍵時的樣式（往右移動） */
.logo-with-back {
  margin-left: 0;
  transition: margin-left 0.3s ease;
}
</style>
