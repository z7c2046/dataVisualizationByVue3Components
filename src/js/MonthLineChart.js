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

        // 判断是否是黑夜模式
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // 是就设置为白色，不然就是黑色
        const circleColor = isDarkMode ? '#fff' : '#000';
        this.option = {
            animation: true,
            animationDuration: 1800,
            animationEasing: 'cubicInOut',
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
                    animation: true,
                    animationDuration: 1800,
                    animationEasing: 'cubicInOut',
                    symbol: function (value, params) {
                        const dataIndex = params.dataIndex;
                        if (dataIndex === dataCollection.length - 1) {
                            return 'circle';
                        } else {
                            return 'none';
                        }
                    },
                    symbolSize: 5,
                    itemStyle: {
                        color: circleColor,
                    },
                    lineStyle: {
                        width: 2.5,
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
        this._resizeHandler = () => {
            if (this._rafId) cancelAnimationFrame(this._rafId);
            this._rafId = requestAnimationFrame(() => {
                this.myChart?.resize();
            });
        };
        window.addEventListener('resize', this._resizeHandler);
    }

    disposeChart() {
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        if (this.myChart) {
            window.removeEventListener('resize', this._resizeHandler);
            this.myChart.dispose();
            this.myChart = null;
            this.option = null;
        }
    }
}
