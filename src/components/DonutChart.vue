<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>


        <div class="content" style="grid-area: content;">

            <div class="leftBox" style="grid-area: leftBox;">
                <h1>{{ (item.firstNumber / item.secendNumber * 100).toFixed(2) }}%</h1>
                <span>{{ addCommasToNumber(9373) + "/" + addCommasToNumber(12500) }}</span>
                <h5>Remeanling: {{ ((item.firstNumber + item.secendNumber) * 26 /
                    3).toFixed(0)
                }}</h5>
            </div>


            <div id="progressBar" ref="progressBar" class="progressBar" style="grid-area: progressBar;">

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
        const progressBar = this.$refs.progressBar //获取图表父元素
        DonutChart.getInstance(progressBar).createChart()//初始化入口函数
    },
    beforeUnmount() { //将 beforeDestroy 改为 beforeUnmount
        this.chartInstance.disposeChart()
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

.content .progressBar {
    width: 100%;
    height: 100%;
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

.content .progressBar {
    margin-right: 20px;
}

.footer {
    background-color: var(--theDonutFooterBackgroundColor);
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 0 0 20px 20px;
}

@media screen and (max-width: 400px) {
    .footer {
        border-radius: 0 0 10px 10px;
    }
}

.content h5,
.footer h5 {
    color: var(--theDonutFooterH5ANDRemeanlingFontColor);
}
</style>
