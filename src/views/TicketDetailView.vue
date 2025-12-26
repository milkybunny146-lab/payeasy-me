<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-4xl w-full">
      <!-- 整張大卡片 -->
      <div class="ticket-card">
        <!-- 上半部：圖片 -->
        <div class="ticket-image-section">
          <img
            :src="ticketImage"
            :alt="ticketDetail?.title || '票券圖片'"
            class="ticket-image"
          />
        </div>

        <!-- 下半部：內容 -->
        <div class="ticket-content-section">
          <!-- 標題 -->
          <h1 class="ticket-title">{{ ticketDetail?.title || '票券詳情' }}</h1>

          <!-- 積分和使用期間 -->
          <div class="ticket-info">
            <div class="info-row">
              <span class="info-label">扣除積分</span>
              <span class="info-value points-value">{{ ticketDetail?.pointsPerItem || 0 }}積分/份</span>
            </div>
            <div class="info-row">
              <span class="info-label">可使用期間</span>
              <span class="info-value">
                {{ ticketDetail?.validPeriod?.start || '' }}-{{ ticketDetail?.validPeriod?.end || '' }}
              </span>
            </div>
          </div>

          <!-- 使用說明 -->
          <div class="ticket-section">
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
          <div class="ticket-section">
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
          <div class="ticket-actions">
            <button class="redeem-button" @click="handleRedeem">
              立即兌換
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'

const route = useRoute()
const ticketStore = useTicketStore()

// 從路由參數獲取票券 id
const ticketId = computed(() => parseInt(route.params.id))

// 從 Pinia store 獲取票券數據
const ticket = computed(() => {
  return ticketStore.getTicketById(ticketId.value)
})

// 票券詳情
const ticketDetail = computed(() => {
  return ticket.value?.detail || null
})

// 票券圖片（使用票券的圖片或隨機圖片）
const ticketImage = computed(() => {
  if (ticket.value?.image) {
    return ticket.value.image
  }
  // 如果沒有圖片，使用隨機圖片
  const randomImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=400&fit=crop'
  ]
  const randomIndex = ticketId.value % randomImages.length
  return randomImages[randomIndex]
})

const handleRedeem = () => {
  console.log('兌換票券:', ticket.value?.title)
  // 這裡可以添加兌換邏輯
}
</script>

<style scoped>
.ticket-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.ticket-image-section {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
}

.ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-content-section {
  padding: 40px;
}

.ticket-title {
  font-size: 32px;
  font-weight: 400;
  color: #333;
  text-align: left;
  margin-bottom: 32px;
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
  font-weight: 70;
}

.points-value {
  color: #f78a01;
  font-weight: 120;
  font-size: 25px;
}

.ticket-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin-bottom: 12px;
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

.ticket-actions {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.redeem-button {
  background: #f78a01;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 138, 1, 0.3);
  width: 100%;
}

.redeem-button:hover {
  background: #e67a00;
  box-shadow: 0 6px 16px rgba(247, 138, 1, 0.4);
  transform: translateY(-2px);
}

.redeem-button:active {
  transform: translateY(0);
}
</style>

