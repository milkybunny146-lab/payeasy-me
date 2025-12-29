<template>
  <Teleport to="body">
    <!-- ========== 桌面版篩選面板 ========== -->
    <Transition name="filter-panel">
      <div v-if="visible" class="filter-overlay hidden md:block" @click.self="handleClose">
        <div class="filter-panel" @click.stop>
          <!-- 特店分類 -->
          <div class="filter-section">
            <h3 class="section-title">特店分類</h3>
            <div class="filter-options filter-options-grid">
              <button
                v-for="category in categories"
                :key="category.id"
                :class="['filter-button', { 'filter-button-active': selectedCategory === category.id }]"
                @click="selectedCategory = category.id"
              >
                {{ category.label }}
              </button>
            </div>
          </div>

          <!-- 細部分類 -->
          <div class="filter-section">
            <h3 class="section-title">細部分類</h3>
            <div class="filter-options filter-options-grid">
              <button
                v-for="subCategory in subCategories"
                :key="subCategory.value"
                :class="['filter-button', { 'filter-button-active': selectedSubCategory === subCategory.value }]"
                @click="selectedSubCategory = selectedSubCategory === subCategory.value ? '' : subCategory.value"
              >
                {{ subCategory.label }}
              </button>
            </div>
          </div>

          <!-- 縣市區域 -->
          <div class="filter-section">
            <h3 class="section-title">縣市區域</h3>
            <div class="filter-row">
              <div class="dropdown-wrapper">
                <select v-model="selectedCity" class="dropdown-select">
                  <option value="all">所有縣市</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
              <div class="dropdown-wrapper">
                <select v-model="selectedArea" class="dropdown-select">
                  <option value="all">所有區域</option>
                  <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 服務 -->
          <div class="filter-section">
            <h3 class="section-title">服務</h3>
            <div class="filter-options filter-options-grid">
              <button
                v-for="service in services"
                :key="service.id"
                :class="['filter-button', { 'filter-button-active': selectedServices.includes(service.id) }]"
                @click="toggleService(service.id)"
              >
                {{ service.label }}
              </button>
            </div>
          </div>

          <!-- 評分 -->
          <div class="filter-section">
            <h3 class="section-title">評分</h3>
            <div class="filter-options filter-options-grid">
              <button
                v-for="rating in ratings"
                :key="rating.value"
                :class="['filter-button', { 'filter-button-active': selectedRating === rating.value }]"
                @click="selectedRating = selectedRating === rating.value ? '' : rating.value"
              >
                {{ rating.label }}
              </button>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="filter-actions">
            <button class="action-button clear-button" @click="handleClear">
              清除篩選
            </button>
            <button class="action-button confirm-button" @click="handleConfirm">
              確定
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== 手機版篩選面板 ========== -->
    <!-- 遮罩 -->
    <Transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 bg-black/50 z-50 md:hidden"
        @click="handleClose"
      />
    </Transition>

    <!-- 篩選面板 -->
    <Transition name="slide-up">
      <div
        v-if="visible"
        class="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-2xl z-50 md:hidden flex flex-col"
        @click.stop
      >
        <!-- 標題列 -->
        <div class="flex justify-between items-center px-4 py-4 border-b border-gray-100 shrink-0">
          <h3 class="text-lg font-bold text-gray-900">分類篩選</h3>
          <button
            @click="handleClose"
            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 篩選內容（可滾動區域） -->
        <div class="flex-1 overflow-y-auto px-4 py-4">
          <!-- 特店分類 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-orange-500 mb-3">特店分類</h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  'py-2.5 px-3 rounded-lg text-sm transition-colors text-center',
                  selectedCategory === category.id
                    ? 'bg-[#fff5eb] text-orange-500 border border-orange-300'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ category.label }}
              </button>
            </div>
          </div>

          <!-- 細部分類 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-orange-500 mb-3">細部分類</h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="subCat in subCategories"
                :key="subCat.value"
                @click="selectedSubCategory = selectedSubCategory === subCat.value ? '' : subCat.value"
                :class="[
                  'py-2.5 px-3 rounded-lg text-sm transition-colors text-center',
                  selectedSubCategory === subCat.value
                    ? 'bg-[#fff5eb] text-orange-500 border border-orange-300'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ subCat.label }}
              </button>
            </div>
          </div>

          <!-- 縣市區域 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-orange-500 mb-3">縣市區域</h4>
            <div class="grid grid-cols-2 gap-3">
              <select
                v-model="selectedCity"
                class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-orange-300"
              >
                <option value="all">所有縣市</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
              <select
                v-model="selectedArea"
                class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-orange-300"
              >
                <option value="all">所有區域</option>
                <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
              </select>
            </div>
          </div>

          <!-- 服務 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-orange-500 mb-3">服務</h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="service in services"
                :key="service.id"
                @click="toggleService(service.id)"
                :class="[
                  'py-2.5 px-3 rounded-lg text-sm transition-colors text-center',
                  selectedServices.includes(service.id)
                    ? 'bg-[#fff5eb] text-orange-500 border border-orange-300'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ service.label }}
              </button>
            </div>
          </div>

          <!-- 評分 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-orange-500 mb-3">評分</h4>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="rating in ratings"
                :key="rating.value"
                @click="selectedRating = selectedRating === rating.value ? '' : rating.value"
                :class="[
                  'py-2.5 px-3 rounded-lg text-sm transition-colors text-center',
                  selectedRating === rating.value
                    ? 'bg-[#fff5eb] text-orange-500 border border-orange-300'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ rating.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 底部按鈕 -->
        <div class="flex gap-3 px-4 py-4 border-t border-gray-100 shrink-0">
          <button
            @click="handleClear"
            class="flex-1 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            清除篩選
          </button>
          <button
            @click="handleConfirm"
            class="flex-1 py-3 bg-orange-500 rounded-lg text-sm text-white hover:bg-orange-600 transition-colors"
          >
            確定
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'FilterPanel'
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'close', 'filter'])

