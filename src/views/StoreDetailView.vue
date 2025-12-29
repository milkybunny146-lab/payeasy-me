<template>
  <div class="store-detail-view">
    <!-- 桌面版：內容區域（大卡片） -->
    <div class="hidden md:flex w-full justify-center px-10 py-8">
      <div class="max-w-4xl w-full">
        <!-- 整張大卡片 -->
        <div class="store-card">
          <!-- 上半部：圖片 -->
          <div class="store-image-section">
            <img
              :src="storeDetail?.image || ''"
              :alt="storeDetail?.name || '店家圖片'"
              class="store-image"
            />
          </div>

          <!-- 下半部：內容 -->
          <div class="store-content-section">
            <!-- 店家基本信息 -->
            <div class="store-header">
              <h1 class="store-name">{{ storeDetail?.name || '店家名稱' }}</h1>
              <p class="store-category">{{ storeDetail?.category || '' }}</p>
              <div class="store-meta">
                <span class="rating">★ {{ storeDetail?.rating || 0 }}</span>
                <span class="distance">
                  <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ storeDetail?.distance || '' }}
                </span>
              </div>
            </div>

        <!-- 聯絡信息 -->
        <div class="store-contact">
          <div class="contact-row">
            <span class="contact-label">營業時間</span>
            <span class="contact-value">{{ storeDetail?.businessHours || '' }}</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">電話</span>
            <span class="contact-value">{{ storeDetail?.phone || '' }}</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">地址</span>
            <span class="contact-value">{{ storeDetail?.address || '' }}</span>
          </div>
        </div>

        <!-- 優惠活動輪播（如果有數據則顯示） -->
        <div v-if="storeDetail?.promotions && storeDetail.promotions.length > 0" class="section">
          <div class="carousel-wrapper">
            <swiper
              :modules="modules"
              :slides-per-view="2.2"
              :space-between="16"
              @swiper="(swiper) => promotionSwiper = swiper"
              @slideChange="() => promotionIndex = promotionSwiper?.activeIndex || 0"
              :breakpoints="{
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 24
                }
              }"
              class="promotion-swiper"
            >
              <swiper-slide v-for="promotion in storeDetail.promotions" :key="promotion.id">
                <div class="promotion-card">
                  <img :src="promotion.image" :alt="promotion.title" class="promotion-image" />
                  <div class="promotion-content">
                    <h3 class="promotion-title">{{ promotion.title }}</h3>
                    <p class="promotion-condition">消費滿${{ promotion.originalPrice }}元</p>
                    <p class="promotion-validity">使用期間至{{ promotion.validUntil }}</p>
                    <router-link
                      :to="`/store/${storeId.value || route.params.id}/promotion/${promotion.id}`"
                      class="promotion-button"
                    >
                      {{ promotion.buttonText }}
                    </router-link>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <CarouselNavigation
              v-if="storeDetail?.promotions && storeDetail.promotions.length > 0"
              :current-index="promotionIndex"
              :total-slides="storeDetail.promotions.length"
              :is-beginning="promotionSwiper?.isBeginning || false"
              :is-end="promotionSwiper?.isEnd || false"
              pagination-style="swiper"
              :show-navigation="false"
              @prev="promotionSwiper?.slidePrev()"
              @next="promotionSwiper?.slideNext()"
              @go-to="(index) => promotionSwiper?.slideTo(index)"
            />
          </div>
        </div>

        <!-- 店家介紹 -->
        <div class="section">
          <h2 class="section-title">店家介紹</h2>
          <p class="section-content">{{ storeDetail?.introduction || '' }}</p>
        </div>

        <!-- 優惠使用說明 -->
        <div class="section">
          <h2 class="section-title">優惠使用說明</h2>
          <ul class="instructions-list">
            <li
              v-for="(instruction, index) in storeDetail?.usageInstructions || []"
              :key="index"
              class="instruction-item"
            >
              {{ instruction }}
            </li>
          </ul>
        </div>

        <!-- 電子票券輪播（如果有數據則顯示） -->
        <div v-if="storeDetail?.tickets && storeDetail.tickets.length > 0" class="section">
          <h2 class="section-title">電子票券</h2>
          <div class="carousel-wrapper">
            <swiper
              :modules="modules"
              :slides-per-view="4.2"
              :slides-per-group="4"
              :space-between="8"
              @swiper="(swiper) => ticketSwiper = swiper"
              @slideChange="() => ticketIndex = ticketSwiper?.activeIndex || 0"
              :breakpoints="{
                768: {
                  slidesPerView: 4.2,
                  slidesPerGroup: 4,
                  spaceBetween: 8
                },
                1024: {
                  slidesPerView: 4.2,
                  slidesPerGroup: 4,
                  spaceBetween: 8
                }
              }"
              class="ticket-swiper"
            >
              <swiper-slide v-for="ticket in storeDetail.tickets" :key="ticket.id">
                <router-link :to="`/store/${storeId.value || route.params.id}/ticket/${ticket.id}`" class="ticket-card-link">
                  <div class="ticket-card">
                    <div class="ticket-image-wrapper">
                      <img :src="ticket.image" :alt="ticket.title" class="ticket-image" />
                      <span v-if="ticket.tag" class="ticket-tag">{{ ticket.tag }}</span>
                    </div>
                    <div class="ticket-content">
                      <h3 class="ticket-title">{{ ticket.title }}</h3>
                      <p class="ticket-points">{{ ticket.points }}分</p>
                    </div>
                  </div>
                </router-link>
              </swiper-slide>
            </swiper>
            <CarouselNavigation
              v-if="storeDetail?.tickets && storeDetail.tickets.length > 0"
              :current-index="Math.floor(ticketIndex / 4)"
              :total-slides="ticketTotalPages"
              :is-beginning="ticketSwiper?.isBeginning || false"
              :is-end="ticketSwiper?.isEnd || false"
              pagination-style="swiper"
              :show-navigation="false"
              :show-pagination="true"
              @prev="ticketSwiper?.slidePrev()"
              @next="ticketSwiper?.slideNext()"
              @go-to="(pageIndex) => ticketSwiper?.slideTo(pageIndex * 4)"
            />
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機版：整頁樣式 -->
    <div class="md:hidden store-detail-mobile">
      <!-- 圖片區域（全寬） -->
      <div class="mobile-image-section">
        <img
          :src="storeDetail?.image || ''"
          :alt="storeDetail?.name || '店家圖片'"
          class="mobile-store-image"
        />
      </div>

      <!-- 內容區域 -->
      <div class="mobile-content-section">
        <!-- 店家基本信息 -->
        <div class="mobile-store-header">
          <h1 class="mobile-store-name">{{ storeDetail?.name || '店家名稱' }}</h1>
          <p class="mobile-store-category">{{ storeDetail?.category || '' }}</p>
          <div class="mobile-store-meta">
            <span class="mobile-rating">★ {{ storeDetail?.rating || 0 }}</span>
            <span class="mobile-distance">
              <svg xmlns="http://www.w3.org/2000/svg" class="mobile-location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ storeDetail?.distance || '' }}
            </span>
          </div>
        </div>

        <!-- 聯絡信息 -->
        <div class="mobile-store-contact">
          <div class="mobile-contact-row">
            <span class="mobile-contact-label">營業時間</span>
            <span class="mobile-contact-value">{{ storeDetail?.businessHours || '' }}</span>
          </div>
          <div class="mobile-contact-row">
            <span class="mobile-contact-label">電話</span>
            <span class="mobile-contact-value">{{ storeDetail?.phone || '' }}</span>
          </div>
          <div class="mobile-contact-row">
            <span class="mobile-contact-label">地址</span>
            <span class="mobile-contact-value">{{ storeDetail?.address || '' }}</span>
          </div>
        </div>

        <!-- 優惠活動輪播（如果有數據則顯示） -->
        <div v-if="storeDetail?.promotions && storeDetail.promotions.length > 0" class="mobile-section">
          <h2 class="mobile-section-title">優惠活動</h2>
          <div class="mobile-carousel-wrapper">
            <swiper
              :modules="modules"
              :slides-per-view="1.2"
              :space-between="12"
              @swiper="(swiper) => promotionSwiper = swiper"
              @slideChange="() => promotionIndex = promotionSwiper?.activeIndex || 0"
              class="mobile-promotion-swiper"
            >
              <swiper-slide v-for="promotion in storeDetail.promotions" :key="promotion.id">
                <div class="mobile-promotion-card">
                  <img :src="promotion.image" :alt="promotion.title" class="mobile-promotion-image" />
                  <div class="mobile-promotion-content">
                    <h3 class="mobile-promotion-title">{{ promotion.title }}</h3>
                    <p class="mobile-promotion-condition">消費滿${{ promotion.originalPrice }}元</p>
                    <p class="mobile-promotion-validity">使用期間至{{ promotion.validUntil }}</p>
                    <router-link
                      :to="`/store/${storeId.value || route.params.id}/promotion/${promotion.id}`"
                      class="mobile-promotion-button"
                    >
                      {{ promotion.buttonText }}
                    </router-link>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <CarouselNavigation
              v-if="storeDetail?.promotions && storeDetail.promotions.length > 0"
              :current-index="promotionIndex"
              :total-slides="storeDetail.promotions.length"
              :is-beginning="promotionSwiper?.isBeginning || false"
              :is-end="promotionSwiper?.isEnd || false"
              pagination-style="swiper"
              :show-navigation="false"
              @prev="promotionSwiper?.slidePrev()"
              @next="promotionSwiper?.slideNext()"
              @go-to="(index) => promotionSwiper?.slideTo(index)"
            />
          </div>
        </div>

        <!-- 店家介紹 -->
        <div class="mobile-section">
          <h2 class="mobile-section-title">店家介紹</h2>
          <p class="mobile-section-content">{{ storeDetail?.introduction || '' }}</p>
        </div>

        <!-- 優惠使用說明 -->
        <div class="mobile-section">
          <h2 class="mobile-section-title">優惠使用說明</h2>
          <ul class="mobile-instructions-list">
            <li
              v-for="(instruction, index) in storeDetail?.usageInstructions || []"
              :key="index"
              class="mobile-instruction-item"
            >
              {{ instruction }}
            </li>
          </ul>
        </div>

        <!-- 電子票券輪播（如果有數據則顯示） -->
        <div v-if="storeDetail?.tickets && storeDetail.tickets.length > 0" class="mobile-section">
          <h2 class="mobile-section-title">電子票券</h2>
          <div class="mobile-carousel-wrapper">
            <swiper
              :modules="modules"
              :slides-per-view="2.2"
              :space-between="12"
              @swiper="(swiper) => ticketSwiper = swiper"
              @slideChange="() => ticketIndex = ticketSwiper?.activeIndex || 0"
              class="mobile-ticket-swiper"
            >
              <swiper-slide v-for="ticket in storeDetail.tickets" :key="ticket.id">
                <router-link :to="`/store/${storeId.value || route.params.id}/ticket/${ticket.id}`" class="mobile-ticket-card-link">
                  <div class="mobile-ticket-card">
                    <div class="mobile-ticket-image-wrapper">
                      <img :src="ticket.image" :alt="ticket.title" class="mobile-ticket-image" />
                      <span v-if="ticket.tag" class="mobile-ticket-tag">{{ ticket.tag }}</span>
                    </div>
                    <div class="mobile-ticket-content">
                      <h3 class="mobile-ticket-title">{{ ticket.title }}</h3>
                      <p class="mobile-ticket-points">{{ ticket.points }}分</p>
                    </div>
                  </div>
                </router-link>
              </swiper-slide>
            </swiper>
            <CarouselNavigation
              v-if="storeDetail?.tickets && storeDetail.tickets.length > 0"
              :current-index="Math.floor(ticketIndex / 2)"
              :total-slides="mobileTicketTotalPages"
              :is-beginning="ticketSwiper?.isBeginning || false"
              :is-end="ticketSwiper?.isEnd || false"
              pagination-style="swiper"
              :show-navigation="false"
              :show-pagination="true"
              @prev="ticketSwiper?.slidePrev()"
              @next="ticketSwiper?.slideNext()"
              @go-to="(pageIndex) => ticketSwiper?.slideTo(pageIndex * 2)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreStore } from '@/stores/store'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import CarouselNavigation from '@/components/common/CarouselNavigation.vue'

