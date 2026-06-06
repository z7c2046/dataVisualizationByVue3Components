<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">

        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>
        <DataWidget :item="item" :assets="assets" :addCommasToNumber="addCommasToNumber"
            :numberIncreaseRate="numberIncreaseRate">
            <!-- number相关代码 -->
        </DataWidget>

        <hr class="divideLine" style="grid-area: divideLine;">
        <!-- <div class="tittle2" style="grid-area: tittle2;">

        </div> -->
        <TitleAndExpandArrow :item="item" :assets="assets" argus="name2" style="grid-area: tittle2;">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <AccountDifference :item="item" :assets="assets" :addCommasToNumber="addCommasToNumber">
            <!-- 账户差额 -->
        </AccountDifference>

    </div>
</template>
  
<script>
import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";
import DataWidget from "./widgets/DataWidget.vue";
import AccountDifference from "./widgets/AccountDifference.vue";
export default {
    components: {
        TitleAndExpandArrow,
        DataWidget,
        AccountDifference
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
.summary {
    display: grid;
    color: var(--theMainFontCorlor);
    grid-template-areas:
        "tittle"
        "number"
        "divideLine"
        "tittle2"
        "AccountDifference";
    align-content: space-evenly;
}

.divideLine {
    margin: 0 20px;
    border: none;
    border-top: 1px solid black;
}
</style>
