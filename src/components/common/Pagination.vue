<template>
  <div class="pagination-container" style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
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

    <div v-if="showJump" class="pagination-jump">
      <span>跳至</span>
      <input
        v-model.number="jumpPage"
        type="number"
        :min="1"
        :max="totalPages"
        class="jump-input"
        placeholder="頁"
        @keyup.enter="handleJump"
      />
      <span>頁</span>
      <button class="jump-button" @click="handleJump">確定</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定義組件名稱（多詞命名，符合 Vue 規範）
defineOptions({
  name: 'PaginationBar'
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
  },
  showJump: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['page-change'])

const jumpPage = ref(null)

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

const handleJump = () => {
  if (jumpPage.value && jumpPage.value >= 1 && jumpPage.value <= props.totalPages) {
    emit('page-change', jumpPage.value)
    jumpPage.value = null
  }
}
</script>

<style scoped>
/* 分頁組件 */
.pagination-container {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
  width: 100%;
}

.pagination-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  flex-shrink: 0;
}

.pagination-arrow:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.pagination-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pagination-page:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.pagination-page.active {
  background: #f97316;
  border-color: #f97316;
  color: white;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

/* 手機版：跳轉選擇器換行顯示 */
@media (max-width: 768px) {
  .pagination-jump {
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
    justify-content: center;
  }
}

.jump-input {
  width: 60px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  text-align: center;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.jump-input:focus {
  border-color: #f97316;
}

.jump-button {
  padding: 8px 20px;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.jump-button:hover {
  background: #ea580c;
}
</style>

