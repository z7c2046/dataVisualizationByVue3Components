<template>
  <div id="app" class="mainBox">
    <div id="wrap1" class="wrap" style="grid-area: wrap1;">
      <MonthHistogram :item="visibilityData.monthHistogram" :assets="assets" :addCommasToNumber="addCommasToNumber"
        :numberIncreaseRate="numberIncreaseRate">
      </MonthHistogram>
      <LineChart :item="visibilityData.line" :assets="assets" :addCommasToNumber="addCommasToNumber"
        :numberIncreaseRate="numberIncreaseRate">
      </LineChart>
      <LeaderBoard :item="visibilityData.leaderBoard" :assets="assets" :getRankChange="getRankChange">
      </LeaderBoard>
    </div>

    <div id="wrap2" class="wrap" style="grid-area: wrap2;">
      <Donut :item="visibilityData.donut" :assets="assets" :addCommasToNumber="addCommasToNumber">
      </Donut>
      <WeekHistogram :item="visibilityData.weekHistogram" :assets="assets">
      </WeekHistogram>
      <SummaryComponent :item="visibilityData.summary" :assets="assets" :addCommasToNumber="addCommasToNumber"
        :numberIncreaseRate="numberIncreaseRate">
      </SummaryComponent>
    </div>

    <div id="wrap3" class="wrap" style="grid-area: wrap3;">
      <RatioComponent :item="visibilityData.ratio" :assets="assets" :addCommasToNumber="addCommasToNumber"
        :numberIncreaseRate="numberIncreaseRate">
      </RatioComponent>
      <MonthLine :item="visibilityData.monthLine" :assets="assets" :addCommasToNumber="addCommasToNumber"
        :numberIncreaseRate="numberIncreaseRate">
      </MonthLine>
      <TimeSpend :item="visibilityData.timeSpend" :assets="assets">
      </TimeSpend>
    </div>

  </div>


  <div class="mainBoxMobile">
    <!-- Mobile layout HTML goes here -->
    <MonthHistogram :item="visibilityData.monthHistogram" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </MonthHistogram>
    <LineChart :item="visibilityData.line" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </LineChart>
    <LeaderBoard :item="visibilityData.leaderBoard" :assets="assets" :getRankChange="getRankChange">
    </LeaderBoard>
    <Donut :item="visibilityData.donut" :assets="assets" :addCommasToNumber="addCommasToNumber">
    </Donut>
    <WeekHistogram :item="visibilityData.weekHistogram" :assets="assets">
    </WeekHistogram>
    <SummaryComponent :item="visibilityData.summary" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </SummaryComponent>
    <RatioComponent :item="visibilityData.ratio" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </RatioComponent>
    <MonthLine :item="visibilityData.monthLine" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </MonthLine>
    <TimeSpend :item="visibilityData.timeSpend" :assets="assets">
    </TimeSpend>
  </div>
</template>

<script>
import MonthHistogram from './components/MonthHistogram.vue';
import LineChart from './components/LineChart.vue';
import LeaderBoard from './components/LeaderBoard.vue';
import Donut from './components/DonutChart.vue';
import WeekHistogram from './components/WeekHistogram.vue';
import SummaryComponent from './components/SummaryComponent.vue';
import RatioComponent from './components/RatioComponent.vue';
import MonthLine from './components/MonthLine.vue';
import TimeSpend from './components/TimeSpend.vue';

