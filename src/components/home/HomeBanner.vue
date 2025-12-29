<template>
  <div class="w-full flex justify-center px-4 py-4 md:px-10 md:py-8">
    <div class="max-w-7xl w-full">
      <img
        src="/PayEasy.png"
        alt="PayEasy特約好康"
        class="w-full object-cover rounded-[10px] shadow-lg banner-image"
      />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 手機版：加長加寬圖片 */
@media (max-width: 768px) {
  .banner-image {
    width: 100%;
    height: auto;
    min-height: 200px; /* 確保手機版有足夠高度 */
  }
}

/* 桌面版：保持原有設計 */
@media (min-width: 768px) {
  .banner-image {
    width: 100%;
    height: auto;
  }
}
</style>

