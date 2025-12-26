<template>
  <router-link :to="`/store/${store.id}`" class="store-card">
    <div class="store-image-wrapper">
      <img
        :src="store.image"
        :alt="store.name"
        class="store-image"
        @error="handleImageError"
        @load="handleImageLoad"
      />
    </div>
    <div class="store-info">
      <h4 class="store-name">{{ store.name }}</h4>
      <span class="store-category">{{ store.category }}</span>
      <div class="meta">
        <div class="rating-wrapper">
          <span class="rating">★ {{ store.rating }}</span>
          <button
            v-if="store.coupon"
            class="coupon-button"
            @click.stop="handleCouponClick"
          >
            {{ store.coupon }}
          </button>
        </div>
        <span class="distance">
          <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ store.distance }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: '',
      category: '',
      rating: 0,
      distance: '',
      image: '',
      coupon: '' // 可選的優惠券文字
    })
  }
})

const emit = defineEmits(['coupon-click'])

const handleCouponClick = (e) => {
  e.preventDefault()
  e.stopPropagation()
  emit('coupon-click', props.store)
}

const handleImageError = (event) => {
  console.error('圖片載入失敗:', props.store.image, event)
  // 可以設置一個默認圖片
  // event.target.src = '/default-image.jpg'
}

const handleImageLoad = () => {
  console.log('圖片載入成功:', props.store.image)
}
</script>

<style scoped>
.store-card {
  background: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.store-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.store-image-wrapper {
  width: 100%;
  height: 210px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  margin-bottom: 12px;
}

.store-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  transform: scale(1);
}

.store-card:hover .store-image {
  transform: scale(1.1);
}

.store-info {
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.store-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.store-category {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  margin: 4px 0;
}

.rating-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
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

.coupon-button {
  padding: 4px 12px;
  background: #fef3e6;
  border: none;
  border-radius: 12px;
  color: #f79d42;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
</style>

