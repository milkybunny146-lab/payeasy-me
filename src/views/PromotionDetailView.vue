<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-4xl w-full">
      <!-- 整張大卡片 -->
      <div class="promotion-detail-card">
        <!-- 上半部：圖片 -->
        <div class="promotion-image-section">
          <img
            :src="promotionDetail?.image || ''"
            :alt="promotionDetail?.title || '優惠券圖片'"
            class="promotion-detail-image"
          />
        </div>

        <!-- 下半部：內容 -->
        <div class="promotion-content-section">
          <!-- 標題 -->
          <h1 class="promotion-detail-title">
            {{ promotionDetail?.title || '優惠券詳情' }}
          </h1>

          <!-- 使用說明 -->
          <div class="promotion-section">
            <h2 class="section-title">使用說明</h2>
            <h3 class="section-subtitle">使用方式：</h3>
            <p class="usage-description">出示此優惠券於結帳時，可享消費滿${{ promotionDetail?.originalPrice || 0 }}元。</p>
          </div>

          <!-- 注意事項 -->
          <div class="promotion-section">
            <h2 class="section-title">注意事項：</h2>
            <ul class="notes-list">
              <li
                v-for="(note, index) in promotionDetail?.notes || []"
                :key="index"
                class="note-item"
              >
                {{ note }}
              </li>
            </ul>
          </div>

          <!-- 核銷碼 -->
          <div class="promotion-section">
            <h2 class="section-title">核銷碼</h2>
            <input
              v-model="verificationCode"
              type="text"
              placeholder="請輸入核銷碼"
              class="verification-input"
            />
            <p class="verification-hint">請向店家服務人員索取核銷碼</p>
          </div>

          <!-- 使用按鈕 -->
          <div class="promotion-actions">
            <button class="use-button" @click="handleUse">
              使用
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreStore } from '@/stores/store'

// 定義 props（路由配置使用 props: true，參數會作為 props 傳遞）
const props = defineProps({
  storeId: {
    type: [String, Number],
    default: undefined
  },
  promotionId: {
    type: [String, Number],
    default: undefined
  }
})

const route = useRoute()
const storeStore = useStoreStore()

// 從路由參數或 props 獲取店家 id 和優惠券 id
const storeId = computed(() => {
  // 優先使用 props，如果沒有則使用 route.params
  const id = props.storeId || route.params.storeId
  if (!id) {
    console.warn('storeId param is missing:', { props: props.storeId, params: route.params.storeId, allParams: route.params })
    return 0
  }
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  if (isNaN(numId)) {
    console.warn('storeId is NaN:', id, { props: props.storeId, params: route.params.storeId })
    return 0
  }
  return numId
})
const promotionId = computed(() => {
  // 優先使用 props，如果沒有則使用 route.params
  const id = props.promotionId || route.params.promotionId
  if (!id) {
    console.warn('promotionId param is missing:', { props: props.promotionId, params: route.params.promotionId, allParams: route.params })
    return 0
  }
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  if (isNaN(numId)) {
    console.warn('promotionId is NaN:', id, { props: props.promotionId, params: route.params.promotionId })
    return 0
  }
  return numId
})

// 調試：在組件掛載時輸出路由參數
onMounted(() => {
  console.log('PromotionDetailView mounted')
  console.log('Route params:', route.params)
  console.log('Route fullPath:', route.fullPath)
  console.log('Props:', { storeId: props.storeId, promotionId: props.promotionId })
  console.log('Computed storeId:', storeId.value)
  console.log('Computed promotionId:', promotionId.value)
  console.log('Store from storeStore:', storeStore.getStoreById(storeId.value))
  console.log('PromotionDetail:', promotionDetail.value)
})

// 從 Pinia store 獲取優惠券詳情
const promotionDetail = computed(() => {
  if (!storeId.value || !promotionId.value) {
    console.log('Missing params:', { storeId: storeId.value, promotionId: promotionId.value })
    return null
  }
  const store = storeStore.getStoreById(storeId.value)
  if (!store) {
    console.log('Store not found:', storeId.value)
    return null
  }
  if (!store.promotions) {
    console.log('Store has no promotions:', store)
    return null
  }
  const promotion = store.promotions.find(p => p.id === promotionId.value)
  if (!promotion) {
    console.log('Promotion not found:', {
      promotionId: promotionId.value,
      availableIds: store.promotions.map(p => p.id),
      promotions: store.promotions
    })
  } else {
    console.log('Promotion found:', promotion)
  }
  return promotion || null
})

// 核銷碼
const verificationCode = ref('')

// 處理使用按鈕點擊
const handleUse = () => {
  if (!verificationCode.value.trim()) {
    alert('請輸入核銷碼')
    return
  }
  // 這裡可以添加使用優惠券的邏輯
  console.log('使用優惠券:', promotionDetail.value?.title, '核銷碼:', verificationCode.value)
  alert('優惠券使用成功！')
}
</script>

<style scoped>
.promotion-detail-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 上半部：圖片 */
.promotion-image-section {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}

.promotion-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 下半部：內容 */
.promotion-content-section {
  padding: 40px;
}

/* 標題 */
.promotion-detail-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px 0;
}

/* 區塊 */
.promotion-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin: 0 0 16px 0;
}

/* 使用說明 */
.section-subtitle {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
}

.usage-description {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin: 0;
}

/* 注意事項列表 */
.notes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.note-item {
  padding: 12px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  position: relative;
  padding-left: 20px;
}

.note-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000;
  font-weight: bold;
}

/* 核銷碼輸入框 */
.verification-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.verification-input:focus {
  outline: none;
  border-color: #f78a01;
}

.verification-hint {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* 使用按鈕 */
.promotion-actions {
  margin-top: 40px;
}

.use-button {
  width: 100%;
  padding: 16px;
  background: #f68a01;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.use-button:hover {
  background: #e66a00;
  color: white;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .promotion-detail-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .promotion-image-section {
    height: 300px;
  }

  .promotion-content-section {
    padding: 24px;
  }
}
</style>