export default {
  components: {
    MonthHistogram,
    LineChart,
    LeaderBoard,
    Donut,
    WeekHistogram,
    SummaryComponent,
    RatioComponent,
    MonthLine,
    TimeSpend,
  },
  data() {
    return {
      visibilityData: {
        monthHistogram: {
          area: "monthHistogram",
          name: "Pages views",
          isExpandArrows: true,
          numberYesterday: 54203434,
          numberToday: 67916238,
        },
        line: {
          area: "line",
          name: "Opening of leaflets",
          isExpandArrows: true,
          numberYesterday: 1654645,
          numberToday: 2129446,
        },
        leaderBoard: {
          area: "leaderBoard",
          name: "Top stores",
          isExpandArrows: true,
          data: [
            { "name": "Google", "link": "https://www.google.com/", "logoURL": require('@/assets/images/dataLogo/google.png'), "viewsToday": 853763648, "viewsYesterday": 840682176 },
            { "name": "YouTube", "link": "https://www.youtube.com/", "logoURL": require('@/assets/images/dataLogo/youtube.png'), "viewsToday": 742581239, "viewsYesterday": 737952012 },
            { "name": "Facebook", "link": "https://www.facebook.com/", "logoURL": require('@/assets/images/dataLogo/facebook.png'), "viewsToday": 964290180, "viewsYesterday": 960374395 },
            { "name": "Twitter", "link": "https://twitter.com/", "logoURL": require('@/assets/images/dataLogo/twitter.png'), "viewsToday": 278503617, "viewsYesterday": 275491548 },
            { "name": "Amazon", "link": "https://www.amazon.com/", "logoURL": require('@/assets/images/dataLogo/amazon.png'), "viewsToday": 601258979, "viewsYesterday": 597256381 },
            { "name": "LinkedIn", "link": "https://www.linkedin.com/", "logoURL": require('@/assets/images/dataLogo/linkedin.png'), "viewsToday": 143276405, "viewsYesterday": 141857316 },
            { "name": "Reddit", "link": "https://www.reddit.com/", "logoURL": require('@/assets/images/dataLogo/reddit.png'), "viewsToday": 369825417, "viewsYesterday": 365943257 },
            { "name": "Wikipedia", "link": "https://www.wikipedia.org/", "logoURL": require('@/assets/images/dataLogo/wikipedia.png'), "viewsToday": 825147692, "viewsYesterday": 822184299 },
            { "name": "Netflix", "link": "https://www.netflix.com/", "logoURL": require('@/assets/images/dataLogo/netflix.png'), "viewsToday": 289753246, "viewsYesterday": 285197434 },
            { "name": "Instagram", "link": "https://www.instagram.com/", "logoURL": require('@/assets/images/dataLogo/instagram-2.png'), "viewsToday": 981456321, "viewsYesterday": 968284983 },
          ],
        },
        donut: {
          area: "donut",
          name: "Todat goals completion",
          isExpandArrows: false,
          isThe4th: true,
          the4thUniqueFontColor: "#95b6f9",
          firstNumber: 78.09,
          secendNumber: 100,
        },
        weekHistogram: {
          area: "weekHistogram",
          name: "Goal completions during the week",
          isExpandArrows: true,
        },
        summary: {
          area: "summary",
          name: "Avg. goals completion per user",
          name2: "Approximately revenue generates",
          isExpandArrows: false,
          numberYesterday: 13546494,
          numberToday: 19215444,
        },
        ratio: {
          area: "ratio",
          name: "Active users",
          isExpandArrows: true,
          numberYesterday: 84756,
          numberToday: 39271,
          browers: 15046,
          favorites: 2118,
          localisations: 972,
          blog: 655,
          xAxisMax: {
            browersMax: 20000,
            favoritesMax: 10000,
            localisationsMax: 2000,
            blogMax: 2000,
          }
        },
        monthLine: {
          area: "monthLine",
          name: "Income",
          isExpandArrows: false,
          numberYesterday: 612365.63,
          numberToday: 981248.48,
        },
        timeSpend: {
          area: "timeSpend",
          name: "Avg. time spent in application",
          isExpandArrows: true,
        }
      },
      assets: {
        arrows: {
          expandArrowURL: require('@/assets/images/resize.png'),
          numberRaiseURL: require('@/assets/images/upper-right-arrow.png'),
          numberDrownURL: require('@/assets/images/lower-right-arrow.png'),
          rankUP: require('@/assets/images/arrow-up.png'),
          rankDown: require('@/assets/images/arrow-down.png'),
        },
      },

    }
  },
  methods: {
    addCommasToNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    numberIncreaseRate(today, yesterday) {
      const increaseRate = ((today - yesterday) / yesterday * 100).toFixed(2);
      return increaseRate;
    },
    // 计算昨天和今天的排名变化
    getRankChange(store) {
      // 获取今天的排名
      const todayRank = this.visibilityData.leaderBoard.data.findIndex(item => item.name === store.name);

      // 对昨天的浏览量进行排序，以计算昨天的排名
      const yesterdayData = [...this.visibilityData.leaderBoard.data].sort((a, b) => b.viewsYesterday - a.viewsYesterday);

      // 获取昨天的排名
      const yesterdayRank = yesterdayData.findIndex(item => item.name === store.name);

      // 计算排名变化并返回结果
      return yesterdayRank - todayRank;
    },
  },
};
</script>

