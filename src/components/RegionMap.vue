<template>
  <div class="map-container">
    <div class="map-visual">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 774 569"
        aria-label="Map of China" 
        class="china-map"
        ref="mapSvg"
      >
        <path 
          v-for="item in chinaMapData"
          :key="item.i"
          :d="item.d"
          :id="item.i"
          class="province"
          :class="{
            'active': currentProvince?.i === item.i,
            'has-data': hasProvinceData(item)
          }"
          @mouseover="handleHover(item)"
          @mouseout="handleMouseLeave"
          @click="handleClick(item)"
        />
      </svg>

      <!-- 地图标题 -->
      <div class="map-title">
        {{ t('map.productionAreas') }}
      </div>

      <!-- 地图数据来源标注 -->
      <div class="map-attribution">
        Map data from mapsvg.com
      </div>

      <!-- 标记点和连接线 -->
      <div v-if="currentProvince && hasProvinceData(currentProvince)"
        class="marker-container"
        :style="getMarkerPosition(currentProvince.i)">
        <div class="marker-point"></div>
        <div class="marker-line"></div>
      </div>

      <!-- 提示框 -->
      <div 
        v-if="currentProvince && hasProvinceData(currentProvince)"
        class="map-tooltip"
        :style="getTooltipPosition(currentProvince.i)"
      >
        <div class="tooltip-content">
          <h3>{{ language === 'zh' ? currentProvince.n.c : currentProvince.n.e }}</h3>
          <p>{{ language === 'zh' ? currentProvince.p.c : currentProvince.p.e }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { chinaMapData } from '@/config/china-map'
import { useI18n } from 'vue-i18n'

interface ProvinceData {
  i: string
  d: string
  n: {
    c: string
    e: string
  }
  p: {
    c: string
    e: string
  }
}

const mapSvg = ref<SVGSVGElement | null>(null)
const currentProvince = ref<ProvinceData | null>(null)
const language = ref('en')
const activeProvinceIndex = ref(0)
let intervalId: number | null = null
const windowSize = ref({
  width: window.innerWidth,
  height: window.innerHeight
})

const { locale, t } = useI18n()

// 监听 i18n locale 的变化，同步更新 language
watch(() => locale.value, (newLocale) => {
  language.value = newLocale
}, { immediate: true })

// 特殊省份位置修正配置
const POSITION_ADJUSTMENTS: Record<string, { x: number; y: number }> = {
  'heilongjiang': { x: 690, y: 130 },
  'shanghai': { x: 605, y: 390 },
  'hebei': { x: 530, y: 280 },
  // 可以添加其他需要特殊处理的省份
}

// 更新窗口尺寸
const updateWindowSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

// 强制更新当前省份位置
const updateCurrentProvincePosition = () => {
  if (currentProvince.value) {
    // 保存当前省份
    const temp = currentProvince.value
    // 触发重新渲染
    currentProvince.value = null
    // 在下一个tick恢复省份
    setTimeout(() => {
      currentProvince.value = temp
    }, 0)
  }
}

// 检查省份是否有产品数据
const hasProvinceData = (province: ProvinceData) => {
  return province.p.c.trim() !== '' && province.p.e.trim() !== ''
}

// 筛选出有产品数据的省份
const provincesWithData = chinaMapData.filter(hasProvinceData)

// 计算路径的质心
const calculateCentroid = (path: SVGPathElement) => {
  // 获取路径的所有点
  const pathLength = path.getTotalLength()
  const points: { x: number; y: number }[] = []
  const step = pathLength / 200 // 更密集的采样点
  
  // 收集路径上的点
  for (let i = 0; i <= pathLength; i += step) {
    const point = path.getPointAtLength(i)
    points.push({ x: point.x, y: point.y })
  }
  
  // 计算多边形面积和质心
  let area = 0
  let cx = 0
  let cy = 0
  
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    const p1 = points[i]
    const p2 = points[j]
    
    const factor = (p1.x * p2.y - p2.x * p1.y)
    area += factor
    
    cx += (p1.x + p2.x) * factor
    cy += (p1.y + p2.y) * factor
  }
  
  area /= 2
  const f = area * 6
  
  return {
    x: cx / f,
    y: cy / f
  }
}

