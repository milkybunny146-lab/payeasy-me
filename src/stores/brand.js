import { defineStore } from 'pinia'

export const useBrandStore = defineStore('brand', () => {
  // 品牌配置映射表
  const brands = {
    starbucks: {
      id: 'starbucks',
      name: '星巴克',
      image:
        'https://images.unsplash.com/photo-1657979964801-3e3bb6c03a7e?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '星巴克 敦南門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.7,
          distance: '0.6km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '第二杯半價券',
        },
        {
          id: 2,
          name: '星巴克 信義門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.7,
          distance: '1.2km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '第二杯半價券',
        },
        {
          id: 3,
          name: '星巴克 南港門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.6,
          distance: '2.8km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '買一送一券',
        },
        {
          id: 4,
          name: '星巴克 板橋門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.5,
          distance: '3.2km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '早餐套餐優惠',
        },
        {
          id: 5,
          name: '星巴克 中山門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.6,
          distance: '0.9km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '會員積點雙倍',
        },
        {
          id: 6,
          name: '星巴克 內湖門市',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.5,
          distance: '3.5km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '外帶飲品折扣',
        },
      ],
    },
    ikea: {
      id: 'ikea',
      name: 'IKEA',
      image:
        'https://images.unsplash.com/photo-1679050367261-d7a4a7747ef4?w=800&h=800&fit=crop&q=90',
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
    pxmart: {
      id: 'pxmart',
      name: '全聯',
      image:
        'https://images.unsplash.com/photo-1671427478482-2968e71a6311?w=800&h=800&fit=crop&q=90',
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
      ],
    },
    carrefour: {
      id: 'carrefour',
      name: '家樂福',
      image:
        'https://images.unsplash.com/photo-1757940059931-6e3c6572d989?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '家樂福 桂林店',
          category: '量販超市 > 連鎖超市',
          rating: 4.0,
          distance: '2.7km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '生鮮商品折扣券',
        },
      ],
    },
    eslite: {
      id: 'eslite',
      name: '誠品書店',
      image:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '誠品書店 信義旗艦店',
          category: '書籍文具 > 連鎖書店',
          rating: 4.7,
          distance: '1.5km',
          image: 'https://picsum.photos/seed/brand-books/800/600',
          coupon: '會員專屬折價券',
        },
      ],
    },
    cosmed: {
      id: 'cosmed',
      name: '康是美',
      image:
        'https://images.unsplash.com/photo-1761036602705-48c4b69232c8?w=800&h=800&fit=crop&q=90',
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
    seveneleven: {
      id: 'seveneleven',
      name: '7-11',
      image:
        'https://images.unsplash.com/photo-1613535738534-5e4d22597ab5?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '7-ELEVEN 信義門市',
          category: '便利商店 > 連鎖超商',
          rating: 4.0,
          distance: '0.3km',
          image:
            'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
          coupon: '指定商品買二送一',
        },
      ],
    },
    watson: {
      id: 'watson',
      name: '屈臣氏',
      image:
        'https://images.unsplash.com/photo-1713937187927-4e80f5a54efa?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '屈臣氏 忠孝復興門市',
          category: '美妝保養 > 連鎖藥妝',
          rating: 4.3,
          distance: '0.8km',
          image: 'https://picsum.photos/seed/brand-cosmetics/800/600',
          coupon: '滿千送百購物金',
        },
      ],
    },
    poya: {
      id: 'poya',
      name: '寶雅',
      image:
        'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: '寶雅 中山店',
          category: '生活百貨 > 連鎖商店',
          rating: 4.1,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
          coupon: '滿額贈品兌換券',
        },
      ],
    },
    net: {
      id: 'net',
      name: 'NET',
      image:
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop&q=90',
      stores: [
        {
          id: 1,
          name: 'NET 西門門市',
          category: '服飾配件 > 服飾店',
          rating: 4.2,
          distance: '2.3km',
          image: 'https://picsum.photos/seed/brand-cloths/800/600',
          coupon: '新品上市優惠券',
        },
      ],
    },
    uniqlo: {
      id: 'uniqlo',
      name: 'UNIQLO',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: 'UNIQLO 信義店',
          category: '服飾配件 > 服飾店',
          rating: 4.4,
          distance: '1.5km',
          image: 'https://picsum.photos/seed/brand-cloths/800/600',
          coupon: '新品上市優惠券',
        },
      ],
    },
    muji: {
      id: 'muji',
      name: 'MUJI無印良品',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: 'MUJI無印良品 信義店',
          category: '生活百貨 > 連鎖商店',
          rating: 4.5,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    kfc: {
      id: 'kfc',
      name: '肯德基',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '肯德基 信義店',
          category: '美食 > 速食',
          rating: 4.2,
          distance: '1.2km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    zhenzhu: {
      id: 'zhenzhu',
      name: '真珠台灣家味',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '真珠台灣家味 信義店',
          category: '美食 > 台菜',
          rating: 4.3,
          distance: '2.1km',
          image:
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
          coupon: '滿千送百購物金',
        },
      ],
    },
    spoon: {
      id: 'spoon',
      name: '勺日咖啡',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '勺日咖啡 信義店',
          category: '咖啡飲品 > 連鎖咖啡',
          rating: 4.4,
          distance: '1.5km',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          coupon: '第二杯半價券',
        },
      ],
    },
    kaifang: {
      id: 'kaifang',
      name: '開飯川食堂',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '開飯川食堂 信義店',
          category: '美食 > 川菜',
          rating: 4.5,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
          coupon: '平日午餐9折優惠券',
        },
      ],
    },
    paradise: {
      id: 'paradise',
      name: '饗食天堂',
      image: 'https://picsum.photos/seed/brand-paradise/800/600',
      stores: [
        {
          id: 1,
          name: '饗食天堂 信義店',
          category: '美食 > 吃到飽',
          rating: 4.3,
          distance: '2.5km',
          image: 'https://picsum.photos/seed/brand-paradise-store/800/600',
          coupon: '會員專屬折扣券',
        },
      ],
    },
    tacobell: {
      id: 'tacobell',
      name: 'Taco Bell',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: 'Taco Bell 信義店',
          category: '美食 > 速食',
          rating: 4.1,
          distance: '1.5km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    dq: {
      id: 'dq',
      name: 'DQ',
      image: 'https://i.pinimg.com/1200x/0e/86/86/0e8686ab820369e1d507117560e745e3.jpg',
      stores: [
        {
          id: 1,
          name: 'DQ 信義店',
          category: '美食 > 甜點',
          rating: 4.3,
          distance: '1.8km',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1b5?w=300&h=200&fit=crop',
          coupon: '買一送一券',
        },
      ],
    },
    subway: {
      id: 'subway',
      name: 'Subway',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: 'Subway 信義店',
          category: '美食 > 速食',
          rating: 4.2,
          distance: '1.2km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    burgerking: {
      id: 'burgerking',
      name: '漢堡王',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '漢堡王 新店門市',
          category: '美食 > 速食',
          rating: 4.2,
          distance: '2.3km',
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    mcdonalds: {
      id: 'mcdonalds',
      name: '麥當勞',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '麥當勞 信義店',
          category: '美食 > 速食',
          rating: 4.1,
          distance: '0.8km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    pizzahut: {
      id: 'pizzahut',
      name: '必勝客',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '必勝客 信義店',
          category: '美食 > 速食',
          rating: 4.3,
          distance: '1.5km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    wendys: {
      id: 'wendys',
      name: '溫蒂漢堡',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '溫蒂漢堡 信義店',
          category: '美食 > 速食',
          rating: 4.2,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    popeyes: {
      id: 'popeyes',
      name: '波登萊炸',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '波登萊炸 信義店',
          category: '美食 > 速食',
          rating: 4.1,
          distance: '2.2km',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
          coupon: '套餐優惠券',
        },
      ],
    },
    regent: {
      id: 'regent',
      name: '晶華酒店',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '晶華酒店',
          category: '住宿 > 飯店',
          rating: 4.8,
          distance: '2.5km',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
          coupon: '住宿優惠券',
        },
      ],
    },
    hyatt: {
      id: 'hyatt',
      name: '君悅飯店',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '君悅飯店',
          category: '住宿 > 飯店',
          rating: 4.7,
          distance: '3.2km',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
          coupon: '住宿優惠券',
        },
      ],
    },
    sheraton: {
      id: 'sheraton',
      name: '喜來登大飯店',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '喜來登大飯店',
          category: '住宿 > 飯店',
          rating: 4.6,
          distance: '2.8km',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
          coupon: '住宿優惠券',
        },
      ],
    },
    lemeridien: {
      id: 'lemeridien',
      name: '寒舍艾美',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '寒舍艾美',
          category: '住宿 > 飯店',
          rating: 4.7,
          distance: '2.1km',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
          coupon: '住宿優惠券',
        },
      ],
    },
    vieshow: {
      id: 'vieshow',
      name: '威秀影城',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '威秀影城 信義店',
          category: '娛樂 > 電影院',
          rating: 4.4,
          distance: '1.5km',
          image:
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop',
          coupon: '電影票優惠券',
        },
      ],
    },
    ambassador: {
      id: 'ambassador',
      name: '國賓影城',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '國賓影城 信義店',
          category: '娛樂 > 電影院',
          rating: 4.3,
          distance: '2.2km',
          image:
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop',
          coupon: '電影票優惠券',
        },
      ],
    },
    cashbox: {
      id: 'cashbox',
      name: '錢櫃KTV',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '錢櫃KTV 信義店',
          category: '娛樂 > KTV',
          rating: 4.2,
          distance: '1.8km',
          image:
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
          coupon: '包廂優惠券',
        },
      ],
    },
    holiday: {
      id: 'holiday',
      name: '好樂迪KTV',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: '好樂迪KTV 信義店',
          category: '娛樂 > KTV',
          rating: 4.1,
          distance: '2.0km',
          image:
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
          coupon: '包廂優惠券',
        },
      ],
    },
    vodafone: {
      id: 'vodafone',
      name: 'vodafone',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop',
      stores: [
        {
          id: 1,
          name: 'vodafone 信義店',
          category: '通訊 > 電信',
          rating: 4.0,
          distance: '1.5km',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
          coupon: '方案優惠券',
        },
      ],
    },
  }

  // 根據 id 獲取品牌數據
  const getBrandById = (id) => {
    return brands[id] || null
  }

  // 獲取品牌列表（用於精選品牌組件）
  const getBrandList = () => {
    return Object.values(brands).map((brand) => ({
      id: brand.id,
      name: brand.name,
      image: brand.image,
    }))
  }

  return {
    brands,
    getBrandById,
    getBrandList,
  }
})
