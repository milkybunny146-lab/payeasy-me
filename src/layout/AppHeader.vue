<template>
  <div class="bg-white w-full">
    <!-- 頂部區域：Logo 和登入按鈕 -->
    <header class="flex justify-between items-center px-10 py-5 border-b border-gray-200 shadow-md">
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

    <!-- 導航欄 -->
    <nav class="w-full flex justify-center">
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

    <!-- 登入模態框 -->
    <LoginModal v-model:visible="showLoginModal" />

    <!-- 篩選面板 -->
    <FilterPanel v-model:visible="showFilterPanel" @filter="handleFilter" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoginModal from '@/components/common/LoginModal.vue'
import FilterPanel from '@/components/common/FilterPanel.vue'

const router = useRouter()
const route = useRoute()

const activeIndex = ref('health')
const showFilterPanel = ref(false)
const showLoginModal = ref(false)

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

  // 查找對應的導航項目
  const navItem = navItems.find(item => item.index === key)

  // 如果有路由路徑，則進行跳轉
  if (navItem && navItem.path) {
    router.push(navItem.path)
  } else {
    console.log('選中分類:', key)
  }
}

// 處理篩選
const handleFilter = (filterParams) => {
  console.log('篩選條件:', filterParams)
  showFilterPanel.value = false
}

// 根據當前路由設置活動狀態
watch(() => route.path, (newPath) => {
  // 處理動態路由 /cate/:id
  if (newPath.startsWith('/cate/')) {
    const categoryId = newPath.replace('/cate/', '')
    const currentNav = navItems.find(item => item.index === categoryId)
    if (currentNav) {
      activeIndex.value = currentNav.index
    }
  } else {
    // 處理舊路由或首頁
    const currentNav = navItems.find(item => item.path === newPath)
    if (currentNav) {
      activeIndex.value = currentNav.index
    } else if (newPath === '/') {
      activeIndex.value = 'health' // 首頁默認狀態
    }
  }
}, { immediate: true })
</script>
