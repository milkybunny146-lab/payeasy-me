<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <h2 class="text-2xl font-bold text-black mb-6">特約店家</h2>
      
      <!-- 使用 v-for 循環渲染卡片 -->
      <div class="stores-grid">
        <StoreCard
          v-for="store in stores"
          :key="store.id"
          :store="store"
          @coupon-click="handleCouponClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StoreCard from './StoreCard.vue'

const stores = ref([
  {
    id: 1,
    name: '王品牛排 台北信義店',
    category: '美食 > 連鎖餐廳',
    rating: 4.5,
    distance: '1.2km',
    image: '/theme/wangsteak.jpg',
    coupon: '平日午餐9折優惠券'
  },
  {
    id: 2,
    name: '屈臣氏 忠孝復興門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: '0.8km',
    image: '/theme/watsons.jpg',
    coupon: '滿千送百購物金'
  },
  {
    id: 3,
    name: '誠品書店 信義旗艦店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.7,
    distance: '1.5km',
    image: '/theme/eslite.jpg',
    coupon: '會員專屬折價券'
  },
  {
    id: 4,
    name: 'NET 西門門市',
    category: '服飾配件 > 服飾店',
    rating: 4.2,
    distance: '2.3km',
    image: '/theme/net.jpg',
    coupon: '新品上市優惠券'
  }
])

const handleCouponClick = (store) => {
  console.log('點擊優惠券:', store.name, store.coupon)
  // 這裡可以添加跳轉到優惠券詳情頁面的邏輯
}
</script>

<style scoped>
.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>

