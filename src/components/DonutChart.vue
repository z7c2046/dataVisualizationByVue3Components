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


            <div class="progressBarWrap" style="grid-area: progressBar;">
                <div ref="progressBar" class="progressBar"></div>
                <img
                    class="clickCursorIcon"
                    :src="cursorIconURL"
                    alt=""
                    aria-hidden="true"
                />
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
    data() {
        return {
            // public 资源经 BASE_URL 拼接，兼容 GitHub Pages 子路径部署
            cursorIconURL: import.meta.env.BASE_URL + 'assets/images/arraw.svg',
        };
    },
    mounted() {
        const progressBar = this.$refs.progressBar;
        this.chartInstance = DonutChart.getInstance(progressBar);
        this.chartInstance.createChart();
        this.$nextTick(() => this.resizeChart());
        this.resizeObserver = new ResizeObserver(() => this.resizeChart());
        this.resizeObserver.observe(progressBar);
    },
    methods: {
        resizeChart() {
            this.chartInstance?.myChart?.resize();
        },
    },
    beforeUnmount() {
        this.resizeObserver?.disconnect();
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

.progressBarWrap {
    width: 100%;
    height: 100%;
    position: relative;
}

.progressBar {
    width: 100%;
    height: 100%;
}

.clickCursorIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: auto;
    z-index: 10;
    pointer-events: none;
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

    /* 移动端圆环更小（polar radius [23,30] vs [25,35]），图标等比缩小保持留白一致 */
    .clickCursorIcon {
        width: 36px;
    }
}

.content h5,
.footer h5 {
    color: var(--theDonutFooterH5ANDRemeanlingFontColor);
}
</style>