// 优化点的位置
const optimizePosition = (centroid: { x: number; y: number }, path: SVGPathElement, provinceId: string) => {
  // 检查是否有特殊位置修正
  if (POSITION_ADJUSTMENTS[provinceId]) {
    return POSITION_ADJUSTMENTS[provinceId]
  }

  const bbox = path.getBBox()
  const margin = 20 // 边缘安全距离
  
  // 确保点不会太靠近边缘
  return {
    x: Math.max(bbox.x + margin, Math.min(bbox.x + bbox.width - margin, centroid.x)),
    y: Math.max(bbox.y + margin, Math.min(bbox.y + bbox.height - margin, centroid.y))
  }
}

const getMarkerPosition = (provinceId: string) => {
  if (!mapSvg.value) return {}
  
  const path = mapSvg.value.querySelector(`#${provinceId}`) as SVGPathElement
  if (!path) return {}

  const point = mapSvg.value.createSVGPoint()
  
  // 计算省份的质心
  const centroid = calculateCentroid(path)
  // 优化位置，传入provinceId用于特殊处理
  const optimizedPosition = optimizePosition(centroid, path, provinceId)
  
  // 设置点的坐标
  point.x = optimizedPosition.x
  point.y = optimizedPosition.y
  
  // 获取当前的变换矩阵
  const ctm = mapSvg.value.getScreenCTM()
  if (!ctm) return {}
  
  // 转换点到屏幕坐标
  const screenPoint = point.matrixTransform(ctm)
  
  // 获取SVG元素的位置
  const svgRect = mapSvg.value.getBoundingClientRect()
  
  return {
    position: 'absolute',
    left: `${screenPoint.x - svgRect.left}px`,
    top: `${screenPoint.y - svgRect.top}px`,
    transform: 'translate(-50%, -50%)'
  }
}

const getTooltipPosition = (provinceId: string) => {
  if (!mapSvg.value) return {}
  
  const path = mapSvg.value.querySelector(`#${provinceId}`) as SVGPathElement
  if (!path) return {}

  const point = mapSvg.value.createSVGPoint()
  const centroid = calculateCentroid(path)
  
  // 优化位置，传入provinceId用于特殊处理
  const optimizedPosition = optimizePosition(centroid, path, provinceId)
  
  point.x = optimizedPosition.x
  point.y = optimizedPosition.y
  
  const ctm = mapSvg.value.getScreenCTM()
  if (!ctm) return {}
  
  const screenPoint = point.matrixTransform(ctm)
  const svgRect = mapSvg.value.getBoundingClientRect()
  
  return {
    position: 'absolute',
    left: `${screenPoint.x - svgRect.left}px`,
    top: `${screenPoint.y - svgRect.top - 80}px`,
    transform: 'translate(-50%, -50%)'
  }
}

const handleHover = (item: ProvinceData) => {
  if (!hasProvinceData(item)) return
  currentProvince.value = item
  
  // 悬停时暂停轮播
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const handleMouseLeave = () => {
  currentProvince.value = null
  // 鼠标离开时恢复轮播
  if (!intervalId && provincesWithData.length > 0) {
    startCarousel()
  }
}

const handleClick = (item: ProvinceData) => {
  if (!hasProvinceData(item)) return
  console.log('Selected:', item.n[language.value])
}

// 自动轮播函数
const startCarousel = () => {
  intervalId = window.setInterval(() => {
    activeProvinceIndex.value = (activeProvinceIndex.value + 1) % provincesWithData.length
    currentProvince.value = provincesWithData[activeProvinceIndex.value]
  }, 3000)
}

onMounted(() => {
  if (provincesWithData.length > 0) {
    currentProvince.value = provincesWithData[0]
    startCarousel()
  }
  // 添加窗口resize事件监听
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  // 移除窗口resize事件监听
  window.removeEventListener('resize', updateWindowSize)
})

// 监听窗口尺寸变化
watch(windowSize, () => {
  updateCurrentProvincePosition()
}, { deep: true })
</script>
