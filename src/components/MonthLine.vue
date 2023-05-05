<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <DataWidget :item="item" :assets="assets" :addCommasToNumber="addCommasToNumber"
            :numberIncreaseRate="numberIncreaseRate">
            <!-- Number相关代码 -->
        </DataWidget>

        <div ref="chartBox" class="chartBox" style="grid-area: chartBox;">
            <!-- 图表盒子 -->
        </div>
    </div>
</template>
  
<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DataWidget from "./widgets/DataWidget.vue";
import MonthLineChart from '@/js/MonthLineChart.js'

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
        const chartBox = this.$refs.chartBox //获取图表父元素
        MonthLineChart.getInstance(chartBox).createChart()//初始化入口函数
    },
    beforeUnmount() { //将 beforeDestroy 改为 beforeUnmount
        this.getInstance().disposeChart()
    }

};
</script>
  
<style scoped>
.monthLine {
    color: var(--theMainFontCorlor);
    display: grid;
    grid-template-rows: 1fr 2fr 4fr;
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
    display: grid;
    align-content: center;
    justify-items: center;
}
</style>
