import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', () => {
  // 票券配置映射表
  const tickets = {
    1: {
      id: 1,
      title: 'Subway信義店',
      description: 'PayEasy大吉大利套餐',
      points: 350,
      image: '/ticket/subway.jpg',
      // 詳情頁數據
      detail: {
        title: 'PayEasy大吉大利套餐',
        pointsPerItem: 350,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '選擇餐點,前往大吉大利堡,選擇您喜愛的滿額套合。',
          '結帳前,結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,NT$125元的折扣將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於大吉大利堡套餐與特定的分店使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    },
    2: {
      id: 2,
      title: '星巴克南京店',
      description: '中杯咖啡兌換券',
      points: 280,
      image: '/ticket/coffee.jpg',
      detail: {
        title: '中杯咖啡兌換券',
        pointsPerItem: 280,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '前往星巴克門市,選擇您喜愛的中杯咖啡。',
          '結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,優惠將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於中杯咖啡與特定的分店使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    },
    3: {
      id: 3,
      title: '威秀影城信義店',
      description: '電影票兌換券',
      points: 420,
      image: '/ticket/theater.jpg',
      detail: {
        title: '電影票兌換券',
        pointsPerItem: 420,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '前往威秀影城,選擇您想觀看的電影場次。',
          '結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,優惠將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於電影票與特定的分店使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    },
    4: {
      id: 4,
      title: '康是美忠孝店',
      description: '購物金兌換券',
      points: 180,
      image: '/ticket/cosmebranch.jpg',
      detail: {
        title: '購物金兌換券',
        pointsPerItem: 180,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '前往康是美門市,選擇您需要的商品。',
          '結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,優惠將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於康是美門市使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    },
    5: {
      id: 5,
      title: 'SPA會館大安店',
      description: '按摩體驗券',
      points: 500,
      image: '/ticket/massage.jpg',
      detail: {
        title: '按摩體驗券',
        pointsPerItem: 500,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '前往SPA會館,選擇您喜愛的按摩服務。',
          '結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,優惠將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於SPA會館大安店使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    },
    6: {
      id: 6,
      title: '家樂福桂林店',
      description: '購物金兌換券',
      points: 280,
      image: '/ticket/carrifourbranch.jpg',
      detail: {
        title: '購物金兌換券',
        pointsPerItem: 280,
        validPeriod: {
          start: '2024/08/21',
          end: '2024/12/31'
        },
        usageSteps: [
          '前往家樂福門市,選擇您需要的商品。',
          '結帳時,告知服務人員您持有 PayEasy 優惠券,並出示優惠券號碼。',
          '輸入優惠碼,如果您使用的是電子優惠券,請在結帳時輸入優惠碼或掃描二維碼。',
          '享受折扣,結帳時,優惠將自動應用於您的總金額。'
        ],
        terms: [
          '此優惠僅限於家樂福桂林店使用。',
          '優惠券不得與其他優惠或促銷活動合併使用。',
          '優惠券一經使用即失效,不可重複使用。',
          '請在有效期限內使用,逾期無效。'
        ]
      }
    }
  }

  // 獲取所有票券列表（用於首頁顯示）
  const getTicketList = () => {
    return Object.values(tickets).map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      points: ticket.points,
      image: ticket.image
    }))
  }

  // 根據 id 獲取票券數據
  const getTicketById = (id) => {
    return tickets[id] || null
  }

  return {
    tickets,
    getTicketList,
    getTicketById
  }
})

