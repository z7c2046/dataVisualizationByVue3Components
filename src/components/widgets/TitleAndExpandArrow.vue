<template>
    <div class="tittle" style="grid-area: tittle;">
        <h6 :style="{ color: item.isThe4th == true ? item.the4thUniqueFontColor : '' }">{{ item.name }}</h6>
        <!-- 标题 -->
        <div class="expanArrow" style="grid-area: expanArrow;">
            <img v-if="item.isExpandArrows == true" :src="assets.arrows.expandArrowURL" alt="expanArrow">
            <!-- 扩展箭头 -->
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        item: Object,
        assets: Object,
    },
};
</script>
<style scoped>
.tittle {
    padding: 0 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 8fr .5fr;
    grid-template-areas:
        "tittle expanArrow";
}

.tittle h6 {
    font-size: .45em;
    color: var(--theSmallHeaderCorlor);
}

.tittle .expanArrow {
    display: grid;
    justify-content: center;
    /* 控制箭头在这个盒子里面居中对齐 */
}

.tittle .expanArrow img {
    width: 16px;
    height: 16px;
}
</style>