<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="handleClose">
        <div class="modal-container">
          <!-- 標題和關閉按鈕 -->
          <div class="modal-header">
            <h2 class="modal-title">登入</h2>
            <button class="close-button" @click="handleClose">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 表單內容 -->
          <form @submit.prevent="handleLogin" class="modal-form">
            <!-- 帳號輸入框 -->
            <div class="input-group">
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                v-model="form.account"
                type="text"
                placeholder="請輸入會員帳號"
                class="input-field"
                required
              />
            </div>

            <!-- 密碼輸入框 -->
            <div class="input-group">
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="請輸入密碼"
                class="input-field"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <template v-if="showPassword">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </template>
                  <template v-else>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </template>
                </svg>
              </button>
            </div>

            <!-- 登入按鈕 -->
            <button type="submit" class="login-button">
              登入
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'LoginModal'
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'close'])

const form = ref({
  account: '',
  password: ''
})

const showPassword = ref(false)

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleLogin = () => {
  // 這裡可以添加登入邏輯
  console.log('登入:', form.value)
  // 登入成功後關閉模態框
  handleClose()
}

// 當模態框關閉時重置表單
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    form.value = {
      account: '',
      password: ''
    }
    showPassword.value = false
  }
})
</script>

<style scoped>
/* 背景遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* 模態框容器 */
.modal-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

/* 標題和關閉按鈕 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

/* 表單 */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 輸入框組 */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 0 16px;
  height: 48px;
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-right: 12px;
  flex-shrink: 0;
}

.input-field {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #333;
}

.input-field::placeholder {
  color: #999;
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #666;
}

/* 登入按鈕 */
.login-button {
  width: 100%;
  height: 48px;
  background: #f78a01;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 8px;
}

.login-button:hover {
  background: #e66a00;
}

.login-button:active {
  transform: scale(0.98);
}

/* 過渡動畫 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
  opacity: 0;
}
</style>

