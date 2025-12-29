import { defineStore } from 'pinia'

export const useStoreStore = defineStore('store', () => {
  // 店家詳情數據
  const stores = {
    1: {
      id: 1,
      name: '王品牛排 台北信義店',
      category: '美食 > 連鎖餐廳',
      rating: 4.5,
      distance: '1.2km',
      image: 'https://picsum.photos/seed/store1/800/600',
      coupon: '平日午餐9折優惠券',
      // 店家詳細信息
      businessHours: '週一至週日 11:00-22:00',
      phone: '02-2345-6789',
      address: '台北市信義區信義路五段7號',
      // 店家介紹
      introduction: `王品牛排成立於1993年，秉持「只款待心中最重要的人」的品牌理念，嚴選頂級牛肉與主廚特調醬汁，打造完美口感。信義店位於核心商業區，寬敞舒適的用餐環境與專業服務，為您提供完整的套餐服務，包含精緻沙拉、主廚湯品、主餐、甜點與飲品，嚴格品質控管、新鮮食材與精準火候，確保五星級用餐體驗。`,
      // 優惠使用說明
      usageInstructions: [
        '請於消費前向店員出示優惠券進行核銷',
        '每人每次限用一份',
        '本優惠不得與其他優惠併用',
        '使用前請先電話預約訂位',
        '特殊節日（春節、情人節、母親節等）可能不適用',
        '店家保留修改、暫停或終止活動之權利',
        '詳細使用規則以現場公告為準',
      ],
      // 優惠活動（可選，如果有則顯示輪播）
      promotions: [
        {
          id: 1,
          title: '內用5折優惠',
          originalPrice: 100,
          validUntil: '2024.03.31',
          image: 'https://picsum.photos/seed/store1/800/600',
          buttonText: '使用',
          usageDescription: '出示此優惠券於結帳時，可享消費滿$100元。',
          notes: [
            '每次交易限使用一張優惠券，不得與其他優惠同時使用。',
            '優惠不適用於指定套餐、酒水及外送服務。',
            '本優惠券不得兌換現金，未使用則過期作廢。',
            '限一般餐飲，特殊節日(如國定假日、情人節、跨年等)不適用。',
          ],
        },
        {
          id: 2,
          title: '雙人套餐優惠',
          originalPrice: 300,
          validUntil: '2024.03.31',
          image: 'https://picsum.photos/seed/store1/800/600',
          buttonText: '使用',
          usageDescription: '出示此優惠券於結帳時，可享消費滿$300元。',
          notes: [
            '每次交易限使用一張優惠券，不得與其他優惠同時使用。',
            '優惠不適用於指定套餐、酒水及外送服務。',
            '本優惠券不得兌換現金，未使用則過期作廢。',
            '限一般餐飲，特殊節日(如國定假日、情人節、跨年等)不適用。',
          ],
        },
        {
          id: 3,
          title: '週年慶特惠',
          originalPrice: 500,
          validUntil: '2024.04.30',
          image: 'https://picsum.photos/seed/store1/800/600',
          buttonText: '使用',
          usageDescription: '出示此優惠券於結帳時，可享消費滿$500元。',
          notes: [
            '每次交易限使用一張優惠券，不得與其他優惠同時使用。',
            '優惠不適用於指定套餐、酒水及外送服務。',
            '本優惠券不得兌換現金，未使用則過期作廢。',
            '限一般餐飲，特殊節日(如國定假日、情人節、跨年等)不適用。',
          ],
        },
      ],
      // 電子票券（可選，如果有則顯示輪播）
      // 票券 ID 對應 ticket.js 中的票券資料
      tickets: [
        {
          id: 7, // 對應 ticket.js 中的 id: 7
          title: '王品牛排雙人套餐券',
          points: 2800,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: '高人氣',
        },
        {
          id: 8, // 對應 ticket.js 中的 id: 8
          title: '王品牛排單人套餐券',
          points: 1500,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 9, // 對應 ticket.js 中的 id: 9
          title: '王品牛排家庭四人套餐',
          points: 5200,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 10, // 對應 ticket.js 中的 id: 10
          title: '王品牛排和牛雙人套餐券',
          points: 4500,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 11, // 對應 ticket.js 中的 id: 11（如果需要的話）
          title: '王品牛排頂級和牛雙人套餐券',
          points: 4500,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 6,
          title: '王品牛排經典單人套餐券',
          points: 1500,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 7,
          title: '王品牛排豪華雙人套餐券',
          points: 3200,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: '高人氣',
        },
        {
          id: 8,
          title: '王品牛排精選套餐券',
          points: 2000,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 9,
          title: '王品牛排豪華單人套餐券',
          points: 1800,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 10,
          title: '王品牛排經典雙人套餐券',
          points: 3000,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 11,
          title: '王品牛排特選套餐券',
          points: 2200,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
        {
          id: 12,
          title: '王品牛排尊榮套餐券',
          points: 5000,
          image: 'https://picsum.photos/seed/store1/800/600',
          tag: null,
        },
      ],
    },
    2: {
      id: 2,
      name: '漢堡王 新店門市',
      category: '美食 > 速食餐廳',
      rating: 4.3,
      distance: '2.8km',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop',
      coupon: '滿額現金回饋券',
      businessHours: '週一至週日 11:00-22:00',
      phone: '02-2345-6789',
      address: '台北市信義區信義路五段7號',
      introduction: `漢堡王成立於1954年，是全球知名的速食連鎖品牌。我們堅持使用100%純牛肉，搭配新鮮蔬菜與特製醬料，為您提供最優質的漢堡體驗。新店門市位於交通便利的地點，提供寬敞的用餐空間與快速服務，讓您隨時享受美味的漢堡與套餐。`,
      usageInstructions: [
        '請於消費前向店員出示優惠券進行核銷',
        '每人每次限用一份',
        '本優惠不得與其他優惠併用',
        '使用前請先電話預約訂位',
        '特殊節日（春節、情人節、母親節等）可能不適用',
        '店家保留修改、暫停或終止活動之權利',
        '詳細使用規則以現場公告為準',
      ],
      promotions: [
        {
          id: 1,
          title: '套餐買一送一',
          originalPrice: 200,
          validUntil: '2024.04.15',
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          buttonText: '使用',
          usageDescription: '出示此優惠券於結帳時，可享消費滿$200元。',
          notes: [
            '每次交易限使用一張優惠券，不得與其他優惠同時使用。',
            '優惠不適用於指定套餐、酒水及外送服務。',
            '本優惠券不得兌換現金，未使用則過期作廢。',
            '限一般餐飲，特殊節日(如國定假日、情人節、跨年等)不適用。',
          ],
        },
        {
          id: 2,
          title: '漢堡第二件半價',
          originalPrice: 150,
          validUntil: '2024.04.20',
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          buttonText: '使用',
          usageDescription: '出示此優惠券於結帳時，可享消費滿$150元。',
          notes: [
            '每次交易限使用一張優惠券，不得與其他優惠同時使用。',
            '優惠不適用於指定套餐、酒水及外送服務。',
            '本優惠券不得兌換現金，未使用則過期作廢。',
            '限一般餐飲，特殊節日(如國定假日、情人節、跨年等)不適用。',
          ],
        },
      ],
      tickets: [
        {
          id: 1,
          title: '漢堡王經典套餐券',
          points: 800,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          tag: '熱銷',
        },
        {
          id: 2,
          title: '漢堡王雙人套餐券',
          points: 1200,
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          tag: null,
        },
      ],
    },
  }

  // 根據 id 獲取店家詳情
  const getStoreById = (id) => {
    return stores[id] || null
  }

  // 從所有分類和品牌中獲取店家（用於查找）
  const findStoreInAllCategories = (storeId) => {
    // 這裡可以整合 cate.js 和 brand.js 的數據
    // 目前先返回 stores 中的數據
    return stores[storeId] || null
  }

  // 搜尋店家（根據店家名稱）
  const searchStores = (keyword) => {
    if (!keyword || !keyword.trim()) {
      return []
    }

    const searchTerm = keyword.trim().toLowerCase()
    const results = []

    // 搜尋所有店家
    Object.values(stores).forEach((store) => {
      if (store.name.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'store',
          store: store,
          storeId: store.id, // 使用全局 ID
        })
      }
    })

    return results
  }

  return {
    stores,
    getStoreById,
    findStoreInAllCategories,
    searchStores,
  }
})
