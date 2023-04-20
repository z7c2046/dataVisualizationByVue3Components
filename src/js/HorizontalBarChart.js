import * as echarts from 'echarts';

export default class HorizontalBarChart {
    constructor(dom, obj, index) {
        this.option = null;
        this.dom = dom;
        this.myChart = null;
        this.obj = obj;
        this.index = 4 + index;
        // 为什么是4+index？
        // 因为我的
        // ratio: {
        //     area: "ratio",---------0
        //     name: "Active users",---------1
        //     isExpandArrows: true,---------2
        //     numberYesterday: 84756,---------3
        //     numberToday: 39271,---------4
        //     browers: 15046,---------0
        //     ...
        //   },
        //所以+上index
        // 而index就是我在rationComponent 里面的4个的HorizontalBarChart的次数
        // 就是引用4次
    }

    static getInstance(dom, obj, index) {
        return new HorizontalBarChart(dom, obj, index);
    }


    createChart() {
        this.disposeChart();
        this.myChart = echarts.init(this.dom, {
            renderer: 'canvas',
            // width: 160,
            // height: 30,
        });


        const data = this.obj[Object.keys(this.obj)[this.index]];
        const barName = Object.keys(this.obj)[this.index];
        // 首先，从 ratio 对象中获取 xAxisMax 对象：
        const xAxisMaxObj = this.obj.xAxisMax;
        // 然后，使用 Object.keys() 获取 xAxisMaxObj 的键，然后使用您的 index 减 5 来获取正确的最大值：
        const xAxisMaxKey = Object.keys(xAxisMaxObj)[this.index - 5];
        const xAxisMax = xAxisMaxObj[xAxisMaxKey];

        // alert(xAxisMax);

        this.option = {
            xAxis: {
                show: false,
                max: xAxisMax,
            },
            yAxis: {
                type: "category",
                show: false,
            },
            grid: {
                containLabel: false,
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
            series: [{
                type: 'bar',
                barWidth: '30px',
                data: [data],
                showBackground: true,
                itemStyle: {
                    color: '#cecece',
                    borderRadius: 10,
                },
                backgroundStyle: {
                    color: '#e8e8e8',
                    borderRadius: 10,
                },
                emphasis: {
                    itemStyle: {
                        color: '#cecece',
                    }
                }
            }],
            graphic: [
                {
                    type: 'text',
                    left: '13%', // 调整文本相对于左侧的位置
                    top: '42%', // 设置垂直居中
                    style: {
                        text: barName,
                        textAlign: 'left',
                        textVerticalAlign: 'middle',
                        fontSize: 12,
                        fontWeight: 'bold',
                        fill: '#000',
                    },
                    z: 100 // 将 z 属性设置为一个较高的值，确保文本位于背景层而不是柱子层
                },
                {
                    type: 'text',
                    right: '13%', // 调整文本相对于右侧的位置
                    top: '42%', // 设置垂直居中
                    style: {
                        text: data, // 将数值写在这里，或者用一个变量替换
                        textAlign: 'right',
                        textVerticalAlign: 'middle',
                        fontSize: 12,
                        fontWeight: 'bold',
                        fill: '#000',
                    },
                    z: 100 // 将 z 属性设置为一个较高的值，确保文本位于背景层而不是柱子层
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