<template>
  <Teleport to="body">
    <Transition name="filter-panel">
      <div v-if="visible" class="filter-overlay" @click.self="handleClose">
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
  // 這裡可以根據選中的縣市返回對應的區域
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

  // 根據分類導向對應頁面
  if (selectedCategory.value !== 'all') {
    // 映射分類 ID 到路由路徑
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
    // 如果選擇全部分類，可以導向首頁或保持當前頁面
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
    // 可以選擇是否在關閉時重置
    // handleClear()
  }
})
</script>

<style scoped>
/* 背景遮罩 */
.filter-overlay {
  position: fixed;
  top: 160px; /* 從導航列下方開始 */
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
  max-height: 70vh; /* 限制最大高度，不遮擋全部畫面 */
  overflow-y: auto; /* 內容可滾動 */
  border-top: 2px solid #e0e0e0; /* 導航列與面板間的隔線 */
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
  max-width: 1280px; /* 與導航列 max-w-7xl 一致 */
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px; /* 與導航列 px-10 一致 */
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
  gap: 16px; /* 增加選項間距 */
  padding-right: 8px; /* 為滾動條留出空間 */
  justify-content: flex-start; /* 靠左對齊 */
}

/* 特店分類和服務使用 grid 佈局，每列5個 */
.filter-options-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px; /* 增加選項間距 */
  padding-right: 8px; /* 為滾動條留出空間 */
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
  text-align: left; /* 文字靠左對齊 */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-button:hover:not(.filter-button-active) {
  background: #f5f5f5; /* hover 時灰色背景 */
  color: #f78a01
}

.filter-button-active {
  background: #fef3e6; /* 點擊後淺橙色背景 */
  color: #f78a01; /* 文字顏色為橙色 */
}

.filter-button-active:hover {
  background: #fef3e6; /* 選中狀態 hover 時保持淺橙色 */
  color: #f78a01; /* 文字顏色保持橙色 */
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

/* 過渡動畫 */
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
</style>

