<template>
  <div class="store-ticket-detail-view">
    <!-- 桌面版：大卡片設計 -->
    <div class="hidden md:block">
      <div class="w-full flex justify-center px-10 py-8">
        <div class="max-w-4xl w-full">
          <!-- 整張大卡片 -->
          <div class="promotion-detail-card">
            <!-- 上半部：圖片 -->
            <div class="promotion-image-section">
              <img
                :src="ticketDetail?.image || ''"
                :alt="ticketDetail?.title || '電子票券圖片'"
                class="promotion-detail-image"
              />
            </div>

            <!-- 下半部：內容 -->
            <div class="promotion-content-section">
              <!-- 標題 -->
              <h1 class="promotion-detail-title">
                {{ ticketDetail?.title || '電子票券詳情' }}
              </h1>

              <!-- 積分和使用期間 -->
              <div class="ticket-info">
                <div class="info-row">
                  <span class="info-label">扣除積分</span>
                  <span class="info-value points-value">{{ ticketDetail?.points || 0 }}積分/份</span>
                </div>
                <div class="info-row">
                  <span class="info-label">可使用期間</span>
                  <span class="info-value">
                    {{ ticketDetail?.validPeriod?.start || '' }}-{{ ticketDetail?.validPeriod?.end || '' }}
                  </span>
                </div>
              </div>

              <!-- 使用說明 -->
              <div class="promotion-section">
                <h2 class="section-title">使用說明</h2>
                <h3 class="section-subtitle">使用步驟:</h3>
                <ol class="steps-list">
                  <li
                    v-for="(step, index) in ticketDetail?.usageSteps || []"
                    :key="index"
                    class="step-item"
                  >
                    {{ step }}
                  </li>
                </ol>
              </div>

              <!-- 使用條款 -->
              <div class="promotion-section">
                <h2 class="section-title">使用條款:</h2>
                <ul class="terms-list">
                  <li
                    v-for="(term, index) in ticketDetail?.terms || []"
                    :key="index"
                    class="term-item"
                  >
                    {{ term }}
                  </li>
                </ul>
              </div>

              <!-- 立即兌換按鈕 -->
              <div class="promotion-actions">
                <button class="redeem-button" @click="handleRedeem">
                  立即兌換
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機版：整頁式設計 -->
    <div class="md:hidden store-ticket-detail-mobile">
      <!-- 圖片區域（全寬） -->
      <div class="mobile-image-section">
        <img
          :src="ticketDetail?.image || ''"
          :alt="ticketDetail?.title || '電子票券圖片'"
          class="mobile-ticket-image"
        />
      </div>

      <!-- 內容區域 -->
      <div class="mobile-content-section">
        <!-- 標題 -->
        <h1 class="mobile-ticket-title">
          {{ ticketDetail?.title || '電子票券詳情' }}
        </h1>

        <!-- 積分和使用期間 -->
        <div class="mobile-ticket-info">
          <div class="mobile-info-row">
            <span class="mobile-info-label">扣除積分</span>
            <span class="mobile-info-value mobile-points-value">{{ ticketDetail?.points || 0 }}積分/份</span>
          </div>
          <div class="mobile-info-row">
            <span class="mobile-info-label">可使用期間</span>
            <span class="mobile-info-value">
              {{ ticketDetail?.validPeriod?.start || '' }}-{{ ticketDetail?.validPeriod?.end || '' }}
            </span>
          </div>
        </div>

        <!-- 使用說明 -->
        <div class="mobile-ticket-section">
          <h2 class="mobile-section-title">使用說明</h2>
          <h3 class="mobile-section-subtitle">使用步驟:</h3>
          <ol class="mobile-steps-list">
            <li
              v-for="(step, index) in ticketDetail?.usageSteps || []"
              :key="index"
              class="mobile-step-item"
            >
              {{ step }}
            </li>
          </ol>
        </div>

        <!-- 使用條款 -->
        <div class="mobile-ticket-section">
          <h2 class="mobile-section-title">使用條款:</h2>
          <ul class="mobile-terms-list">
            <li
              v-for="(term, index) in ticketDetail?.terms || []"
              :key="index"
              class="mobile-term-item"
            >
              {{ term }}
            </li>
          </ul>
        </div>

        <!-- 立即兌換按鈕 -->
        <div class="mobile-ticket-actions">
          <button class="mobile-redeem-button" @click="handleRedeem">
            立即兌換
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreStore } from '@/stores/store'
import { useTicketStore } from '@/stores/ticket'

// 定義 props（路由配置使用 props: true，參數會作為 props 傳遞）
const props = defineProps({
  storeId: {
    type: [String, Number],
    default: undefined
  },
  ticketId: {
    type: [String, Number],
    default: undefined
  }
})

const route = useRoute()
const storeStore = useStoreStore()
const ticketStore = useTicketStore()

// 從路由參數或 props 獲取店家 id 和票券 id
const storeId = computed(() => {
  const id = props.storeId || route.params.storeId
  if (!id) return 0
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return isNaN(numId) ? 0 : numId
})

