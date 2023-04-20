<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">
        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <div class="timeBox" style="grid-area: timeBox;">
            <h1 class="hours">{{ currentTime.hours }}:</h1>
            <h1 class="minutes">{{ currentTime.minutes }}:</h1>
            <h1 class="seconds">{{ currentTime.seconds }}</h1>
        </div>

        <div class="countDownBox" style="grid-area: countDownBox;">
            <div class="browserleaflets">
                <h6>{{ countDown.browserleaflets.name }}</h6>
                <span> {{ countDown.browserleaflets.value }}</span>
            </div>

            <div class="shoppingList">
                <h6>{{ countDown.shoppingList.name }}</h6>
                <span> {{ countDown.shoppingList.value }}</span>
            </div>

            <div class="others">
                <h6>{{ countDown.others.name }}</h6>
                <span> {{ countDown.others.value }}</span>
            </div>

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
    },
    data() {
        return {
            currentTime: {
                hours: "00",
                minutes: "00",
                seconds: "00",
            },
            countDown: {
                browserleaflets: {
                    name: "Browser leaflets",
                    value: "00:20:35",
                },
                shoppingList: {
                    name: "Shopping List",
                    value: "00:08:29",
                },
                others: {
                    name: "Others",
                    value: "/",
                },
            },
        };
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.currentTime.hours = this.padTime(now.getHours());
            this.currentTime.minutes = this.padTime(now.getMinutes());
            this.currentTime.seconds = this.padTime(now.getSeconds());
        },
        padTime(number) {
            return number.toString().padStart(2, "0");
        },
    },
};
</script>
  
<style scoped>
.timeSpend {
    display: grid;
    grid-template-areas:
        "tittle"
        "timeBox"
        "countDownBox";
}

.timeBox {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 20px;
    align-items: center;
}

.hours {
    color: #cfcfcf;
}

.hours,
.minutes,
.seconds {
    color: var(--theMainFontCorlor);
    font-weight: bold;
}

.countDownBox {
    height: 100%;
    padding: 0 20px;
}

.countDownBox>div {
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.countDownBox>div h6 {
    display: grid;
    align-items: center;
    justify-items: end;
}


.countDownBox>div span {
    display: grid;
    align-items: center;
    justify-items: center;
}

.browserleaflets {
    height: 35px;
}

.browserleaflets span {
    background-color: #31b869;

    border-radius: 10px 10px 0 0;
}

.shoppingList {
    height: 25px;
}

.shoppingList span {
    background-color: #2879ff;
}

.others {
    height: 18px;
}

.others span {
    background-color: #17468a;
    border-radius: 0 0 10px 10px;
}
</style>
  