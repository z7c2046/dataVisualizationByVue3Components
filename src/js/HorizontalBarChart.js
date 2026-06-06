import * as echarts from 'echarts';

export default class HorizontalBarChart {
    // serialNumber: 1=browsers, 2=favorites, 3=localisations, 4=blog
    static _FIELD_MAP = [
        { dataKey: 'browers',       maxKey: 'browersMax' },
        { dataKey: 'favorites',     maxKey: 'favoritesMax' },
        { dataKey: 'localisations', maxKey: 'localisationsMax' },
        { dataKey: 'blog',          maxKey: 'blogMax' },
    ];

    constructor(dom, obj, serialNumber) {
        this.option = null;
        this.dom = dom;
        this.myChart = null;
        this.obj = obj;
        // 通过显式字段名映射取代脆弱的 index 偏移量，避免依赖 JS 对象属性顺序
        this._fieldInfo = HorizontalBarChart._FIELD_MAP[serialNumber - 1] || HorizontalBarChart._FIELD_MAP[0];
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


        const { dataKey, maxKey } = this._fieldInfo;
        const data = this.obj[dataKey];
        const barName = dataKey;
        const xAxisMax = this.obj.xAxisMax[maxKey];

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