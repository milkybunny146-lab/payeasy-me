/**
 * 生成隨機圖片 URL
 * 使用 Picsum Photos 服務，基於 seed 確保同一 ID 獲得相同圖片
 * @param {number|string} id - 用於生成唯一圖片的 ID
 * @param {number} width - 圖片寬度，默認 800
 * @param {number} height - 圖片高度，默認 600
 * @returns {string} 隨機圖片 URL
 */
export function getRandomImage(id, width = 800, height = 600) {
  // 將 ID 轉換為數字 seed，確保相同 ID 得到相同圖片
  const seed = typeof id === 'string' ? id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : id
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

/**
 * 生成隨機圖片 URL（用於小尺寸，如卡片）
 * @param {number|string} id - 用於生成唯一圖片的 ID
 * @param {number} width - 圖片寬度，默認 300
 * @param {number} height - 圖片高度，默認 200
 * @returns {string} 隨機圖片 URL
 */
export function getRandomThumbnail(id, width = 300, height = 200) {
  return getRandomImage(id, width, height)
}

