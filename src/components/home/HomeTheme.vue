<template>
  <div class="w-full flex justify-center px-4 py-8 md:px-4 md:py-6">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-xl md:text-2xl font-[350] text-black">主題推薦</h2>
        <!-- 手機版頁面指示器 -->
        <div class="md:hidden text-sm text-gray-600">
          {{ mobileCurrentIndex + 1 }}/{{ mobilePages.length }}
        </div>
      </div>

      <div class="relative">
      <!-- 桌面版 Swiper 輪播 -->
      <div class="hidden md:block">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="24"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          class="category-swiper"
        >
        <SwiperSlide v-for="(page, pageIndex) in pages" :key="pageIndex">
          <div class="cards-container">
            <!-- 左半邊大卡片 -->
            <section class="big-card-section">
              <div class="big-card">
                <router-link :to="`/theme/${getThemeId(page.left.category.name)}`" class="big-card-image-wrapper">
                  <img :src="page.left.category.image" :alt="page.left.category.name" class="big-card-image" />
                  <!-- 遮罩放在圖片容器內部 -->
                  <div class="big-card-overlay">
                    <h3 class="big-card-title">{{ page.left.category.name }}</h3>
                    <span class="big-card-count">{{ page.left.category.count }}個店家</span>
                  </div>
                </router-link>
                <div class="shops-container">
                  <div v-for="shop in page.left.shops" :key="shop.id" class="shop-card group">
                    <div class="shop-image-wrapper">
                      <img
                        :src="shop.image"
                        :alt="shop.name"
                        class="shop-image"
                      />
                    </div>
                    <div class="shop-info">
                      <h4 class="shop-name">{{ shop.name }}</h4>
                      <span class="shop-category">{{ shop.category }}</span>
                      <div class="meta">
                        <span class="rating">★ {{ shop.rating }}</span>
                        <span class="distance">
                          <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {{ shop.distance }}
                        </span>
                      </div>
                    </div>
          </div>
        </div>
      </div>
            </section>

            <!-- 右半邊大卡片 -->
            <section class="big-card-section">
              <div class="big-card">
                <router-link :to="`/theme/${getThemeId(page.right.category.name)}`" class="big-card-image-wrapper">
                  <img :src="page.right.category.image" :alt="page.right.category.name" class="big-card-image" />
                  <!-- 遮罩放在圖片容器內部 -->
                  <div class="big-card-overlay">
                    <h3 class="big-card-title">{{ page.right.category.name }}</h3>
                    <span class="big-card-count">{{ page.right.category.count }}個店家</span>
                  </div>
                </router-link>
                <div class="shops-container">
                  <div v-for="shop in page.right.shops" :key="shop.id" class="shop-card group">
                    <div class="shop-image-wrapper">
                      <img
                        :src="shop.image"
                        :alt="shop.name"
                        class="shop-image"
                      />
                    </div>
                    <div class="shop-info">
                      <h4 class="shop-name">{{ shop.name }}</h4>
                      <span class="shop-category">{{ shop.category }}</span>
          <div class="meta">
                        <span class="rating">★ {{ shop.rating }}</span>
                        <span class="distance">
                          <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {{ shop.distance }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide>
        </Swiper>
      </div>

      <!-- 手機版 Swiper 輪播 -->
      <div class="md:hidden">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="16"
          @swiper="onMobileSwiper"
          @slideChange="onMobileSlideChange"
          class="category-swiper"
        >
        <SwiperSlide v-for="(card, cardIndex) in mobilePages" :key="cardIndex">
          <div class="mobile-big-card">
            <router-link :to="`/theme/${getThemeId(card.category.name)}`" class="mobile-big-card-image-wrapper">
              <img :src="card.category.image" :alt="card.category.name" class="mobile-big-card-image" />
              <div class="mobile-big-card-overlay">
                <h3 class="mobile-big-card-title">{{ card.category.name }}</h3>
                <span class="mobile-big-card-count">{{ card.category.count }}個店家</span>
              </div>
            </router-link>
            <div class="mobile-shops-container">
              <div v-for="shop in card.shops" :key="shop.id" class="mobile-shop-card">
                <div class="mobile-shop-image-wrapper">
                  <img :src="shop.image" :alt="shop.name" class="mobile-shop-image" />
                </div>
                <div class="mobile-shop-info">
                  <h4 class="mobile-shop-name">{{ shop.name }}</h4>
                  <span class="mobile-shop-category">{{ shop.category }}</span>
                  <div class="mobile-meta">
                    <span class="mobile-rating">★ {{ shop.rating }}</span>
                    <span class="mobile-distance">
                      <svg xmlns="http://www.w3.org/2000/svg" class="mobile-location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ shop.distance }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        </Swiper>
      </div>

      <!-- 桌面版輪播導航組件 -->
      <div class="hidden md:block">
        <CarouselNavigation
          :current-index="currentIndex"
          :total-slides="pages.length"
          :is-beginning="isBeginning"
          :is-end="isEnd"
          pagination-style="custom"
          class="theme-carousel-nav"
          @prev="slidePrev"
          @next="slideNext"
          @go-to="goToSlide"
        />
      </div>

      <!-- 手機版輪播導航組件 -->
      <div class="md:hidden">
        <CarouselNavigation
          :current-index="mobileCurrentIndex"
          :total-slides="mobilePages.length"
          :is-beginning="mobileIsBeginning"
          :is-end="mobileIsEnd"
          :show-navigation="false"
          :show-pagination="true"
          pagination-style="custom"
          class="mobile-carousel-nav"
          @go-to="goToMobileSlide"
        />
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import CarouselNavigation from '@/components/common/CarouselNavigation.vue'

// 主題名稱到 ID 的映射
const getThemeId = (name) => {
  const themeMap = {
    '美食饗宴': 'cuisine',
    '美味甜點': 'dessert',
    '咖啡飲品': 'coffee',
    '日式料理': 'japanese',
    '健康輕食': 'healthy',
    '異國風味': 'world',
    '生活家居': 'home',
    '休閒娛樂': 'entertainment',
    '時尚服飾': 'fashion',
    '運動健身': 'fitness'
  }
  return themeMap[name] || 'cuisine'
}

// 桌面版 Swiper
const swiperInstance = ref(null)
const currentIndex = ref(0)
const isBeginning = ref(true)
const isEnd = ref(false)

// 手機版 Swiper
const mobileSwiperInstance = ref(null)
const mobileCurrentIndex = ref(0)
const mobileIsBeginning = ref(true)
const mobileIsEnd = ref(false)

// 將桌面版數據轉換為手機版（每張卡片獨立一頁）
const mobilePages = computed(() => {
  const result = []
  pages.value.forEach(page => {
    result.push(page.left)
    result.push(page.right)
  })
  return result
})

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
  // 恢復保存的輪播頁索引
  const savedIndex = sessionStorage.getItem('homeThemeSlideIndex')
  if (savedIndex !== null) {
    nextTick(() => {
      swiper.slideTo(parseInt(savedIndex, 10))
    })
  }
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    currentIndex.value = swiperInstance.value.activeIndex
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
    // 保存當前輪播頁索引
    sessionStorage.setItem('homeThemeSlideIndex', currentIndex.value.toString())
  }
}

