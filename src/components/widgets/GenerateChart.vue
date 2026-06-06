<template>
    <div ref="chartBox" class="chartBox" style="grid-area: chartBox;">
        <!-- 图表盒子 -->
    </div>
</template>
  
  
<script>
import MonthHistogramChart from "@/js/MonthHistogramChart.js";
export default {
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        numberIncreaseRate: Function,
    },
    mounted() {
        const chartBox = this.$refs.chartBox;
        this.chartInstance = MonthHistogramChart.getInstance(chartBox);
        this.chartInstance.createChart();
    },
    beforeUnmount() {
        this.chartInstance?.disposeChart();
    },
};
</script>

  
<style scoped>
.chartBox {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
