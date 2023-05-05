<template>
    <div :id="item.area" :class="item.area" :style="{ 'grid-area': item.area }">
        <TitleAndExpandArrow :item="item" :assets="assets">
            <!-- 标题和扩展箭头代码 -->
        </TitleAndExpandArrow>

        <div class="timeBox" style="grid-area: timeBox;">
            <h1 class="hours">{{ currentTime.hours }}</h1>
            <h1>:</h1>
            <h1 class="minutes">{{ currentTime.minutes }}</h1>
            <h1>:</h1>
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
                    totalSeconds: 20 * 60 + 35, // 初始化 browserleaflets 倒计时为 00 小时 20 分钟 35 秒
                },
                shoppingList: {
                    name: "Shopping List",
                    value: "00:00:00",
                    totalSeconds: 0, // 初始化 shoppingList 累加时间为 00 小时 00 分钟 00 秒
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
        setInterval(this.updateTime, 1000); // 每 1000 毫秒（1 秒）更新一次时间
        window.addEventListener('resize', this.handleResize); // 添加窗口大小变化事件侦听器
        this.handleResize(); // 初始化时调用一次，以处理可能的小屏幕
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.currentTime.hours = this.padTime(now.getHours());
            this.currentTime.minutes = this.padTime(now.getMinutes());
            this.currentTime.seconds = this.padTime(now.getSeconds());

            // 更新 browser leaflets 倒计时
            if (this.countDown.browserleaflets.totalSeconds > 0) {
                this.countDown.browserleaflets.totalSeconds -= 1;
                let leafletHours = Math.floor(this.countDown.browserleaflets.totalSeconds / 3600);
                let leafletMinutes = Math.floor((this.countDown.browserleaflets.totalSeconds % 3600) / 60);
                let leafletSeconds = this.countDown.browserleaflets.totalSeconds % 60;
                // 更新 browser leaflets 显示值，格式为 时:分:秒
                this.countDown.browserleaflets.value = `${this.padTime(leafletHours)}:${this.padTime(leafletMinutes)}:${this.padTime(leafletSeconds)}`;
            }

            // 更新 shopping list 累加时间
            this.countDown.shoppingList.totalSeconds += 1;
            let shoppingListHours = Math.floor(this.countDown.shoppingList.totalSeconds / 3600);
            let shoppingListMinutes = Math.floor((this.countDown.shoppingList.totalSeconds % 3600) / 60);
            let shoppingListSeconds = this.countDown.shoppingList.totalSeconds % 60;
            // 更新 shopping list 显示值，格式为 时:分:秒
            this.countDown.shoppingList.value = `${this.padTime(shoppingListHours)}:${this.padTime(shoppingListMinutes)}:${this.padTime(shoppingListSeconds)}`;
        },
        // 用于补全时间数字，使其始终为两位数，例如 1 变为 01
        padTime(number) {
            return number.toString().padStart(2, "0");
        },
        handleResize() {
            /* 再屏幕宽度小于400的时候，
            name: "Browser leaflets",
                name: "Shopping List",
                    将他俩的值的内容改为Browser和Shopping */
            if (window.innerWidth < 400) {
                this.countDown.browserleaflets.name = "Browser";
                this.countDown.shoppingList.name = "Shopping";
            } else {
                this.countDown.browserleaflets.name = "Browser leaflets";
                this.countDown.shoppingList.name = "Shopping List";
            }
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
    grid-template-columns: repeat(5, 1fr);
    padding: 0 20px;
    align-items: center;
    justify-items: center;
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
    color: white;
    background-color: #31b869;
    border-radius: 10px 10px 0 0;
}

.shoppingList {
    height: 25px;
}

.shoppingList span {
    color: white;
    background-color: #2879ff;
}

.others {
    height: 18px;
}

.others span {
    color: white;
    background-color: #17468a;
    border-radius: 0 0 10px 10px;
}
</style>
  