<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <DataWidget :item="item" :assets="assets" :addCommasToNumber="addCommasToNumber"
            :numberIncreaseRate="numberIncreaseRate">
            <!-- number相关代码 -->
        </DataWidget>

        <GenerateChart :item="item" :assets="assets">
            <!-- 图表盒子 -->
        </GenerateChart>

    </div>
</template>

<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DataWidget from "./widgets/DataWidget.vue";
import GenerateChart from "./widgets/GenerateChart.vue";

export default {
    components: {
        TitleAndExpandArrow,
        DataWidget,
        GenerateChart,
    },
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        numberIncreaseRate: Function,
    }
};
</script>

<style scoped>
.monthHistogram {
    color: var(--theMainFontCorlor);
    display: grid;
    grid-template-rows: 1fr 2fr 3fr;
    grid-template-areas:
        "tittle"
        "number"
        "chartBox";
}
</style>