const route = useRoute()
const storeStore = useStoreStore()

// 從路由參數獲取店家 id
const storeId = computed(() => parseInt(route.params.id))

// 從 Pinia store 獲取店家數據
const storeDetail = computed(() => {
  return storeStore.getStoreById(storeId.value)
})

// Swiper 模組
const modules = [Pagination]

// 優惠活動輪播實例和索引
const promotionSwiper = ref(null)
const promotionIndex = ref(0)

// 電子票券輪播實例和索引
const ticketSwiper = ref(null)
const ticketIndex = ref(0)

// 計算電子票券總頁數（桌面版：每頁4張，手機版：每頁2張）
const ticketTotalPages = computed(() => {
  if (!storeDetail.value?.tickets || storeDetail.value.tickets.length === 0) return 0
  // 桌面版每頁4張
  const desktopTotal = Math.ceil(storeDetail.value.tickets.length / 4)
  return desktopTotal > 0 ? desktopTotal : 1
})

// 計算手機版電子票券總頁數（每頁2張）
const mobileTicketTotalPages = computed(() => {
  if (!storeDetail.value?.tickets || storeDetail.value.tickets.length === 0) return 0
  const total = Math.ceil(storeDetail.value.tickets.length / 2)
  return total > 0 ? total : 1
})

