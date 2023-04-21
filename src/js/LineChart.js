// LineChart.js
import * as echarts from 'echarts';

export default class LineChart {
    constructor(dom) {
        this.dom = dom;
        this.myChart = null;
        this.option = null;
    }

    // static getInstance() {
    //     if (!LineChart._instance) {
    //         Object.defineProperty(LineChart, "_instance", {
    //             value: new LineChart(...arguments)
    //         });
    //     }
    //     return LineChart._instance;
    // }

    static getInstance(dom) {
        return new LineChart(dom);
    }

    createChart() {
        this.myChart = echarts.init(this.dom, null, {
            renderer: 'canvas',
            useDirtyRect: false,
        });

        this.option = {
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                },
                axisLabel: {
                    show: false,
                },
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 300,
                interval: 150,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#000',
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
                    data: [30, 50, 224, 90, 249, 147, 260],
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        color: '#2976ff'
                    }
                }
            ]
        };

        this.myChart.setOption(this.option);
        window.addEventListener('resize', this.myChart.resize);
    }

    disposeChart() {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
            this.option = null;
        }
    }
}
