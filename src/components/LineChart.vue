<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <DataWidget :item="item" :assets="assets" :addCommasToNumber="addCommasToNumber"
            :numberIncreaseRate="numberIncreaseRate">
            <!-- number相关代码 -->
        </DataWidget>

        <div ref="chartBox" class="chartBox" style="grid-area: chartBox;">
            <!-- 图表盒子 -->
        </div>
    </div>
</template>
  
<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DataWidget from "./widgets/DataWidget.vue";
import LineChart from '@/js/LineChart.js';

export default {
    components: {
        TitleAndExpandArrow,
        DataWidget,
    },
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        numberIncreaseRate: Function,
    },
    mounted() {
        const chartBox = this.$refs.chartBox;
        LineChart.getInstance(chartBox).createChart();
    },
    beforeUnmount() {
        LineChart.getInstance().disposeChart();
    },
};
</script >
  
<style scoped>
.line {
    color: var(--theMainFontCorlor);
    display: grid;
    grid-template-rows: 1fr 2fr 3fr;
    grid-template-areas:
        "tittle"
        "number"
        "chartBox";
}

/* 图表栏 */
.chartBox {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
