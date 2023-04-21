import * as echarts from 'echarts';

export default class MonthHistogramChart {
    constructor(dom) {
        this.option = null;
        this.dom = dom;
        this.myChart = null;
    }

    // 单例模式代码
    // static getInstance() {
    //     if (!MonthHistogramChart._instance) {
    //         Object.defineProperty(MonthHistogramChart, "_instance", {
    //             value: new MonthHistogramChart(...arguments)
    //         });
    //     }
    //     return MonthHistogramChart._instance;
    // }

    static getInstance(dom) {
        return new MonthHistogramChart(dom);
    }

    createChart() {
        this.disposeChart();
        this.myChart = echarts.init(this.dom, {
            renderer: 'canvas',
        });

        this.option = {
            xAxis: {
                type: 'category',
                data: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                max: 200,
                min: 40,
                interval: 40,
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: true,
                },
            },
            grid: {
                containLabel: true,
                left: 20,
                right: 20,
                top: 10,
                bottom: 10,
            },
            series: [
                {
                    data: [204, 237, 233, 43, 77, 88, 138, 195, 7, 68, 43, 100, 145, 89, 276, 68, 268, 118, 274, 166, 110, 259, 121, 285, 177, 208, 71, 250, 292, 90],
                    type: 'bar',
                    barWidth: '5px',
                    itemStyle: {
                        color: '#2976ff',
                        barBorderRadius: 20,
                    },
                    barCategoryGap: '50%',
                },
            ],
        };

        this.myChart.setOption(this.option, true);
        window.addEventListener('resize', this.myChart.resize);
    }

    disposeChart() {
        if (this.myChart) {
            window.removeEventListener('resize', this.myChart.resize);
            this.myChart.dispose();
            this.myChart = null;
            this.option = null;
        }
    }
}
