<template>
  <div class="w-full flex justify-center px-4 md:px-10 py-6 md:py-8">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-xl md:text-2xl font-[350] text-black">熱門票券</h2>
      </div>

      <!-- 票券列表 - 桌面版（保持原設計） -->
      <div class="hidden md:grid grid-cols-2 gap-6">
        <router-link
          v-for="ticket in ticketList"
          :key="ticket.id"
          :to="`/ticket/${ticket.id}`"
          class="reward-card-link"
        >
          <el-card
            class="reward-card"
            shadow="hover"
            :body-style="{ padding: '0' }"
          >
            <div class="card-content">
              <el-avatar :size="80" shape="square" :src="ticket.image" class="card-avatar" />
              <div class="info">
                <span class="title">{{ ticket.title }}</span>
                <span class="subtitle">{{ ticket.description }}</span>
              </div>
              <div class="points-badge">
                <span class="points">{{ ticket.points }}積分</span>
                <el-button
                  type="warning"
                  size="small"
                  round
                  class="redeem-btn"
                  @click.prevent="handleRedeem(ticket)"
                >
                  兌換
                </el-button>
              </div>
            </div>
          </el-card>
        </router-link>
      </div>

      <!-- 票券列表 - 手機版（Swiper 輪播） -->
      <div class="md:hidden relative -mx-4">
        <div class="ticket-swiper-container">
          <Swiper
            :modules="[Pagination]"
            :slides-per-view="2"
            :slides-per-group="2"
            :space-between="8"
            :resistance="false"
            :resistanceRatio="0"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="ticket-swiper"
          >
          <SwiperSlide v-for="ticket in ticketList" :key="ticket.id">
            <router-link :to="`/ticket/${ticket.id}`" class="mobile-ticket-card">
              <!-- 圖片區域 -->
              <div class="ticket-image-wrapper">
                <img :src="ticket.image" :alt="ticket.title" class="ticket-image" />
                <!-- 漸層遮罩與文字 -->
                <div class="ticket-overlay">
                  <h3 class="ticket-title">{{ ticket.title }}</h3>
                  <p class="ticket-desc">{{ ticket.description }}</p>
                </div>
              </div>

              <!-- 積分區域 -->
              <div class="ticket-points-section">
                <!-- 左側凹陷 -->
                <div class="notch notch-left"></div>
                <!-- 右側凹陷 -->
                <div class="notch notch-right"></div>

                <div class="ticket-points-content">
                  <span class="ticket-points">{{ ticket.points }}積分</span>
                  <button
                    class="ticket-redeem-btn"
                    @click.prevent="handleRedeem(ticket)"
                  >
                    兌換
                  </button>
                </div>
              </div>
            </router-link>
          </SwiperSlide>
          </Swiper>
        </div>

        <!-- 輪播導航 -->
        <CarouselNavigation
          :show-navigation="false"
          :show-pagination="true"
          :current-index="currentIndex"
          :total-slides="totalSlides"
          :is-beginning="isBeginning"
          :is-end="isEnd"
          pagination-style="custom"
          @prev="slidePrev"
          @next="slideNext"
          @go-to="goToSlide"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { useTicketStore } from '@/stores/ticket'
import CarouselNavigation from '@/components/common/CarouselNavigation.vue'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const ticketStore = useTicketStore()

// Swiper 實例
const swiperInstance = ref(null)
const currentIndex = ref(0)
const isBeginning = ref(true)
const isEnd = ref(false)

// 從 Pinia store 獲取票券列表
const ticketList = computed(() => {
  return ticketStore.getTicketList()
})

// 計算總頁數（每頁顯示 2 張，使用 slides-per-group="2"）
const totalSlides = computed(() => {
  return Math.ceil(ticketList.value.length / 2)
})

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
  // 初始化 currentIndex
  if (swiper) {
    currentIndex.value = Math.floor(swiper.activeIndex / 2)
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  }
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    // 因為使用 slides-per-group="2"，所以頁面索引是 activeIndex / 2
    currentIndex.value = Math.floor(swiperInstance.value.activeIndex / 2)
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
  }
}

const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}

const slideNext = () => {
  swiperInstance.value?.slideNext()
}

const goToSlide = (index) => {
  // 因為使用 slides-per-group="2"，所以跳轉到 index * 2
  swiperInstance.value?.slideTo(index * 2)
}

const handleRedeem = (ticket) => {
  router.push(`/ticket/${ticket.id}`)
}
</script>

<style scoped>
.reward-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.reward-card {
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  background-color: #fffefd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reward-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.card-content {
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  min-height: 120px;
}

