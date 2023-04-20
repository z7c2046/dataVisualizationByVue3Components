<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>


        <div ref="chartBox" class="chartBox" style="grid-area: chartBox;">
            <!-- 图表盒子 -->
        </div>
    </div>
</template>
  
<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import WeekHistogramChart from '@/js/WeekHistogramChart.js'

export default {
    components: {
        TitleAndExpandArrow,
    },
    props: {
        item: Object,
        assets: Object,
    },
    mounted() {
        const chartBox = this.$refs.chartBox //获取图表父元素
        WeekHistogramChart.getInstance(chartBox).createChart()//初始化入口函数
    },
    beforeUnmount() { //将 beforeDestroy 改为 beforeUnmount
        this.getInstance().disposeChart()
    }
};
</script>


<style scoped>
.weekHistogram {
    display: grid;
    color: var(--theMainFontCorlor);
    grid-template-rows: 1fr 5fr;
    grid-template-areas:
        "tittle"
        "chartBox";
}

/* 图表栏 */
.chartBox {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