const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}

const slideNext = () => {
  swiperInstance.value?.slideNext()
}

const goToSlide = (index) => {
  swiperInstance.value?.slideTo(index)
}

// 手機版 Swiper 事件處理
const onMobileSwiper = (swiper) => {
  mobileSwiperInstance.value = swiper
}

const onMobileSlideChange = () => {
  if (mobileSwiperInstance.value) {
    mobileCurrentIndex.value = mobileSwiperInstance.value.activeIndex
    mobileIsBeginning.value = mobileSwiperInstance.value.isBeginning
    mobileIsEnd.value = mobileSwiperInstance.value.isEnd
  }
}

const goToMobileSlide = (index) => {
  mobileSwiperInstance.value?.slideTo(index)
}

// 三頁資料
const pages = ref([
  {
    left: {
      category: { name: '美食饗宴', count: 12, image: 'https://tb-static.uber.com/prod/image-proc/processed_images/1b22e7fa06c151ff897f79eeb6717c72/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg' },
      shops: [
        { id: 1, name: '築間幸福鍋物', category: '美食 > 火鍋', rating: 4.5, distance: '1.2km', image: 'https://picsum.photos/seed/hometheme-hotpot/800/600' },
        { id: 2, name: '欣葉台菜', category: '美食 > 台菜', rating: 4.8, distance: '2.5km', image: 'https://picsum.photos/seed/hometheme-food/800/600' },
        { id: 3, name: '饗食天堂', category: '美食 > 吃到飽', rating: 4.3, distance: '3.1km', image: 'https://picsum.photos/seed/hometheme-paradise/800/600' }
      ]
    },
    right: {
      category: { name: '美味甜點', count: 16, image: 'https://picsum.photos/seed/hometheme-dessert/800/600' },
      shops: [
        { id: 4, name: 'Lady M', category: '甜點 > 蛋糕', rating: 4.6, distance: '0.8km', image: 'https://picsum.photos/seed/hometheme-ladym/800/600' },
        { id: 5, name: 'Häagen-Dazs', category: '甜點 > 冰淇淋', rating: 4.5, distance: '1.5km', image: 'https://picsum.photos/seed/hometheme-haagen/800/600' },
        { id: 6, name: '春水堂', category: '甜點 > 珍珠奶茶', rating: 4.4, distance: '1.1km', image: 'https://picsum.photos/seed/hometheme-bubble/800/600' }
      ]
    }
  },
  {
    left: {
      category: { name: '生活家居', count: 15, image: 'https://accuratemedsupply.com/wp-content/uploads/2022/09/Bathing-and-Grooming-Side-Image.webp' },
      shops: [
        { id: 7, name: 'HOLA', category: '家居 > 生活百貨', rating: 4.4, distance: '2.58m', image: 'data:image/jpeg;base64,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' },
        { id: 8, name: '特力屋', category: '家居 > 五金工具', rating: 4.1, distance: '3.5km', image: 'data:image/jpeg;base64,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' },
        { id: 9, name: '生活工廠', category: '家居 > 生活雜貨', rating: 4.5, distance: '1.9km', image: 'data:image/jpeg;base64,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' }
      ]
    },
    right: {
      category: { name: '休閒娛樂', count: 20, image: 'https://filmzie.com/blog/wp-content/uploads/2024/01/FREE-MOVING-STREAMING-1024x576.jpg' },
      shops: [
        { id: 10, name: '威秀影城', category: '娛樂 > 電影院', rating: 4.7, distance: '1.6km', image: 'data:image/jpeg;base64,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' },
        { id: 11, name: '錢櫃KTV', category: '娛樂 > KTV', rating: 4.3, distance: '2.8km', image: 'data:image/jpeg;base64,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' },
        { id: 12, name: '湯姆熊', category: '娛樂 > 遊樂場', rating: 4.2, distance: '3.2km', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7Vf6_MnWR5OUJvN6kUOSvDstqc8Pr7YHL5XKJYnK7UhSWDrwOjMb2ps2z1aVb4kQU7Q&usqp=CAU' }
      ]
    }
  },
  {
    left: {
      category: { name: '時尚服飾', count: 18, image: 'https://s3-media0.fl.yelpcdn.com/bphoto/MXSnI_vXMrLGgN8akqQ2tQ/1000s.jpg' },
      shops: [
        { id: 13, name: 'UNIQLO', category: '服飾 > 休閒服飾', rating: 4.6, distance: '1.8km', image: 'data:image/jpeg;base64,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' },
        { id: 14, name: 'ZARA', category: '服飾 > 時尚服飾', rating: 4.4, distance: '2.2km', image: 'data:image/jpeg;base64,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' },
        { id: 15, name: 'NET', category: '服飾 > 平價服飾', rating: 4.2, distance: '1.5km', image: 'data:image/jpeg;base64,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' }
      ]
    },
    right: {
      category: { name: '運動健身', count: 14, image: 'https://heho.com.tw/wp-content/uploads/2020/08/b16e247cdda9bc0d50947be19d4cd4b5.jpg' },
      shops: [
        { id: 16, name: '瓦城', category: '健身 > 健身房', rating: 4.7, distance: '0.9km', image: 'https://heho.com.tw/wp-content/uploads/2020/08/b16e247cdda9bc0d50947be19d4cd4b5.jpg' },
        { id: 17, name: 'Nike', category: '運動 > 運動用品', rating: 4.6, distance: '2.1km', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop' },
        { id: 18, name: 'Adidas', category: '運動 > 運動用品', rating: 4.7, distance: '4.5km', image: 'data:image/jpeg;base64,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' }
      ]
    }
  }
])
</script>

<style scoped>

/* 卡片容器 */
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.big-card-section {
  width: 100%;
}

.big-card {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.big-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* 大卡片圖片容器 - 使用 position relative 讓遮罩定位在內部 */
.big-card-image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  flex-shrink: 0;
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.big-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 遮罩貼齊圖片底部 */
.big-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px 24px 24px 24px;
  color: white;
  pointer-events: none;
}

.big-card-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.big-card-count {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

/* 店家卡片容器 */
.shops-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  padding-bottom: 8px;
}

.shop-card {
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

/* 店家圖片容器 - 固定高度並處理 hover 放大 */
.shop-image-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 12px;
}

.shop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.shop-card:hover .shop-image {
  transform: scale(1.1);
}

.shop-info {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
}

.shop-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.shop-category {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.rating {
  color: #f59e0b;
  font-weight: 500;
}

.distance {
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.location-icon {
  width: 14px;
  height: 14px;
  color: #666;
  flex-shrink: 0;
}

/* Swiper 樣式覆寫 - 隱藏溢出內容 */
.category-swiper {
  overflow: hidden;
  padding-bottom: 50px;
}

:deep(.swiper-slide) {
  height: auto;
}

/* 手機版大卡片 */
.mobile-big-card {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mobile-big-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.mobile-big-card-image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  flex-shrink: 0;
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.mobile-big-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-big-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 24px 16px 16px 16px;
  color: white;
  pointer-events: none;
}

.mobile-big-card-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: white;
}

.mobile-big-card-count {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

/* 手機版店家容器 */
.mobile-shops-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 12px;
  padding-bottom: 8px;
}

.mobile-shop-card {
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.mobile-shop-image-wrapper {
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
}

.mobile-shop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.mobile-shop-card:hover .mobile-shop-image {
  transform: scale(1.1);
}

.mobile-shop-info {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
}

.mobile-shop-name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin: 0 0 2px 0;
  line-height: 1.3;
}

.mobile-shop-category {
  font-size: 10px;
  color: #666;
  margin-bottom: 4px;
  line-height: 1.3;
}

.mobile-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
}

.mobile-rating {
  color: #f59e0b;
  font-weight: 500;
}

.mobile-distance {
  color: #666;
  display: flex;
  align-items: center;
  gap: 2px;
}

.mobile-location-icon {
  width: 10px;
  height: 10px;
  color: #666;
  flex-shrink: 0;
}

/* 手機版輪播導航 */
.mobile-carousel-nav {
  position: relative;
  margin-top: 16px;
}

/* 輪播導航按鈕定位 - 相對於卡片容器 */
.theme-carousel-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.theme-carousel-nav :deep(.nav-button) {
  pointer-events: all;
  top: 50%;
  transform: translateY(-50%);
}

.theme-carousel-nav :deep(.nav-prev) {
  left: -24px;
}

.theme-carousel-nav :deep(.nav-next) {
  right: -24px;
}

.theme-carousel-nav :deep(.pagination-wrapper) {
  pointer-events: all;
}
</style>
