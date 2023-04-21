import * as echarts from 'echarts';

export default class MonthLineChart {
    constructor(dom) {
        this.option = null;
        this.dom = dom;
        this.myChart = null;
    }

    // static getInstance() {
    //     if (!MonthLineChart._instance) {
    //         Object.defineProperty(MonthLineChart, "_instance", {
    //             value: new MonthLineChart(...arguments)
    //         });
    //     }
    //     return MonthLineChart._instance;
    // }

    static getInstance(dom) {
        return new MonthLineChart(dom);
    }

    createChart() {
        this.disposeChart();
        this.myChart = echarts.init(this.dom, {
            renderer: 'canvas',
        });
        const dataCollection = [278, 288, 25, 109, 268, 96, 22, 178, 170, 93, 47];

        this.option = {
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true // 隐藏背景网格线
                },
                axisTick: {
                    show: false // 显示刻度线
                },
                axisLine: {
                    show: false // 隐藏坐标轴线
                },
                axisLabel: {
                    color: '#000' // 设置刻度文字颜色
                },
                data: ['Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun'], // 设置刻度标签
                splitNumber: 8 //网格线数量
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false // 隐藏背景网格线
                },
                axisLine: {
                    show: false // 隐藏坐标轴线
                },
                axisTick: {
                    show: false // 隐藏刻度线
                },
                axisLabel: {
                    show: false // 隐藏纵坐标上的数字
                }
            },
            grid: {
                containLabel: true,
                left: 10,
                right: 10,
                top: 20,
                bottom: 20
            },
            series: [
                {
                    data: dataCollection,
                    type: 'line',
                    smooth: true, // 圆滑显示折线
                    symbol: function (value, params) {
                        const dataIndex = params.dataIndex;
                        // 如果当前数据点是数组中的最后一个元素，则将symbol设置为'circle'，否则设置为'none'
                        if (dataIndex === dataCollection.length - 1) {
                            return 'circle';//设置圆点样式
                        } else {
                            return 'none';// 取消圆点
                        }
                    },
                    symbolSize: 5, // 设置圆点大小
                    itemStyle: {
                        color: '#000', // 设置圆点填充颜色
                    },
                    lineStyle: {
                        width: 2,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgb(184, 242, 230)'
                            }, {
                                offset: 0.5,
                                color: 'rgb(66, 185, 131)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 190, 136)'
                            }]
                        }
                    },
                }
            ]
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
