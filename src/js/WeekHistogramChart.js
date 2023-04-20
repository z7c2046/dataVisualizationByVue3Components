import * as echarts from 'echarts';

export default class WeekHistogramChart {
    constructor(dom) {
        this.option = null;
        this.dom = dom;
        this.myChart = null;
    }

    static getInstance() {
        if (!WeekHistogramChart._instance) {
            Object.defineProperty(WeekHistogramChart, "_instance", {
                value: new WeekHistogramChart(...arguments)
            });
        }
        return WeekHistogramChart._instance;
    }

    createChart() {
        this.disposeChart();
        this.myChart = echarts.init(this.dom, {
            renderer: 'canvas',
        });

        const today = new Date();
        const dayOfWeek = today.getDay();
        const todayIndex = dayOfWeek;
        const xAxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const yAxisMax = 200;

        this.option = {
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        if (index === todayIndex) {
                            return '{a|' + value + '}';
                        }
                        return value;
                    },
                    rich: {
                        a: {
                            backgroundColor: '#2976ff',
                            color: '#fff',
                            padding: [2, 5],
                            borderRadius: 5
                        }
                    }
                }
            },
            yAxis: {
                type: 'value',
                max: yAxisMax,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            grid: {
                containLabel: false,
                left: 10,
                right: 10,
                top: 20,
                bottom: 20
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                barWidth: '10px',
                itemStyle: {
                    color: function (params) {
                        if (params.dataIndex === todayIndex) {
                            return '#2976ff';
                        }
                        if (params.data >= yAxisMax) {
                            return '#38ab70';
                        }
                        return '#cdcdcd';
                    },
                    borderRadius: 20,
                    backgroundColor: '#e8e8e8'
                },
                backgroundStyle: {
                    color: '#e8e8e8',
                    borderRadius: 10,
                },
                barCategoryGap: '20%',
            }]
        };

        this.myChart.setOption(this.option, true);
    }

    disposeChart() {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
            this.option = null;
        }
    }
}