<style>
:root {
  --backGroundColor: #e3e3e3;
  --divBackGroundColor: #ffffff;
  --theMainFontCorlor: #000;
  --theSmallHeaderCorlor: #787878;
  --theArrowRightUP: #38ab70;
  --theArrowRightDOWN: #df4f46;
  --theExpandArrow: #4384ec;
  --theChartColor: #2976ff;

  --theFourthDiveColor: #3f67bf;
  --theFourthDivTittleColor: #95b6f9;
  --theDonutFooterBackgroundColor: #174789;
  --theDonutFooterH5ANDRemeanlingFontColor: #a8cef5;

  --detailBoxWidth: 550px;
  --detailBoxHeight: 600px;

  --theHistogramChartColor2: #cecece;
  --borderColor: #000;
  --gradLinear: linear-gradient(45deg, #f37d42, #9846ec, #54b4e7);
  --gradlinear1: linear-gradient(90deg, #5438d1, #8938d1 60%);
  --gradlinear2: linear-gradient(90deg, #ae41c5, #df51ad 60%);
  --gradlinear3: linear-gradient(90deg, #df51ad, #eb587d 90%);
  --gradlinear4: linear-gradient(90deg, #ec597f, #e4551a 90%);
}

/* 黑暗模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --backGroundColor: #101010;
    --divBackGroundColor: #2d2d2d;
    --theMainFontCorlor: #f9f9f9;
    --theSmallHeaderCorlor: #afafaf;
    --theArrowRightUP: #38ab70;
    --theArrowRightDOWN: #df4f46;
    --theExpandArrow: #4384ec;
    --theChartColor: #2976ff;


    --barColor: #6c6c6c;
    --barBackGroundColor: #afafaf;

  }
}

* {
  margin: 0;
  padding: 0;
  /* 给所有元素都加上边框方便检查 */
  /* border: 1px solid red; */
}

body {
  background-color: var(--backGroundColor);
  width: 98vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  /* 设置字体 */
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-weight: 900;
  /* 为字体设置重量为最重 */

  position: relative;
}

/* 边框方便修改和代码可视化 */
/* .mainBox,
.mainBox .wrap>div {
  border: 2px solid var(--borderColor);
} */

.mainBox {
  width: 1200px;
  height: 600px;
  display: grid;
  row-gap: 40px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "wrap1"
    "wrap2"
    "wrap3";

  /* ======分割线======= */
  /* 为了实现手机端和pc端的效果 */
  position: absolute;
  z-index: 999;
  opacity: 1;
  top: 50%;
  /* 上边缘距离父元素顶部的距离为父元素高度的一半 */
  left: 50%;
  /* 左边缘距离父元素左侧的距离为父元素宽度的一半 */
  transform: translate(-50%, -50%);
  /* 将子元素向上和向左移动自身宽度和高度的一半，即居中 */
}

.mainBox .wrap {
  display: grid;
  column-gap: 40px;
  color: var(--theSmallHeaderCorlor);
}

.mainBox .wrap>div {
  background-color: var(--divBackGroundColor);
  border-radius: 20px;
}


#wrap1 {
  grid-template-columns: 1.72fr 1.36fr 1fr;
  grid-template-areas: "monthHistogram line leaderBoard";
}

#wrap2 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "donut weekHistogram summary";
}

#wrap3 {
  grid-template-columns: 1.72fr 1.36fr 1fr;
  grid-template-areas: "ratio monthLine timeSpend";
}




.mainBoxMobile {
  /* display: none; */
  /* 但是echarts图表不显示了
  [ECharts] Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.For example, you may need to call this in the callback of window.onload.

  这个错误提示的意思是无法获取到DOM的宽度和高度，这可能是因为DOM还没有被正确加载导致的。
  你可以尝试在DOM加载完成后再调用echarts的代码，或者在调用echarts的代码之前确保DOM已经正确加载。
  此外，还可以检查DOM元素是否设置了正确的宽度和高度。
  如果问题仍然存在，可以尝试使用其他调试工具，例如浏览器的开发者工具，来查看错误的具体原因。 */

  /* 问题就是没有媒体查询的时候显示display none，vue不会渲染，所以我是用opacity和z-index试一下   */
  position: absolute;
  opacity: 0;
  z-index: -1;
  /* 问题出现了再到pc端的时候布局失效了 */
  top: 50%;
  /* 上边缘距离父元素顶部的距离为父元素高度的一半 */
  left: 50%;
  /* 左边缘距离父元素左侧的距离为父元素宽度的一半 */
  transform: translate(-50%, -50%);
  /* 将子元素向上和向左移动自身宽度和高度的一半，即居中 */
}

@media screen and (max-width: 400px) {
  body {
    background-color: var(--backGroundColor);
    /* width: 100vw;
    height: 100vh; */
    display: block;
  }

  /* 禁止用户缩放 */
  body {
    touch-action: manipulation;
  }

  html {
    touch-action: pan-x pan-y;
    zoom: 1 !important;
    -ms-content-zooming: none;
    -ms-touch-action: none;
  }

  .mainBox {
    opacity: 0;
    z-index: -999;
  }

  .mainBoxMobile {
    opacity: 1;
    z-index: 1;
  }

  .mainBoxMobile {
    width: 94%;
    height: 100%;
    padding: 2%;
    margin: 0 auto;
    display: grid;
    gap: 1%;
    grid-template-columns: 50% 50%;
    /* grid-template-rows: 1.3fr 1.2fr 1.2fr 1.3fr 1.3fr 1.2fr; */
    grid-template-rows: 25% 20% 20% 25% 25% 20%;
    grid-template-areas:
      "monthHistogram monthHistogram"
      "leaderBoard timeSpend"
      "weekHistogram monthLine"
      "donut donut"
      "ratio ratio"
      "line summary";
  }

  .mainBoxMobile>div {
    color: var(--theSmallHeaderCorlor);
    background-color: var(--divBackGroundColor);
    border-radius: 10px;
  }

  h1 {
    font-size: large;
  }

  span {
    font-size: 10px;
  }
}
</style>