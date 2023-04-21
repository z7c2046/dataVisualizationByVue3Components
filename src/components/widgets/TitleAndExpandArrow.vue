<template>
    <div class="tittle" style="grid-area: tittle;">
        <h6 :style="{ color: item.isThe4th == true ? item.the4thUniqueFontColor : '' }">{{ itemName }}</h6>
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
        argus: {
            type: String,
            default: 'name1'
        },
    },
    computed: {
        itemName() {
            if (this.argus === 'name1') {
                return this.item.name;
            } else if (this.argus === 'name2') {
                return this.item.name2;
            } else {
                return '';
            }
        },
    }
}
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

@media screen and (max-width: 400px) {
    .tittle h6 {
        /* font-size: 1px; */
    }
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