const router = useRouter()

// 特店分類
const categories = [
  { id: 'all', label: '全部分類' },
  { id: 'restaurant', label: '美食' },
  { id: 'shopping', label: '購物' },
  { id: 'hotel', label: '住宿' },
  { id: 'entertainment', label: '娛樂' },
  { id: 'transportation', label: '交通' },
  { id: 'education', label: '教育' },
  { id: 'beauty', label: '美容美髮' }
]

// 細部分類映射
const subCategoryMap = {
  all: [
    { value: 'all', label: '全部選項' }
  ],
  restaurant: [
    { value: 'all-restaurant', label: '全部美食' },
    { value: 'delicious-restaurant', label: '美味餐廳' },
    { value: 'popular-snacks', label: '人氣小吃' },
    { value: 'afternoon-tea', label: '下午茶' },
    { value: 'bistro', label: '餐酒館' },
    { value: 'famous-drinks', label: '知名飲品' },
    { value: 'bread-baking', label: '麵包烘焙' },
    { value: 'cafe', label: '咖啡廳' },
    { value: 'other-foods', label: '其他食品' }
  ],
  shopping: [
    { value: 'all-shopping', label: '全部購物' },
    { value: 'department-store', label: '百貨公司' },
    { value: 'supermarket', label: '超市' },
    { value: 'convenience-store', label: '便利商店' },
    { value: 'electronics', label: '3C電子' },
    { value: 'clothing', label: '服飾配件' },
    { value: 'home-furnishing', label: '居家用品' },
    { value: 'books', label: '書店文具' }
  ],
  hotel: [
    { value: 'all-hotel', label: '全部住宿' },
    { value: 'luxury-hotel', label: '五星飯店' },
    { value: 'business-hotel', label: '商務旅館' },
    { value: 'boutique-hotel', label: '精品旅館' },
    { value: 'resort', label: '渡假村' },
    { value: 'hostel', label: '青年旅舍' }
  ],
  entertainment: [
    { value: 'all-entertainment', label: '全部娛樂' },
    { value: 'cinema', label: '電影院' },
    { value: 'ktv', label: 'KTV' },
    { value: 'amusement-park', label: '遊樂園' },
    { value: 'sports-center', label: '運動中心' },
    { value: 'spa', label: 'SPA會館' }
  ],
  transportation: [
    { value: 'all-transportation', label: '全部交通' },
    { value: 'gas-station', label: '加油站' },
    { value: 'parking', label: '停車場' },
    { value: 'car-rental', label: '租車服務' },
    { value: 'taxi', label: '計程車' }
  ],
  education: [
    { value: 'all-education', label: '全部教育' },
    { value: 'language-school', label: '語言補習' },
    { value: 'music-school', label: '音樂才藝' },
    { value: 'cram-school', label: '升學補習' },
    { value: 'online-course', label: '線上課程' }
  ],
  beauty: [
    { value: 'all-beauty', label: '全部美容美髮' },
    { value: 'hair-salon', label: '美髮沙龍' },
    { value: 'beauty-salon', label: '美容SPA' },
    { value: 'nail-salon', label: '美甲美睫' },
    { value: 'massage', label: '按摩舒壓' }
  ]
}

// 縣市選項
const cities = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市']

// 區域選項（根據選中的縣市動態顯示）
const areas = computed(() => {
  return ['全部區域', '信義區', '大安區', '中正區', '中山區']
})

// 服務選項
const services = [
  { id: 'credit-card', label: '可刷卡' },
  { id: 'pet-friendly', label: '寵物友善' },
  { id: 'taishin-pay', label: '台新Pay' },
  { id: 'outlet', label: '提供插座' },
  { id: 'parking', label: '停車場' },
  { id: 'taxi', label: '叫車服務' },
  { id: 'wifi', label: '提供WIFI' },
  { id: 'ev-charging', label: '汽車充電站' },
  { id: 'reservation', label: '可預約' },
  { id: 'private-room', label: '包廂服務' }
]

// 評分選項
const ratings = [
  { value: 'all', label: '不限' },
  { value: '4.5', label: '4.5+' },
  { value: '4', label: '4+' },
  { value: '3.5', label: '3.5+' }
]

