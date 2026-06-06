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
            <HorizontalBarChart :item="item" :addCommasToNumber="addCommasToNumber" :serialNumber=1
                style="grid-area: left-up;">
            </HorizontalBarChart>
            <HorizontalBarChart :item="item" :addCommasToNumber="addCommasToNumber" :serialNumber=2
                style="grid-area: right-up;">
            </HorizontalBarChart>
            <HorizontalBarChart :item="item" :addCommasToNumber="addCommasToNumber" :serialNumber=3
                style="grid-area: left-down;">
            </HorizontalBarChart>
            <HorizontalBarChart :item="item" :addCommasToNumber="addCommasToNumber" :serialNumber=4
                style="grid-area: right-down;">
            </HorizontalBarChart>
        </div>
    </div>
</template>
  
<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DataWidget from "./widgets/DataWidget.vue";
import HorizontalBarChart from "./widgets/HorizontalBarChart.vue";

export default {
    components: {
        TitleAndExpandArrow,
        DataWidget,
        HorizontalBarChart,
    },
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        numberIncreaseRate: Function,
    },
};
</script>
  
<style scoped>
.ratio {
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
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "left-up right-up "
        "left-down right-down";
    align-items: center;
}
</style>
