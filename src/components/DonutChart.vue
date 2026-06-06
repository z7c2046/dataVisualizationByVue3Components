<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>


        <div class="content" style="grid-area: content;">

            <div class="leftBox" style="grid-area: leftBox;">
                <h1>{{ (item.firstNumber / item.secondNumber * 100).toFixed(2) }}%</h1>
                <span>{{ addCommasToNumber(9373) + "/" + addCommasToNumber(12500) }}</span>
                <h5>Remaining: {{ ((item.firstNumber + item.secondNumber) * 26 /
                    3).toFixed(0)
                }}</h5>
            </div>


            <!-- progressBar 容器：相对定位，让 SVG 图标可以绝对居中覆盖 -->
            <div class="progressBarWrap" style="grid-area: progressBar;">
                <div ref="progressBar" class="progressBar"></div>

                <!-- Apple 风格鼠标 + 点击发散特效 SVG，1:1 比例，居中覆盖在圆环内 -->
                <svg
                    class="clickCursorIcon"
                    viewBox="0 0 44 44"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    aria-hidden="true"
                >
                    <!--
                        设计说明：
                        - 箭头光标：Apple SF Symbols 风格，尖端朝向左上角
                        - 光标尖端坐标约 (19, 13)，视觉重心居中于 44x44 画布
                        - 5 条发散短线模拟点击特效，从光标尖端四周向外辐射
                    -->

                    <!-- ===== 点击发散特效：5 条短线 ===== -->

                    <!-- 左上 45° 斜线 -->
                    <line
                        x1="15.5" y1="10.5"
                        x2="11.5" y2="6.5"
                        stroke="white" stroke-width="2.2" stroke-linecap="round"
                    />
                    <!-- 正上方竖线 -->
                    <line
                        x1="20" y1="9"
                        x2="20" y2="4.5"
                        stroke="white" stroke-width="2.2" stroke-linecap="round"
                    />
                    <!-- 右上 45° 斜线 -->
                    <line
                        x1="24" y1="10.5"
                        x2="27.5" y2="7"
                        stroke="white" stroke-width="2.2" stroke-linecap="round"
                    />
                    <!-- 正左方横线 -->
                    <line
                        x1="14.5" y1="15"
                        x2="10" y2="15"
                        stroke="white" stroke-width="2.2" stroke-linecap="round"
                    />
                    <!-- 左下 135° 斜线 -->
                    <line
                        x1="13.5" y1="19.5"
                        x2="10" y2="23"
                        stroke="white" stroke-width="2.2" stroke-linecap="round"
                    />

                    <!-- ===== Apple 风格箭头光标 ===== -->
                    <!--
                        路径描述：
                        M 19,13      → 光标尖端（hotspot）
                        L 19,35      → 沿左边缘向下
                        L 23.2,30    → 内侧缺口左边（折向右）
                        L 26.5,37.5  → 右侧小尾巴底部
                        L 29,36.5    → 右侧小尾巴右边
                        L 25.8,29    → 内侧缺口右边（折向上）
                        L 31,29      → 右上角
                        Z            → 闭合回尖端
                    -->
                    <path
                        d="M 19,13 L 19,35 L 23.2,30 L 26.5,37.5 L 29,36.5 L 25.8,29 L 31,29 Z"
                        fill="white"
                        stroke="rgba(55,90,170,0.25)"
                        stroke-width="0.6"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
        </div>


        <div class="footer" style="grid-area: footer;">
            <h5>Yesterday completion: {{ addCommasToNumber(6713) }} 51%</h5>
        </div>
    </div>
</template>

<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DonutChart from '@/js/DonutChart.js'

export default {
    components: {
        TitleAndExpandArrow,
    },
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
    },
    mounted() {
        const progressBar = this.$refs.progressBar;
        this.chartInstance = DonutChart.getInstance(progressBar);
        this.chartInstance.createChart();
    },
    beforeUnmount() {
        this.chartInstance?.disposeChart();
    }


}

</script>

<style scoped>
.donut {
    background-color: var(--theFourthDiveColor) !important;
    display: grid;
    grid-template-rows: 1fr 3.5fr 1.5fr;
    grid-template-areas:
        "tittle"
        "content"
        "footer";
}


.content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "leftBox progressBar";
    align-items: center;
    align-content: center;
}

/* progressBar 外层容器：需要 relative 定位使 SVG 图标可绝对居中 */
.progressBarWrap {
    position: relative;
    width: 100%;
    height: 100%;
    margin-right: 20px;
}

/* ECharts 渲染容器：填满外层 */
.progressBar {
    width: 100%;
    height: 100%;
}

/* 光标 SVG 图标：绝对居中，浮于 ECharts canvas 之上 */
.clickCursorIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    /* 44px 图标水平向左偏移约 4px，使光标视觉重心（而非尖端）落在圆心 */
    transform: translate(calc(-50% - 4px), calc(-50% - 4px));
    width: 44px;
    height: 44px;
    pointer-events: none; /* 不拦截鼠标事件 */
    z-index: 10;          /* 确保在 ECharts canvas 之上 */
    filter: drop-shadow(0 1px 3px rgba(23, 71, 137, 0.4));
}

.content .leftBox h1 {
    color: #FFF;
}

.content .leftBox span {
    color: var(--theFourthDivTittleColor);
}

.content .leftBox {
    padding-left: 20px;
}

.footer {
    background-color: var(--theDonutFooterBackgroundColor);
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 0 0 20px 20px;
}

@media screen and (max-width: 768px) {
    .footer {
        border-radius: 0 0 10px 10px;
    }
}

.content h5,
.footer h5 {
    color: var(--theDonutFooterH5ANDRemeanlingFontColor);
}
</style>