// 頁面載入時滾動到頂部
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.store-detail-view {
  min-height: 100vh;
  background: #fffefd;
}

/* 大卡片 */
.store-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 上半部：圖片 */
.store-image-section {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
}

.store-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 下半部：內容 */
.store-content-section {
  padding: 40px;
}

/* 店家基本信息 */
.store-header {
  margin-bottom: 24px;
}

.store-name {
  font-size: 32px;
  font-weight: 400;
  color: #333;
  margin: 0 0 8px 0;
}

.store-category {
  font-size: 16px;
  color: #666;
  margin: 0 0 16px 0;
}

.store-meta {
  display: flex;
  align-items: center;
  gap: 24px;
}

.rating {
  color: #f59e0b;
  font-weight: 500;
  font-size: 16px;
}

.distance {
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
}

.location-icon {
  width: 18px;
  height: 18px;
  color: #666;
}

/* 聯絡信息 */
.store-contact {
  padding: 0px;
  margin-bottom: 32px;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.contact-label {
  font-weight: 200;
  color: #666;
  min-width: 80px;
}

.contact-value {
  font-weight: 200;
  color: #333;
  text-align: right;
  flex: 1;
}

/* 區塊樣式 */
.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin: 0 0 20px 0;
}

.section-content {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  white-space: pre-line;
}