const ticketId = computed(() => {
  const id = props.ticketId || route.params.ticketId
  if (!id) return 0
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return isNaN(numId) ? 0 : numId
})

// 從店家資料中獲取票券資訊
const storeTicket = computed(() => {
  if (!storeId.value || !ticketId.value) return null
  const store = storeStore.getStoreById(storeId.value)
  if (!store || !store.tickets) return null
  return store.tickets.find(t => t.id === ticketId.value) || null
})

// 從 ticket.js 獲取票券詳細資料
const ticketDetail = computed(() => {
  if (!ticketId.value) return null
  
  // 先從 ticket.js 中獲取詳細資料
  const ticket = ticketStore.getTicketById(ticketId.value)
  if (ticket && ticket.detail) {
    return {
      ...ticket.detail,
      image: ticket.image || storeTicket.value?.image || '',
      title: ticket.title || storeTicket.value?.title || '',
      points: ticket.points || storeTicket.value?.points || 0
    }
  }
  
  // 如果 ticket.js 中沒有，使用店家票券的基本資料
  if (storeTicket.value) {
    return {
      title: storeTicket.value.title,
      points: storeTicket.value.points,
      image: storeTicket.value.image,
      validPeriod: {
        start: '即日起',
        end: '2025/12/31'
      },
      usageSteps: [
        '使用前請提前3天電話預約',
        '入座時出示電子票券QR Code',
        '每次限用一張',
        '不可與其他優惠併用'
      ],
      terms: [
        '特殊節日(春節、情人節、母親節等)不適用',
        '午餐時段不適用,僅供晚餐使用',
        '本券使用完畢後,不找零、不可兌換現金',
        '店家保留活動修改、暫停或終止之權利'
      ]
    }
  }
  
  return null
})

// 處理立即兌換按鈕點擊
const handleRedeem = () => {
  console.log('兌換票券:', ticketDetail.value?.title)
  // 這裡可以添加兌換邏輯
  alert('票券兌換成功！')
}

// 頁面載入時滾動到頂部
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.store-ticket-detail-view {
  min-height: 100vh;
  background: white;
}

/* ========== 桌面版樣式（使用與 PromotionDetailView 相同的樣式） ========== */
.promotion-detail-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

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

.promotion-content-section {
  padding: 40px;
}

.promotion-detail-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px 0;
}

.ticket-info {
  margin-bottom: 32px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.info-row:last-child {
  border-bottom: 1px solid #e5e7eb;
}

.info-label {
  font-size: 16px;
  color: #666;
  font-weight: 400;
}

.info-value {
  font-size: 16px;
  color: #333;
  font-weight: 400;
}

.points-value {
  color: #f78a01;
  font-weight: 600;
  font-size: 25px;
}

.promotion-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
}

.steps-list {
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 0;
}

.step-item {
  counter-increment: step-counter;
  position: relative;
  padding-left: 32px;
  padding-bottom: 12px;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}

.step-item::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: #f78a01;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.terms-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.term-item {
  position: relative;
  padding-left: 24px;
  padding-bottom: 12px;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}

.term-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #f78a01;
  font-size: 20px;
  font-weight: bold;
}

.promotion-actions {
  margin-top: 40px;
}

.redeem-button {
  width: 100%;
  padding: 16px;
  background: #f78a01;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 138, 1, 0.3);
}

.redeem-button:hover {
  background: #e67a00;
  box-shadow: 0 6px 16px rgba(247, 138, 1, 0.4);
  transform: translateY(-2px);
}

.redeem-button:active {
  transform: translateY(0);
}

/* ========== 手機版樣式 ========== */
.store-ticket-detail-mobile {
  width: 100%;
  background: white;
}

.mobile-image-section {
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  position: relative;
}

.mobile-ticket-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-content-section {
  padding: 20px 16px 100px 16px;
}

.mobile-ticket-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
}

.mobile-ticket-info {
  margin-bottom: 24px;
}

.mobile-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.mobile-info-row:last-child {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-info-label {
  font-size: 14px;
  color: #999;
  font-weight: 400;
}

.mobile-info-value {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

.mobile-points-value {
  color: #f78a01;
  font-weight: 600;
  font-size: 20px;
}

.mobile-ticket-section {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.mobile-section-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 12px;
}

.mobile-steps-list {
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 0;
}

.mobile-step-item {
  counter-increment: step-counter;
  position: relative;
  padding-left: 28px;
  padding-bottom: 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.mobile-step-item::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background: #f78a01;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.mobile-terms-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-term-item {
  position: relative;
  padding-left: 20px;
  padding-bottom: 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.mobile-term-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #f78a01;
  font-size: 18px;
  font-weight: bold;
}

.mobile-ticket-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.mobile-redeem-button {
  width: 100%;
  padding: 16px;
  background: #f78a01;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 138, 1, 0.3);
}

.mobile-redeem-button:hover {
  background: #e67a00;
  box-shadow: 0 6px 16px rgba(247, 138, 1, 0.4);
}

.mobile-redeem-button:active {
  transform: scale(0.98);
}
</style>

