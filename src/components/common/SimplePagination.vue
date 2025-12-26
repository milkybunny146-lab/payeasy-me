<template>
  <div class="pagination-container">
    <button
      class="pagination-arrow"
      :disabled="currentPage === 1"
      @click="handlePrev"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="pagination-page"
      :class="{ active: currentPage === page }"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination-arrow"
      :disabled="currentPage === totalPages"
      @click="handleNext"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'

// 定義組件名稱（多詞命名，符合 Vue 規範）
defineOptions({
  name: 'SimplePaginationBar'
})

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1
  }
})

const emit = defineEmits(['page-change'])

const handlePrev = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}

const handlePageClick = (page) => {
  emit('page-change', page)
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
}

.pagination-arrow,
.pagination-page {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-arrow:disabled,
.pagination-page:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-arrow:hover:not(:disabled),
.pagination-page:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.pagination-page.active {
  background: #f97316;
  border-color: #f97316;
  color: white;
}
</style>

