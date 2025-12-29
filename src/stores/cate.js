import { defineStore } from 'pinia'

export const useCateStore = defineStore('cate', () => {
  // 分類配置映射表
  const categories = {
    restaurant: {
      id: 'restaurant',
      name: '美味餐廳',
      stores: [
        {
          id: 1,
          name: '王品牛排 台北信義店',
          category: '美食 > 連鎖餐廳',
          rating: 4.5,
          distance: '1.2km',
          image: 'https://picsum.photos/seed/cate-steak/800/600',
          coupon: '平日午餐9折優惠券',
        },
      ],
    },
    groceries: {
      id: 'groceries',
      name: '生活雜貨',
      stores: [
        {
          id: 1,
          name: '全聯福利中心 大安店',
          category: '量販超市 > 連鎖超市',
          rating: 4.1,
          distance: '1.6km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '滿額現金回饋券',
        },
        {
          id: 2,
          name: '家樂福 桂林店',
          category: '量販超市 > 連鎖超市',
          rating: 4.0,
          distance: '2.7km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '生鮮商品折扣券',
        },
        {
          id: 3,
          name: '好市多 內湖店',
          category: '量販超市 > 會員制量販',
          rating: 4.5,
          distance: '4.8km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '會員專屬優惠券',
        },
        {
          id: 4,
          name: '大潤發 內湖店',
          category: '量販超市 > 連鎖超市',
          rating: 4.2,
          distance: '4.5km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '生鮮商品折扣券',
        },
        {
          id: 5,
          name: '愛買 內湖店',
          category: '量販超市 > 連鎖超市',
          rating: 4.1,
          distance: '4.2km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '生鮮商品折扣券',
        },
        {
          id: 6,
          name: '寶雅 中山店',
          category: '生活百貨 > 連鎖商店',
          rating: 4.1,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
          coupon: '滿額贈品兌換券',
        },
        {
          id: 7,
          name: '無印良品 統一時代店',
          category: '生活百貨 > 日系雜貨',
          rating: 4.5,
          distance: '1.2km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '滿千送百購物金',
        },
        {
          id: 8,
          name: '誠品生活 松菸店',
          category: '生活百貨 > 文創商店',
          rating: 4.7,
          distance: '2.1km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '文創商品85折券',
        },
        {
          id: 9,
          name: 'MUJI 無印良品 統一時代店',
          category: '生活百貨 > 日系雜貨',
          rating: 4.6,
          distance: '1.2km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '滿千送百購物金',
        },
        {
          id: 10,
          name: '誠品生活 信義店',
          category: '生活百貨 > 文創商店',
          rating: 4.7,
          distance: '0.8km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '文創商品85折券',
        },
        {
          id: 11,
          name: '7-ELEVEN 信義門市',
          category: '便利商店 > 連鎖超商',
          rating: 4.0,
          distance: '0.3km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '指定商品買二送一',
        },
        {
          id: 12,
          name: '全家便利商店 信義門市',
          category: '便利商店 > 連鎖超商',
          rating: 4.0,
          distance: '0.4km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '指定商品買二送一',
        },
        {
          id: 13,
          name: '萊爾富 信義門市',
          category: '便利商店 > 連鎖超商',
          rating: 4.0,
          distance: '0.5km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '指定商品買二送一',
        },
        {
          id: 14,
          name: 'OK超商 信義門市',
          category: '便利商店 > 連鎖超商',
          rating: 4.0,
          distance: '0.6km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '指定商品買二送一',
        },
        {
          id: 15,
          name: '特力屋 內湖店',
          category: '生活百貨 > 居家修繕',
          rating: 4.3,
          distance: '5.1km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
        {
          id: 16,
          name: 'IKEA 新莊店',
          category: '家具家飾 > 連鎖家具',
          rating: 4.6,
          distance: '5.2km',
          image:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
        {
          id: 17,
          name: 'HOLA 特力和樂 內湖店',
          category: '生活百貨 > 居家用品',
          rating: 4.4,
          distance: '5.0km',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
          coupon: '滿額現金回饋券',
        },
      ],
    },
    hotel: {
      id: 'hotel',
      name: '飯店旅館',
      stores: [
        {
          id: 1,
          name: '台北君悅酒店',
          category: '飯店旅館 > 五星級飯店',
          rating: 4.8,
          distance: '2.1km',
          image:
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop',
          coupon: '平日住宿優惠券',
        },
        {
          id: 2,
          name: '文華東方酒店',
          category: '飯店旅館 > 五星級飯店',
          rating: 4.8,
          distance: '2.1km',
          image:
            'https://media.gq.com.tw/photos/5dbccc9e851a4300088a9b5a/16:9/w_2560%2Cc_limit/2014061258810801.jpg',
          coupon: '下午茶寵愛優惠券',
        },
        {
          id: 3,
          name: '台北君悅酒店',
          category: '飯店旅館 > 五星級飯店',
          rating: 4.8,
          distance: '2.1km',
          image:
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/471649671.jpg?k=c6f50c0b1f78de5430aa61741f78f517c28d6e35ab401097cf8387a24a3492d6&o=',
          coupon: '平日住宿優惠券',
        },
      ],
    },
    fitness: {
      id: 'fitness',
      name: '運動健身',
      stores: [
        {
          id: 1,
          name: '健身工廠 內湖旗艦店',
          category: '運動健身 > 健身中心',
          rating: 4.4,
          distance: '3.2km',
          image:
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
          coupon: '首月入會優惠券',
        },
      ],
    },
    beauty: {
      id: 'beauty',
      name: '美容保養',
      stores: [
        {
          id: 1,
          name: '屈臣氏 忠孝復興門市',
          category: '美妝保養 > 連鎖藥妝',
          rating: 4.3,
          distance: '0.8km',
          image: 'https://picsum.photos/seed/cate-cosmetics/800/600',
          coupon: '滿千送百購物金',
        },
      ],
    },
    coffee: {
      id: 'coffee',
      name: '咖啡飲品',
      stores: [
        {
          id: 1,
          name: '星巴克 台北101店',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.6,
          distance: '0.7km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '第二杯半價優惠券',
        },
      ],
    },
    appliances: {
      id: 'appliances',
      name: '家電',
      stores: [
        {
          id: 1,
          name: '燦坤 信義店',
          category: '家電 > 3C家電',
          rating: 4.2,
          distance: '1.5km',
          image:
            'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    mobile: {
      id: 'mobile',
      name: '手機相機',
      stores: [
        {
          id: 1,
          name: '燦坤 信義店',
          category: '手機相機 > 3C賣場',
          rating: 4.2,
          distance: '1.5km',
          image:
            'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    health: {
      id: 'health',
      name: '保健醫療',
      stores: [
        {
          id: 1,
          name: '康是美 南京店',
          category: '美妝保養 > 連鎖藥妝',
          rating: 4.3,
          distance: '0.9km',
          image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
          coupon: '開架彩妝85折',
        },
      ],
    },
    furniture: {
      id: 'furniture',
      name: '傢俱收納',
      stores: [
        {
          id: 1,
          name: 'IKEA 新莊店',
          category: '家具家飾 > 連鎖家具',
          rating: 4.6,
          distance: '5.2km',
          image:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    paper: {
      id: 'paper',
      name: '日用紙品',
      stores: [
        {
          id: 1,
          name: '全聯福利中心 大安店',
          category: '日用紙品 > 生活用品',
          rating: 4.1,
          distance: '1.6km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '滿額現金回饋券',
        },
      ],
    },
    tech: {
      id: 'tech',
      name: '3C周邊',
      stores: [
        {
          id: 1,
          name: '燦坤 信義店',
          category: '3C周邊 > 3C賣場',
          rating: 4.2,
          distance: '1.5km',
          image:
            'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    pet: {
      id: 'pet',
      name: '寵物用品',
      stores: [
        {
          id: 1,
          name: '寵物公園 信義店',
          category: '寵物用品 > 寵物商店',
          rating: 4.4,
          distance: '1.3km',
          image:
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    garden: {
      id: 'garden',
      name: '園藝',
      stores: [
        {
          id: 1,
          name: '特力屋 內湖店',
          category: '園藝 > 園藝用品',
          rating: 4.3,
          distance: '5.1km',
          image:
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
  }

  // 根據 id 獲取分類數據
  const getCategoryById = (id) => {
    return categories[id] || null
  }

  // 獲取分類列表（用於導航）
  const getCategoryList = () => {
    return Object.values(categories).map((cat) => ({
      id: cat.id,
      name: cat.name,
    }))
  }

  return {
    categories,
    getCategoryById,
    getCategoryList,
  }
})
