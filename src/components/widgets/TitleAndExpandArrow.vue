<template>
    <div class="tittle" style="grid-area: tittle;" :style="{ cursor: item.isExpandArrows ? 'pointer' : 'default' }" @click="handleExpand">
        <h6 :style="{ color: item.isThe4th == true ? item.the4thUniqueFontColor : '' }">{{ itemName }}</h6>
        <!-- 标题 -->
        <div class="expanArrow" style="grid-area: expanArrow;">
            <img v-if="item.isExpandArrows == true" :src="assets.arrows.expandArrowURL" alt="expanArrow" title="展开详情">
            <!-- 扩展箭头 -->
        </div>
    </div>
</template>
  
<script>
export default {
    inject: {
        openWidgetModal: {
            default: null
        }
    },
    props: {
        item: Object,
        assets: Object,
        argus: {
            type: String,
            default: 'name1'
        },
    },
    emits: ['expand'],
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
    },
    methods: {
        handleExpand() {
            if (!this.item || !this.item.isExpandArrows) return;
            this.$emit('expand', this.item);
            if (this.openWidgetModal) {
                this.openWidgetModal(this.item.area);
            }
        }
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

@media screen and (max-width: 768px) {
    .tittle h6 {
        /* font-size: 1px; */
    }
}

.tittle .expanArrow {
    display: grid;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /* 控制箭头在这个盒子里面居中对齐 */
}

.tittle .expanArrow img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
}

.tittle .expanArrow img:hover {
    transform: scale(1.3);
    opacity: 0.85;
}
</style>