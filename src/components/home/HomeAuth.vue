<template>
  <div class="w-full flex justify-center px-10 py-8">
    <div class="max-w-7xl w-full">
      <h2 class="text-2xl font-bold text-black mb-6">特約店家</h2>

      <!-- 使用 v-for 循環渲染卡片 -->
      <div class="stores-grid">
        <StoreCard
          v-for="store in paginatedStores"
          :key="store.id"
          :store="store"
          @coupon-click="handleCouponClick"
        />
      </div>

      <!-- 分頁組件 -->
      <PaginationBar
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StoreCard from '@/components/common/StoreCard.vue'
import PaginationBar from '@/components/common/Pagination.vue'

// 分頁設定
const currentPage = ref(1)
const pageSize = ref(12) // 每頁顯示12張卡片

// 特約店家數據
const stores = ref([
  {
    id: 1,
    name: '王品牛排 台北信義店',
    category: '美食 > 連鎖餐廳',
    rating: 4.5,
    distance: '1.2km',
    image: '/selected/steak.jpeg',
    coupon: '平日午餐9折優惠券'
  },
  {
    id: 2,
    name: '屈臣氏 忠孝復興門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: '0.8km',
    image: '/selected/cosmetics.jpeg',
    coupon: '滿千送百購物金'
  },
  {
    id: 3,
    name: '誠品書店 信義旗艦店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.7,
    distance: '1.5km',
    image: '/selected/books.jpeg',
    coupon: '會員專屬折價券'
  },
  {
    id: 4,
    name: 'NET 西門門市',
    category: '服飾配件 > 服飾店',
    rating: 4.2,
    distance: '2.3km',
    image: '/selected/cloths.jpeg',
    coupon: '新品上市優惠券'
  },
  {
    id: 5,
    name: '85度C 南京東路店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.4,
    distance: '0.5km',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop',
    coupon: '指定商品買一送一'
  },
  {
    id: 6,
    name: '寶雅 中山店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.1,
    distance: '1.8km',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    coupon: '滿額贈品兌換券'
  },
  {
    id: 7,
    name: 'SOGO 忠孝館',
    category: '百貨商場 > 百貨公司',
    rating: 4.6,
    distance: '1.3km',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop',
    coupon: '週年慶滿額禮券'
  },
  {
    id: 8,
    name: '家樂福 桂林店',
    category: '量販超市 > 連鎖超市',
    rating: 4.0,
    distance: '2.7km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '生鮮商品折扣券'
  },
  {
    id: 9,
    name: 'uniqlo 信義旗艦店',
    category: '服飾配件 > 服飾店',
    rating: 4.5,
    distance: '0.6km',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop',
    coupon: '限時特價優惠券'
  },
  {
    id: 10,
    name: '莫凡彼 微風廣場店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.8,
    distance: '1.1km',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    coupon: 'VIP專屬優惠券'
  },
  {
    id: 11,
    name: '健身工廠 內湖旗艦店',
    category: '運動健身 > 健身中心',
    rating: 4.4,
    distance: '3.2km',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    coupon: '首月入會優惠券'
  },
  {
    id: 12,
    name: '康是美 南京店',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: '0.9km',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    coupon: '開架彩妝85折'
  },
  // 第二頁卡片 (13-24)
  {
    id: 13,
    name: '西堤牛排 板橋店',
    category: '美食 > 連鎖餐廳',
    rating: 4.6,
    distance: '2.1km',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=200&fit=crop',
    coupon: '雙人套餐85折優惠券'
  },
  {
    id: 14,
    name: '星巴克 敦南門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.7,
    distance: '0.6km',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop',
    coupon: '第二杯半價券'
  },
  {
    id: 15,
    name: 'IKEA 新莊店',
    category: '家居生活 > 家具賣場',
    rating: 4.5,
    distance: '4.5km',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
    coupon: '新品上市9折券'
  },
  {
    id: 16,
    name: '大創百貨 中壢店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.2,
    distance: '3.8km',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop',
    coupon: '滿500折50券'
  },
  {
    id: 17,
    name: 'MUJI無印良品 台中店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.8,
    distance: '2.9km',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop',
    coupon: '文創商品8折券'
  },
  {
    id: 18,
    name: '金石堂書店 高雄店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.4,
    distance: '1.7km',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=200&fit=crop',
    coupon: '全館79折價優惠券'
  },
  {
    id: 19,
    name: 'Zara 台北101店',
    category: '服飾配件 > 服飾店',
    rating: 4.0,
    distance: '0.3km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '秋冬新品折扣券'
  },
  {
    id: 20,
    name: 'H&M 信義威秀店',
    category: '服飾配件 > 服飾店',
    rating: 4.1,
    distance: '1.3km',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=200&fit=crop',
    coupon: '會員專屬優惠券'
  },
  {
    id: 21,
    name: '寬庭食品 敦化店',
    category: '生活百貨 > 日系雜貨',
    rating: 4.5,
    distance: '1.2km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '滿千送百購物金'
  },
  {
    id: 22,
    name: '全國電子 桃園店',
    category: '家電3C > 連鎖賣場',
    rating: 4.0,
    distance: '3.5km',
    image: 'https://i.pinimg.com/736x/36/fc/96/36fc9629d72c917dba5c939d226632e0.jpg',
    coupon: '家電特賣優惠券'
  },
  {
    id: 23,
    name: '燦坤3C 新竹店',
    category: '家電3C > 連鎖賣場',
    rating: 4.2,
    distance: '4.1km',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    coupon: '滿萬折千券'
  },
  {
    id: 24,
    name: '美廉社 松山店',
    category: '便利商店 > 連鎖超商',
    rating: 4.1,
    distance: '0.4km',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop',
    coupon: '指定商品優惠券'
  },
  // 第三頁卡片 (25-36)
  {
    id: 25,
    name: 'IKEA 新莊店',
    category: '家具家飾 > 連鎖家具',
    rating: 4.6,
    distance: '5.2km',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    coupon: '會員專屬折扣券'
  },
  {
    id: 26,
    name: '肯德基 信義店',
    category: '美食 > 速食餐廳',
    rating: 4.1,
    distance: '0.6km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop',
    coupon: '炸雞桶餐優惠券'
  },
  {
    id: 27,
    name: 'GAP 信義新天地',
    category: '服飾配件 > 服飾店',
    rating: 4.2,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '新品上市85折券'
  },
  {
    id: 28,
    name: '好市多 內湖店',
    category: '量販超市 > 會員制量販',
    rating: 4.5,
    distance: '4.8km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '會員專屬優惠券'
  },
  {
    id: 29,
    name: '路易莎咖啡 信義店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.4,
    distance: '0.5km',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
    coupon: '第二杯半價優惠券'
  },
  {
    id: 30,
    name: '瓦城泰式料理 信義店',
    category: '美食 > 泰式餐廳',
    rating: 4.6,
    distance: '0.9km',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    coupon: '平日午餐9折券'
  },
  {
    id: 31,
    name: 'Nike 信義旗艦店',
    category: '運動用品 > 運動品牌',
    rating: 4.5,
    distance: '1.1km',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    coupon: '新品上市9折券'
  },
  {
    id: 32,
    name: '松本清 西門店',
    category: '美妝保養 > 日系藥妝',
    rating: 4.7,
    distance: '2.3km',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    coupon: '開架彩妝85折券'
  },
  {
    id: 33,
    name: '微風廣場',
    category: '百貨商場 > 百貨公司',
    rating: 4.6,
    distance: '1.2km',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop',
    coupon: '週年慶滿額禮券'
  },
  {
    id: 34,
    name: 'Cold Stone 信義店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.5,
    distance: '0.7km',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    coupon: '買一送一優惠券'
  },
  {
    id: 35,
    name: 'Adidas 信義店',
    category: '運動用品 > 運動品牌',
    rating: 4.4,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    coupon: '會員專屬折價券'
  },
  {
    id: 36,
    name: '誠品書店 敦南店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.8,
    distance: '1.8km',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop',
    coupon: '會員專屬折價券'
  },
  // 第四頁卡片 (37-48)
  {
    id: 37,
    name: 'Subway 信義店',
    category: '美食 > 速食餐廳',
    rating: 4.3,
    distance: '0.5km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop',
    coupon: '潛艇堡套餐優惠券'
  },
  {
    id: 38,
    name: 'MUJI 無印良品 統一時代店',
    category: '生活百貨 > 日系雜貨',
    rating: 4.6,
    distance: '1.2km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '滿千送百購物金'
  },
  {
    id: 39,
    name: 'Puma 信義店',
    category: '運動用品 > 運動品牌',
    rating: 4.3,
    distance: '1.1km',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    coupon: '新品上市9折券'
  },
  {
    id: 40,
    name: '大潤發 內湖店',
    category: '量販超市 > 連鎖超市',
    rating: 4.2,
    distance: '4.5km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '生鮮商品折扣券'
  },
  {
    id: 41,
    name: '春水堂 信義店',
    category: '茶飲 > 連鎖茶飲',
    rating: 4.5,
    distance: '0.8km',
    image: 'http://localhost:5173/theme/bubble.jpeg',
    coupon: '珍珠奶茶買一送一'
  },
  {
    id: 42,
    name: '築間幸福鍋物 信義店',
    category: '美食 > 火鍋餐廳',
    rating: 4.7,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    coupon: '平日午餐優惠券'
  },
  {
    id: 43,
    name: 'Forever 21 信義店',
    category: '服飾配件 > 服飾店',
    rating: 4.1,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '新品上市85折券'
  },
  {
    id: 44,
    name: '全家便利商店 信義門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.0,
    distance: '0.4km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '指定商品買二送一'
  },
  {
    id: 45,
    name: '饗食天堂 信義店',
    category: '美食 > 自助餐廳',
    rating: 4.8,
    distance: '0.9km',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    coupon: '平日午餐優惠券'
  },
  {
    id: 46,
    name: 'Sephora 信義店',
    category: '美妝保養 > 美妝專櫃',
    rating: 4.6,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    coupon: '開架彩妝9折券'
  },
  {
    id: 47,
    name: 'World Gym 大安店',
    category: '運動健身 > 健身中心',
    rating: 4.4,
    distance: '2.1km',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    coupon: '體驗課程免費券'
  },
  {
    id: 48,
    name: '誠品生活 信義店',
    category: '生活百貨 > 文創商店',
    rating: 4.7,
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '文創商品85折券'
  },
  // 第五頁卡片 (49-60)
  {
    id: 49,
    name: '必勝客 信義店',
    category: '美食 > 披薩餐廳',
    rating: 4.2,
    distance: '0.6km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop',
    coupon: '披薩套餐優惠券'
  },
  {
    id: 50,
    name: '優衣庫 UNIQLO 信義店',
    category: '服飾配件 > 服飾店',
    rating: 4.5,
    distance: '0.6km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    coupon: '限時特價優惠券'
  },
  {
    id: 51,
    name: '萊爾富 信義門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.0,
    distance: '0.5km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '指定商品買二送一'
  },
  {
    id: 52,
    name: '欣葉台菜 信義店',
    category: '美食 > 台菜餐廳',
    rating: 4.6,
    distance: '0.9km',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    coupon: '平日午餐9折券'
  },
  {
    id: 53,
    name: 'New Balance 信義店',
    category: '運動用品 > 運動品牌',
    rating: 4.4,
    distance: '1.1km',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    coupon: '新品上市9折券'
  },
  {
    id: 54,
    name: '愛買 內湖店',
    category: '量販超市 > 連鎖超市',
    rating: 4.1,
    distance: '4.2km',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    coupon: '生鮮商品折扣券'
  },
  {
    id: 55,
    name: 'Lady M 信義店',
    category: '冰品甜點 > 蛋糕店',
    rating: 4.8,
    distance: '0.7km',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    coupon: 'VIP專屬優惠券'
  },
  {
    id: 56,
    name: 'Häagen-Dazs 信義店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.7,
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    coupon: '買一送一優惠券'
  },
  {
    id: 57,
    name: '誠品書店 信義店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.7,
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop',
    coupon: '會員專屬折價券'
  },
  {
    id: 58,
    name: 'SOGO 復興館',
    category: '百貨商場 > 百貨公司',
    rating: 4.6,
    distance: '1.4km',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop',
    coupon: '週年慶滿額禮券'
  },
  {
    id: 59,
    name: '康是美 信義店',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: '0.9km',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    coupon: '開架彩妝85折'
  },
  {
    id: 60,
    name: '健身工廠 信義店',
    category: '運動健身 > 健身中心',
    rating: 4.5,
    distance: '1.0km',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    coupon: '首月入會優惠券'
  }
])

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(stores.value.length / pageSize.value)
})

// 計算當前頁顯示的卡片
const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return stores.value.slice(start, end)
})

// 處理分頁變化
const handlePageChange = (page) => {
  currentPage.value = page
}

const handleCouponClick = (store) => {
  console.log('點擊優惠券:', store.name, store.coupon)
  // 這裡可以添加跳轉到優惠券詳情頁面的邏輯
}
</script>

<style scoped>
.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>
