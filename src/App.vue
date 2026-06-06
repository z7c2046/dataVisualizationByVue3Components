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
    <!-- Mobile layout -->
    <MonthHistogram :item="visibilityData.monthHistogram" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </MonthHistogram>
    <LineChart :item="visibilityData.line" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </LineChart>
    <DonutMobile :item="visibilityData.donut" :assets="assets" :addCommasToNumber="addCommasToNumber">
    </DonutMobile>
    <RatioComponent :item="visibilityData.ratio" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </RatioComponent>
    <WeekHistogram :item="visibilityData.weekHistogram" :assets="assets">
    </WeekHistogram>
    <SummaryComponent :item="visibilityData.summary" :assets="assets" :addCommasToNumber="addCommasToNumber"
      :numberIncreaseRate="numberIncreaseRate">
    </SummaryComponent>
    <LeaderBoard :item="visibilityData.leaderBoard" :assets="assets" :getRankChange="getRankChange">
    </LeaderBoard>
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
import DonutMobile from './components/DonutChart.vue';
import WeekHistogram from './components/WeekHistogram.vue';
import SummaryComponent from './components/SummaryComponent.vue';
import RatioComponent from './components/RatioComponent.vue';
import MonthLine from './components/MonthLine.vue';
import TimeSpend from './components/TimeSpend.vue';

// 使用 ES import 替代 require()（Vite 不支持 require）
import expandArrowURL from '@/assets/images/resize.png';
import numberRaiseURL from '@/assets/images/upper-right-arrow.png';
import numberDrownURL from '@/assets/images/lower-right-arrow.png';
import rankUpURL from '@/assets/images/arrow-up.png';
import rankDownURL from '@/assets/images/arrow-down.png';

import googleLogo from '@/assets/images/dataLogo/google.png';
import youtubeLogo from '@/assets/images/dataLogo/youtube.png';
import facebookLogo from '@/assets/images/dataLogo/facebook.png';
import twitterLogo from '@/assets/images/dataLogo/twitter.png';
import amazonLogo from '@/assets/images/dataLogo/amazon.png';
import linkedinLogo from '@/assets/images/dataLogo/linkedin.png';
import redditLogo from '@/assets/images/dataLogo/reddit.png';
import wikipediaLogo from '@/assets/images/dataLogo/wikipedia.png';
import netflixLogo from '@/assets/images/dataLogo/netflix.png';
import instagramLogo from '@/assets/images/dataLogo/instagram-2.png';

export default {
  components: {
    MonthHistogram,
    LineChart,
    LeaderBoard,
    Donut,
    DonutMobile,
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
            { "name": "Google", "link": "https://www.google.com/", "logoURL": googleLogo, "viewsToday": 853763648, "viewsYesterday": 840682176 },
            { "name": "YouTube", "link": "https://www.youtube.com/", "logoURL": youtubeLogo, "viewsToday": 742581239, "viewsYesterday": 737952012 },
            { "name": "Facebook", "link": "https://www.facebook.com/", "logoURL": facebookLogo, "viewsToday": 964290180, "viewsYesterday": 960374395 },
            { "name": "Twitter", "link": "https://twitter.com/", "logoURL": twitterLogo, "viewsToday": 278503617, "viewsYesterday": 275491548 },
            { "name": "Amazon", "link": "https://www.amazon.com/", "logoURL": amazonLogo, "viewsToday": 601258979, "viewsYesterday": 597256381 },
            { "name": "LinkedIn", "link": "https://www.linkedin.com/", "logoURL": linkedinLogo, "viewsToday": 143276405, "viewsYesterday": 141857316 },
            { "name": "Reddit", "link": "https://www.reddit.com/", "logoURL": redditLogo, "viewsToday": 369825417, "viewsYesterday": 365943257 },
            { "name": "Wikipedia", "link": "https://www.wikipedia.org/", "logoURL": wikipediaLogo, "viewsToday": 825147692, "viewsYesterday": 822184299 },
            { "name": "Netflix", "link": "https://www.netflix.com/", "logoURL": netflixLogo, "viewsToday": 289753246, "viewsYesterday": 285197434 },
            { "name": "Instagram", "link": "https://www.instagram.com/", "logoURL": instagramLogo, "viewsToday": 981456321, "viewsYesterday": 968284983 },
          ],
        },
        donut: {
          area: "donut",
          name: "Today goals completion",
          isExpandArrows: false,
          isThe4th: true,
          the4thUniqueFontColor: "#95b6f9",
          firstNumber: 78.09,
          secondNumber: 100,
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
          expandArrowURL,
          numberRaiseURL,
          numberDrownURL,
          rankUP: rankUpURL,
          rankDown: rankDownURL,
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
}

body {
  overflow: hidden;
  background-color: var(--backGroundColor);
  width: 98vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-weight: 900;
  position: relative;
}

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

  position: absolute;
  z-index: 999;
  opacity: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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


/* ===================== 移动端布局 ===================== */
.mainBoxMobile {
  position: absolute;
  opacity: 0;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

/* 断点调整为 768px 覆盖主流手机 */
@media screen and (max-width: 768px) {
  body {
    background-color: var(--backGroundColor);
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }

  /* 禁止用户双指缩放 */
  body {
    touch-action: manipulation;
  }

  html {
    touch-action: pan-x pan-y;
  }

  /* 隐藏 PC 端布局 */
  .mainBox {
    opacity: 0;
    z-index: -999;
    display: none;
  }

  /* 激活移动端布局 */
  .mainBoxMobile {
    opacity: 1;
    z-index: 1;
    pointer-events: auto;
    position: relative;
    top: auto;
    left: auto;

    width: 100%;
    padding: 12px;
    box-sizing: border-box;

    display: grid;
    gap: 12px;
    /* 移动端网格：2列等宽 */
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "monthHistogram monthHistogram"
      "line           line          "
      "donut          donut         "
      "ratio          ratio         "
      "weekHistogram  leaderBoard   "
      "monthLine      summary       "
      "timeSpend      timeSpend     ";
  }

  /* 所有子组件的卡片样式 */
  .mainBoxMobile > div {
    color: var(--theSmallHeaderCorlor);
    background-color: var(--divBackGroundColor);
    border-radius: 14px;
    min-height: 140px;
  }

  /* 全宽卡片需要更多高度 */
  .mainBoxMobile > div.monthHistogram,
  .mainBoxMobile > div.line {
    min-height: 160px;
  }

  .mainBoxMobile > div.donut {
    min-height: 180px;
  }

  .mainBoxMobile > div.ratio {
    min-height: 200px;
  }

  .mainBoxMobile > div.timeSpend {
    min-height: 150px;
  }

  h1 {
    font-size: large;
  }

  span {
    font-size: 10px;
  }
}
</style>