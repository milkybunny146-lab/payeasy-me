<template>
  <transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top-button"
      aria-label="回到頂部"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'ScrollToTop'
})

const isVisible = ref(false)
const scrollThreshold = 300 // 滾動超過 300px 時顯示按鈕

// 監聽滾動事件
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isVisible.value = scrollTop > scrollThreshold
}

// 平滑滾動到頂部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化檢查
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top-button {
  position: fixed;
  right: 24px;
  bottom: 80px;
  width: 48px;
  height: 48px;
  background-color: #f97316; /* orange-500 */
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  z-index: 1000;
}

.scroll-to-top-button:hover {
  background-color: #ea580c; /* orange-600 */
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.scroll-to-top-button:active {
  transform: translateY(0);
}

/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

