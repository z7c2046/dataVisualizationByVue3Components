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
    async mounted() {
        const chartBox = this.$refs.chartBox;
        MonthHistogramChart.getInstance(chartBox).createChart();
    },
    async beforeUnmount() {
        this.getInstance().disposeChart();
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
