<template>
    <div class="box">
        <div ref="chart" class="chart"></div>
    </div>
</template>
  
<script>
import HorizontalBarChart from '@/js/HorizontalBarChart.js'


export default {
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        serialNumber: Number,
    },
    mounted() {
        const chart = this.$refs.chart; // 获取图表父元素
        this.instance = HorizontalBarChart.getInstance(chart, this.item, this.serialNumber);
        this.instance.createChart();
    },
    beforeUnmount() {
        this.instance.disposeChart();
    }
}
</script>
  
<style scoped>
.box {
    position: relative;
}

.chart {
    width: 180px;
    height: 50px;
}
</style>
  