<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">
        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <div class="topStores" style="grid-area:topStores;">
            <!-- 排行榜 -->
            <ol>
                <li v-for="(store, index) in item.data.slice(0, 5)" :key="index" class="leaderboard-item">
                    <!-- 显示商店名称 -->
                    <span class="webName" style="grid-area: webName">{{ store.name }}</span>

                    <!-- 显示商店Logo -->
                    <img class="store-logo" :src="store.logoURL" :alt="store.name" style="grid-area: store-logo" />

                    <!-- 根据getRankChange方法的结果显示排名变化和箭头 -->
                    <span class="positive-and-negative-numbers" :style="{
                            color: getRankChange(store) > 0 ? '#38ab70' : '#df4f46',
                        }" style="grid-area: positive-and-negative-numbers">
                        {{ getRankChange(store) > 0 ? "+" : "" }}{{ getRankChange(store) }}
                    </span>

                    <!-- 如果排名上升，显示正数和上升箭头 -->
                    <!-- 如果排名下降，显示负数和下降箭头 -->
                    <img class="rankArrow" :src="getRankChange(store) > 0 ? assets.arrows.rankUP : assets.arrows.rankDown"
                        :alt="getRankChange(store) > 0 ? 'rank up' : 'rank down'" style="grid-area: rankArrow" />
                </li>
            </ol>
        </div>
    </div>
</template>
  
<script>

import TitleAndExpandArrow from "./widgets/TitleAndExpandArrow.vue";

export default {
    components: {
        TitleAndExpandArrow,
    },
    props: {
        item: Object,
        assets: Object,
        getRankChange: Function,
    }
};
</script>

<style scoped>
.leaderBoard {
    display: grid;
    grid-template-rows: 1fr 5fr;
    grid-template-areas:
        "tittle"
        "topStores";
}

.topStores {
    padding: 0 40px;
}

.topStores ol {
    counter-reset: li;
    display: grid;
}

.topStores ol li {
    display: grid;
    column-gap: 10px;
    align-items: center;
    grid-template-columns: 3fr 4fr 0fr 0fr;
    grid-template-areas: "webName store-logo positive-and-negative-numbers rankArrow";
    position: relative;
}

.topStores ol li::before {
    content: counter(li) "\00B7";
    /* 使用counter属性显示数字 */
    counter-increment: li;
    /* 自增计数器 */
    position: absolute;
    /* 相对定位 */
    left: -20px;
    color: var(--theMainFontCorlor);
}

.topStores .store-logo {
    width: 12px;
    height: 12px;
}

.webName {
    color: var(--theMainFontCorlor);
}

.topStores .rankArrow {
    width: 15px;
    height: 10px;
}
</style>
  