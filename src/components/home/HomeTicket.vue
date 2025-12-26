<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <!-- 標題區域 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-black">熱門票券</h2>
      </div>

      <!-- 票券列表 -->
      <div class="grid grid-cols-2 gap-6">
        <router-link
          v-for="ticket in ticketList"
          :key="ticket.id"
          :to="`/ticket/${ticket.id}`"
          class="reward-card-link"
        >
          <el-card
            class="reward-card"
            shadow="hover"
            :body-style="{ padding: '0' }"
          >
            <div class="card-content">
              <el-avatar :size="80" shape="square" :src="ticket.image" class="card-avatar" />
              <div class="info">
                <span class="title">{{ ticket.title }}</span>
                <span class="subtitle">{{ ticket.description }}</span>
              </div>
              <div class="points-badge">
                <span class="points">{{ ticket.points }}積分</span>
                <el-button
                  type="warning"
                  size="small"
                  round
                  class="redeem-btn"
                  @click.prevent="handleRedeem(ticket)"
                >
                  兌換
                </el-button>
              </div>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'

const router = useRouter()
const ticketStore = useTicketStore()

// 從 Pinia store 獲取票券列表
const ticketList = computed(() => {
  return ticketStore.getTicketList()
})

const handleRedeem = (ticket) => {
  // 跳轉到票券詳情頁
  router.push(`/ticket/${ticket.id}`)
}
</script>

<style scoped>
.reward-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.reward-card {
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  background-color: #fffefd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reward-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.card-content {
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  min-height: 120px;
}

.card-avatar {
  flex-shrink: 0;
  border-radius: 15px;
  margin: 16px;
  align-self: center;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  padding: 16px 0;
  position: relative;
  align-self: center;
}

.card-content::before {
  content: '';
  position: absolute;
  right: 140px;
  top: 0;
  bottom: 50%;
  margin-bottom: 10px;
  width: 1px;
  background-image: repeating-linear-gradient(
    to bottom,
    #d4a574 0px,
    #d4a574 5px,
    transparent 5px,
    transparent 7px
  );
  z-index: 1;
}

.card-content::after {
  content: '';
  position: absolute;
  right: 140px;
  top: 50%;
  margin-top: 10px;
  bottom: 0;
  width: 1px;
  background-image: repeating-linear-gradient(
    to bottom,
    #d4a574 0px,
    #d4a574 5px,
    transparent 5px,
    transparent 7px
  );
  z-index: 1;
}

.title {
  font-size: 19px;
  font-weight: 440;
  color: #333;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.subtitle {
  font-size: 15px;
  font-weight: 400;
  color: #666;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.points-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  background: #ffd700;
  padding: 16px 20px;
  border-radius: 0 12px 12px 0;
  width: 140px;
  justify-content: center;
  position: relative;
  align-self: stretch;
}

.points-badge::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 19px;
  height: 28px;
  background: #fffefd;
  border-radius: 50%;
  margin-left: -10px;
  z-index: 2;
}

.points {
  font-size: 30px;
  font-weight: 300;
  color: #333;
  white-space: nowrap;
}

.redeem-btn {
  transition: all 0.3s ease;
  width: 95px;
  height: 38px;
  background-color: white !important;
  border-color: white !important;
  color: #333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.redeem-btn:hover {
  background-color: #f7f6f5 !important;
  border-color: #f7f6f5 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}
</style>