.card-avatar {
  flex-shrink: 0;
  border-radius: 15px;
  margin: 16px;
  align-self: center;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  padding: 16px 0;
  position: relative;
  align-self: center;
}

.card-content::before {
  content: '';
  position: absolute;
  right: 140px;
  top: 0;
  bottom: 50%;
  margin-bottom: 10px;
  width: 1px;
  background-image: repeating-linear-gradient(
    to bottom,
    #d4a574 0px,
    #d4a574 5px,
    transparent 5px,
    transparent 7px
  );
  z-index: 1;
}

.card-content::after {
  content: '';
  position: absolute;
  right: 140px;
  top: 50%;
  margin-top: 10px;
  bottom: 0;
  width: 1px;
  background-image: repeating-linear-gradient(
    to bottom,
    #d4a574 0px,
    #d4a574 5px,
    transparent 5px,
    transparent 7px
  );
  z-index: 1;
}

.title {
  font-size: 19px;
  font-weight: 440;
  color: #333;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.subtitle {
  font-size: 15px;
  font-weight: 400;
  color: #666;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.points-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  background: #ffd700;
  padding: 16px 20px;
  border-radius: 0 12px 12px 0;
  width: 140px;
  justify-content: center;
  position: relative;
  align-self: stretch;
}

.points-badge::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 19px;
  height: 28px;
  background: #fffefd;
  border-radius: 50%;
  margin-left: -10px;
  z-index: 2;
}

.points {
  font-size: 30px;
  font-weight: 300;
  color: #333;
  white-space: nowrap;
}

.redeem-btn {
  transition: all 0.3s ease;
  width: 95px;
  height: 38px;
  background-color: white !important;
  border-color: white !important;
  color: #333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.redeem-btn:hover {
  background-color: #f7f6f5 !important;
  border-color: #f7f6f5 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}

/* ========== 手機版樣式 ========== */
.ticket-swiper-container {
  padding-left: 16px; /* 與 px-4 對齊 */
  padding-right: 16px; /* 與 px-4 對齊 */
  overflow: hidden; /* 完全隱藏超出容器的 slide */
  position: relative;
  width: 100%;
  max-width: 100%;
}

.ticket-swiper {
  padding-bottom: 40px;
  overflow: hidden !important; /* 強制隱藏超出部分 */
  width: 100% !important;
  max-width: 100% !important;
}

/* 確保 Swiper 容器正確隱藏超出部分 */
.ticket-swiper :deep(.swiper) {
  overflow: hidden !important;
  width: 100% !important;
  max-width: 100% !important;
}

.ticket-swiper :deep(.swiper-wrapper) {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.ticket-swiper :deep(.swiper-slide) {
  flex-shrink: 0;
  width: calc((100% - 8px) / 2) !important; /* 確保每張卡片佔據正確寬度 */
  margin-right: 8px;
  box-sizing: border-box;
  max-width: calc((100% - 8px) / 2) !important;
}

.mobile-ticket-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 16px;
  overflow: visible;
  background: white;
  margin: 0 4px; /* 增加左右邊距，與 px-4 對齊 */
}

/* 圖片區域 */
.ticket-image-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 75%; /* 4:3 比例 */
  overflow: hidden;
  margin-bottom: 12px;
  border-radius: 16px;
}

.ticket-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 圖片上的漸層遮罩與文字 */
.ticket-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.ticket-title {
  font-size: 18px;
  font-weight: 300;
  margin: 0 0 2px 0;
  line-height: 1.3;
}

.ticket-desc {
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.3;
  font-weight: 300;
}

/* 積分區域 */
.ticket-points-section {
  position: relative;
  background: #ffd700;
  padding: 12px 16px;
  border-radius: 16px;
  height: 60px;
}

/* 凹陷效果 */
.notch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 20px;
  background: white;
  border-radius: 50%;
}

.notch-left {
  left: -8px;
}

.notch-right {
  right: -8px;
}

.ticket-points-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.ticket-points {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}

.ticket-redeem-btn {
  padding: 6px 16px;
  background: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ticket-redeem-btn:hover {
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 輪播導航位置調整 */
:deep(.carousel-navigation) {
  position: relative;
}

:deep(.pagination-wrapper) {
  position: relative !important;
  transform: none !important;
  left: auto !important;
  bottom: auto !important;
  margin-top: 8px;
}

/* 確保當前頁指示器為橘色 */
:deep(.pagination-custom .pagination-bullet-active) {
  background: #f97316 !important;
  width: 32px !important;
}
</style>