/* 優惠使用說明 */
.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.instruction-item {
  padding: 12px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  position: relative;
  padding-left: 20px;
}

.instruction-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000;
  font-weight: bold;
}

/* 輪播容器 */
.carousel-wrapper {
  margin-bottom: 20px;
}

/* 優惠活動卡片 */
.promotion-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 130px;
  height: auto;
  width: 100%;
  max-width: 580px;
  padding: 12px;
  gap: 12px;
  transition: border-color 0.3s ease;
}

.promotion-card:hover {
  border-color: #f78a01;
}

.promotion-image {
  width: 120px;
  height: 120px;
  min-height: 106px;
  align-self: stretch;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 12px;
}

.promotion-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  gap: 8px;
  min-height: 0;

}

.promotion-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.promotion-condition {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.promotion-validity {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.promotion-button {
  align-self: flex;
  text-align: center;
  margin-top: auto;
  padding: 4px 24px;
  background: #fef3e6;
  color: #f78b0d;
  border: 1px solid #fbd4a3;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.promotion-button:hover {
  background: #fbd4a3;
  color: #f78b0d;
}

/* 電子票券卡片連結 */
.ticket-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

/* 電子票券卡片 */
.ticket-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 340px;
  width: 100%;
  max-width: 200px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.ticket-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.ticket-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ticket-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f78a01;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.ticket-content {
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  min-height: 140px;
}

.ticket-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.4;
  flex-shrink: 0;
}

.ticket-points {
  font-size: 18px;
  font-weight: 600;
  color: #f78a01;
  margin: auto 0 0 0;
  flex-shrink: 0;
}

/* Swiper 樣式調整 */
.promotion-swiper,
.ticket-swiper {
  padding-bottom: 40px;
}

.ticket-swiper :deep(.swiper-slide) {
  width: auto !important;
}

/* ========== 手機版樣式 ========== */
.store-detail-mobile {
  width: 100%;
  background: white;
}

/* 手機版圖片區域 */
.mobile-image-section {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.mobile-store-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 手機版內容區域 */
.mobile-content-section {
  padding: 20px 16px;
}

/* 手機版店家基本信息 */
.mobile-store-header {
  margin-bottom: 20px;
}

.mobile-store-name {
    font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  }

.mobile-store-category {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.mobile-store-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-rating {
  color: #f59e0b;
  font-weight: 500;
  font-size: 14px;
}

.mobile-distance {
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.mobile-location-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

/* 手機版聯絡信息 */
.mobile-store-contact {
  padding: 0;
  margin-bottom: 24px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
}

.mobile-contact-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.mobile-contact-label {
  font-weight: 400;
  color: #666;
  min-width: 70px;
  font-size: 14px;
}

.mobile-contact-value {
  font-weight: 400;
  color: #333;
  text-align: right;
  flex: 1;
  font-size: 14px;
}

/* 手機版區塊樣式 */
.mobile-section {
  margin-bottom: 32px;
}

.mobile-section-title {
    font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  }

.mobile-section-content {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  white-space: pre-line;
}

/* 手機版優惠使用說明 */
.mobile-instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-instruction-item {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  position: relative;
  padding-left: 18px;
}

.mobile-instruction-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000;
  font-weight: bold;
}

/* 手機版輪播容器 */
.mobile-carousel-wrapper {
  margin-bottom: 16px;
}

/* 手機版優惠活動卡片 */
.mobile-promotion-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 120px;
  height: auto;
  width: 100%;
  padding: 10px;
  gap: 10px;
}

.mobile-promotion-image {
  width: 100px;
  height: 100px;
  min-height: 100px;
  align-self: stretch;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 8px;
}

.mobile-promotion-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  gap: 6px;
  min-height: 0;
}

.mobile-promotion-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.mobile-promotion-condition {
  font-size: 12px;
  color: #666;
  margin: 0;
    }

.mobile-promotion-validity {
  font-size: 11px;
  color: #999;
  margin: 0;
  }

.mobile-promotion-button {
  align-self: flex-start;
  text-align: center;
  margin-top: auto;
  padding: 6px 20px;
  background: #fef3e6;
  color: #f78b0d;
  border: 1px solid #fbd4a3;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
  text-decoration: none;
  display: inline-block;
}

.mobile-promotion-button:hover {
  background: #fbd4a3;
  color: #f78b0d;
}

/* 手機版電子票券卡片連結 */
.mobile-ticket-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

/* 手機版電子票券卡片 */
.mobile-ticket-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 100%;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.mobile-ticket-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.mobile-ticket-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
}

.mobile-ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.mobile-ticket-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #f78a01;
  color: white;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.mobile-ticket-content {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  min-height: 120px;
}

.mobile-ticket-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
  flex-shrink: 0;
    }

.mobile-ticket-points {
  font-size: 16px;
  font-weight: 600;
  color: #f78a01;
  margin: auto 0 0 0;
  flex-shrink: 0;
}

/* 手機版 Swiper 樣式 */
.mobile-promotion-swiper,
.mobile-ticket-swiper {
  padding-bottom: 40px;
}

.mobile-promotion-swiper :deep(.swiper-slide),
.mobile-ticket-swiper :deep(.swiper-slide) {
  width: auto !important;
}
</style>