// 選中的篩選條件
const selectedCategory = ref('all')
const selectedSubCategory = ref('')
const selectedCity = ref('all')
const selectedArea = ref('all')
const selectedServices = ref([])
const selectedRating = ref('')

// 根據選中的特店分類動態顯示細部分類
const subCategories = computed(() => {
  if (selectedCategory.value === 'all' || !subCategoryMap[selectedCategory.value]) {
    return subCategoryMap.all
  }
  return subCategoryMap[selectedCategory.value]
})

// 當特店分類改變時，重置細部分類
watch(selectedCategory, () => {
  selectedSubCategory.value = ''
})

// 切換服務選項
const toggleService = (serviceId) => {
  const index = selectedServices.value.indexOf(serviceId)
  if (index > -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(serviceId)
  }
}

// 清除篩選
const handleClear = () => {
  selectedCategory.value = 'all'
  selectedSubCategory.value = ''
  selectedCity.value = 'all'
  selectedArea.value = 'all'
  selectedServices.value = []
  selectedRating.value = ''
}

// 確定篩選
const handleConfirm = () => {
  const filterParams = {
    category: selectedCategory.value,
    subCategory: selectedSubCategory.value,
    city: selectedCity.value,
    area: selectedArea.value,
    services: selectedServices.value,
    rating: selectedRating.value
  }

  if (selectedCategory.value !== 'all') {
    const categoryMap = {
      restaurant: 'restaurant',
      shopping: 'groceries',
      hotel: 'hotel',
      entertainment: 'entertainment',
      transportation: 'transportation',
      education: 'education',
      beauty: 'beauty'
    }

    const routePath = categoryMap[selectedCategory.value]
    if (routePath) {
      router.push(`/cate/${routePath}`)
    }
  } else {
    router.push('/')
  }

  emit('filter', filterParams)
  handleClose()
}

// 關閉面板
const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

// 當面板關閉時重置篩選條件（可選）
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    // handleClear()
  }
})
</script>

<style scoped>
/* ========== 桌面版樣式 ========== */

/* 背景遮罩 */
.filter-overlay {
  position: fixed;
  top: 160px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow-y: auto;
}

/* 篩選面板 */
.filter-panel {
  background: white;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 32px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 70vh;
  overflow-y: auto;
  border-top: 2px solid #e0e0e0;
}

/* 自訂滾動條樣式 */
.filter-panel::-webkit-scrollbar {
  width: 8px;
}

.filter-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filter-panel::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.filter-panel::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* 篩選區塊 */
.filter-section {
  margin-bottom: 32px;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
}

.section-title {
  font-size: 18px;
  font-weight: 200;
  color: #f78a01;
  margin: 0 0 16px 0;
}

/* 篩選選項容器 */
.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-right: 8px;
  justify-content: flex-start;
}

/* 特店分類和服務使用 grid 佈局，每列5個 */
.filter-options-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding-right: 8px;
}

/* 篩選按鈕 */
.filter-button {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-button:hover:not(.filter-button-active) {
  background: #f5f5f5;
  color: #f78a01
}

.filter-button-active {
  background: #fef3e6;
  color: #f78a01;
}

.filter-button-active:hover {
  background: #fef3e6;
  color: #f78a01;
}

/* 下拉選單行 */
.filter-row {
  display: flex;
  gap: 16px;
}

.dropdown-wrapper {
  flex: 1;
  position: relative;
}

.dropdown-select {
  width: 100%;
  padding: 10px 16px;
  padding-right: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.dropdown-select:hover {
  border-color: #f78a01;
  box-shadow: 0 0 0 2px rgba(247, 138, 1, 0.1),
              0 0 0 4px rgba(247, 138, 1, 0.05),
              0 2px 4px rgba(247, 138, 1, 0.15);
}

.dropdown-select:focus {
  outline: none;
  border-color: #f78a01;
  box-shadow: 0 0 0 2px rgba(247, 138, 1, 0.1),
              0 0 0 4px rgba(247, 138, 1, 0.05),
              0 2px 4px rgba(247, 138, 1, 0.15);
}

/* 操作按鈕 */
.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
  margin-top: 32px;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
}

.action-button {
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.clear-button {
  background: white;
  color: #666;
  border: 1px solid #e0e0e0;
}

.clear-button:hover {
  border-color: #ccc;
  background: #f5f5f5;
}

.confirm-button {
  background: #f78a01;
  color: white;
}

.confirm-button:hover {
  background: #e66a00;
}

/* 桌面版過渡動畫 */
.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: opacity 0.3s ease;
}

.filter-panel-enter-active .filter-panel,
.filter-panel-leave-active .filter-panel {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  opacity: 0;
}

.filter-panel-enter-from .filter-panel,
.filter-panel-leave-to .filter-panel {
  transform: translateY(-20px);
  opacity: 0;
}

/* ========== 手機版動畫 ========== */

/* 淡入淡出動畫（遮罩） */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 從下方滑入動畫（篩選面板） */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
