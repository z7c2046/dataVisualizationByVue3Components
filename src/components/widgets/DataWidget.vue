<template>
    <div class="number" style="grid-area: number;">
        <h1>{{ addCommasToNumber(item.numberToday) }}</h1>
        <!-- 使用parseFloat函数将字符串类型的增长率转换为浮点数，从而确保条件判断正确。然后，我们根据条件结果来动态地设置不同的颜色样式。 -->
        <span :style="{
            color: parseFloat(numberIncreaseRate(item.numberToday, item.numberYesterday)) > 0 ? '#38ab70' : '#df4f46'
        }">
            {{ numberIncreaseRate(item.numberToday, item.numberYesterday) }}%
        </span>
        <img :src="item.numberToday > item.numberYesterday ? assets.arrows.numberRaiseURL : assets.arrows.numberDrownURL"
            alt="" />
    </div>
</template>
  
<script>
export default {
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
        numberIncreaseRate: Function,
    },
}
</script>
  
<style scoped>
/* 数字栏 */
.number {
    padding: 0 20px;
    display: grid;
    column-gap: 10px;
    grid-template-columns: 2fr 1fr 5fr;
    align-content: space-evenly;
    align-items: baseline;
    justify-items: start;
}

.number h1 {
    color: var(--theMainFontCorlor);
}

.number img {
    width: 16px;
    height: 16px;
}
</style>
  