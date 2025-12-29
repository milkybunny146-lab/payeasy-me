import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', () => {
  // 票券配置映射表
  const tickets = {
    1: {
      id: 1,
      title: 'Subway信義店',
      description: 'PayEasy大吉大利套餐',
      points: 350,
      image: 'https://picsum.photos/seed/ticket1/800/600',
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
      image: 'https://picsum.photos/seed/ticket2/800/600',
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
      image: 'https://picsum.photos/seed/ticket3/800/600',
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
      image: 'https://picsum.photos/seed/ticket4/800/600',
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
      image: 'https://picsum.photos/seed/ticket5/800/600',
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
      image: 'https://picsum.photos/seed/ticket6/800/600',
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
    },
    7: {
      id: 7,
      title: '王品牛排雙人套餐券',
      description: '王品牛排雙人套餐券',
      points: 2800,
      image: 'https://picsum.photos/seed/ticket7/800/600',
      detail: {
        title: '王品牛排雙人套餐券',
        pointsPerItem: 2800,
        validPeriod: {
          start: '即日起',
          end: '2025/12/31'
        },
        usageSteps: [
          '使用前請提前3天電話預約',
          '入座時出示電子票券QR Code',
          '每次限用一張',
          '不可與其他優惠併用'
        ],
        terms: [
          '特殊節日(春節、情人節、母親節等)不適用',
          '午餐時段不適用,僅供晚餐使用',
          '本券使用完畢後,不找零、不可兌換現金',
          '店家保留活動修改、暫停或終止之權利'
        ]
      }
    },
    8: {
      id: 8,
      title: '王品牛排單人套餐券',
      description: '王品牛排單人套餐券',
      points: 1500,
      image: 'https://picsum.photos/seed/ticket7/800/600',
      detail: {
        title: '王品牛排單人套餐券',
        pointsPerItem: 1500,
        validPeriod: {
          start: '即日起',
          end: '2025/12/31'
        },
        usageSteps: [
          '使用前請提前3天電話預約',
          '入座時出示電子票券QR Code',
          '每次限用一張',
          '不可與其他優惠併用'
        ],
        terms: [
          '特殊節日(春節、情人節、母親節等)不適用',
          '午餐時段不適用,僅供晚餐使用',
          '本券使用完畢後,不找零、不可兌換現金',
          '店家保留活動修改、暫停或終止之權利'
        ]
      }
    },
    9: {
      id: 9,
      title: '王品牛排家庭四人套餐',
      description: '王品牛排家庭四人套餐',
      points: 5200,
      image: 'https://picsum.photos/seed/ticket7/800/600',
      detail: {
        title: '王品牛排家庭四人套餐',
        pointsPerItem: 5200,
        validPeriod: {
          start: '即日起',
          end: '2025/12/31'
        },
        usageSteps: [
          '使用前請提前3天電話預約',
          '入座時出示電子票券QR Code',
          '每次限用一張',
          '不可與其他優惠併用'
        ],
        terms: [
          '特殊節日(春節、情人節、母親節等)不適用',
          '午餐時段不適用,僅供晚餐使用',
          '本券使用完畢後,不找零、不可兌換現金',
          '店家保留活動修改、暫停或終止之權利'
        ]
      }
    },
    10: {
      id: 10,
      title: '王品牛排和牛雙人套餐券',
      description: '王品牛排和牛雙人套餐券',
      points: 4500,
      image: 'https://picsum.photos/seed/ticket7/800/600',
      detail: {
        title: '王品牛排和牛雙人套餐券',
        pointsPerItem: 4500,
        validPeriod: {
          start: '即日起',
          end: '2025/12/31'
        },
        usageSteps: [
          '使用前請提前3天電話預約',
          '入座時出示電子票券QR Code',
          '每次限用一張',
          '不可與其他優惠併用'
        ],
        terms: [
          '特殊節日(春節、情人節、母親節等)不適用',
          '午餐時段不適用,僅供晚餐使用',
          '本券使用完畢後,不找零、不可兌換現金',
          '店家保留活動修改、暫停或終止之權利'
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

