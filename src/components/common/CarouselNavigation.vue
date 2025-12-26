<template>
  <div class="carousel-navigation">
    <!-- 左側導航按鈕 -->
    <button
      v-if="showNavigation"
      class="nav-button nav-prev"
      :class="{ 'nav-disabled': isBeginning }"
      :disabled="isBeginning"
      @click="$emit('prev')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <!-- 右側導航按鈕 -->
    <button
      v-if="showNavigation"
      class="nav-button nav-next"
      :class="{ 'nav-disabled': isEnd }"
      :disabled="isEnd"
      @click="$emit('next')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- 分頁指示器 -->
    <div v-if="showPagination && totalSlides > 0" class="pagination-wrapper" :class="paginationClass">
      <span
        v-for="index in totalSlides"
        :key="index"
        class="pagination-bullet"
        :class="{ 'pagination-bullet-active': currentIndex === index - 1 }"
        @click="$emit('go-to', index - 1)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'CarouselNavigation'
})

const props = defineProps({
  // 是否顯示導航按鈕
  showNavigation: {
    type: Boolean,
    default: true
  },
  // 是否顯示分頁指示器
  showPagination: {
    type: Boolean,
    default: true
  },
  // 當前索引
  currentIndex: {
    type: Number,
    default: 0
  },
  // 總頁數
  totalSlides: {
    type: Number,
    required: true
  },
  // 是否在開始位置
  isBeginning: {
    type: Boolean,
    default: false
  },
  // 是否在結束位置
  isEnd: {
    type: Boolean,
    default: false
  },
  // 分頁指示器樣式：'custom' (長條形) 或 'swiper' (圓形)
  paginationStyle: {
    type: String,
    default: 'custom',
    validator: (value) => ['custom', 'swiper'].includes(value)
  }
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['prev', 'next', 'go-to'])

const paginationClass = computed(() => {
  return {
    'pagination-custom': props.paginationStyle === 'custom',
    'pagination-swiper': props.paginationStyle === 'swiper'
  }
})
</script>

<style scoped>
.carousel-navigation {
  position: relative;
}

/* 導航按鈕 */
.nav-button {
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
}

.nav-button:hover:not(.nav-disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: #f5f5f5;
}

.nav-prev {
  left: -24px;
}

.nav-next {
  right: -24px;
}

.nav-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-disabled:hover {
  cursor: not-allowed;
}

/* 分頁指示器容器 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  z-index: 10;
  pointer-events: all;
}

.pagination-wrapper.pagination-custom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.pagination-wrapper.pagination-swiper {
  position: relative;
}

/* 自訂分頁指示器（長條形） */
.pagination-custom .pagination-bullet {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-custom .pagination-bullet:hover {
  background: #9ca3af;
}

.pagination-custom .pagination-bullet-active {
  width: 32px;
  background: #f97316;
}

/* Swiper 樣式的分頁指示器（圓形） */
.pagination-swiper .pagination-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-swiper .pagination-bullet:hover {
  background: #999;
}

.pagination-swiper .pagination-bullet-active {
  background: #f78a01;
  width: 24px;
  border-radius: 4px;
}
</style>

