# 大数据可视化仪表盘

基于 Vue 3 + ECharts 5 构建的响应式数据可视化系统，还原自 Dribbble 设计师 [@Rafal Baran](https://dribbble.com/shots/20714100-Exploration-of-the-charts-widgets-for-data-visualization) 的原型方案。

> 原设计链接：https://dribbble.com/shots/20714100-Exploration-of-the-charts-widgets-for-data-visualization

线上预览：**https://z7c2046.github.io/dataVisualizationByVue3Components/**

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.4.0 | 组件框架 |
| ECharts | ^5.4.2 | 图表渲染 |
| Vite | ^5.0.0 | 构建工具 |

---

## 功能模块

| 组件 | 说明 |
|------|------|
| `DonutChart.vue` | 今日目标完成率环形图，圆环中心内嵌点击光标 SVG 图标 |
| `LineChart.vue` | 页面浏览量折线图 |
| `MonthHistogram.vue` | 月度柱状图 |
| `MonthLine.vue` | 月度折线趋势 |
| `WeekHistogram.vue` | 周目标完成情况柱状图 |
| `LeaderBoard.vue` | 顶部商店排行榜 |
| `SummaryComponent.vue` | 数据汇总卡片 |
| `RatioComponent.vue` | 活跃用户占比 |
| `TimeSpend.vue` | 应用内平均时长 |

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建产物
npm run preview
```

---

## 部署到 GitHub Pages

```bash
npm run deploy
```

构建产物将自动发布到仓库的 `gh-pages` 分支。

> **配置说明：** Vite 的 `base` 已设置为 `/dataVisualizationByVue3Components/`，确保静态资源在 GitHub Pages 子路径下正确加载。

---

## 更新记录

### v0.2.0（2026-06-06）

**工程迁移**
- 从 Vue CLI 迁移至 Vite，启动与构建速度大幅提升
- 修复移动端布局错位问题，完善响应式适配

**功能新增**
- `DonutChart`：圆环中心新增 Apple 风格点击光标图标（`public/assets/images/arraw.svg`）
  - SVG 背景透明化，镂空部分取卡片背景色，与卡片无缝融合
  - 图标几何中心精确对齐 ECharts 圆环圆心（非箭头尖端居中）
  - 使用 `ResizeObserver` + `$nextTick` 确保 canvas 在布局稳定后正确刷新尺寸
  - 通过 `import.meta.env.BASE_URL` 拼接资源路径，兼容 GitHub Pages 子路径部署
  - 桌面端图标宽度 `40px`，移动端自适应缩小至 `36px`
