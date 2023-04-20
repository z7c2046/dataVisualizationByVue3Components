// 导入echarts库
import * as echarts from 'echarts';

// 定义一个名为DonutChart的类
export default class DonutChart {
    // 构造函数，初始化一些变量
    constructor(dom) {
        this.option = null; // 用于保存图表配置的变量
        this.dom = dom; // 用于图表渲染的DOM元素
        this.myChart = null; // 用于保存echarts实例的变量
        this.colorList = ['#FFF']; // 圆环图表的颜色列表
        this.bgList = ['#174789']; // 背景颜色列表
        this.maxCount = 100; // 最大值
    }

    // 定义一个静态方法getInstance，用于获取DonutChart的实例
    static getInstance() {
        if (!DonutChart._instance) {
            Object.defineProperty(DonutChart, "_instance", {
                value: new DonutChart(...arguments)
            });
        }
        return DonutChart._instance;
    }

    // 定义一个方法createChart，用于创建并渲染图表
    createChart() {
        this.disposeChart(); // 清理已有的图表实例
        this.myChart = echarts.init(this.dom, null); // 初始化echarts实例
        this.option = {
            // 配置角度轴
            angleAxis: {
                show: false, // 不显示角度轴
                max: this.maxCount, // 最大值
                startAngle: 90, // 起始角度
                splitLine: {
                    show: false // 不显示分隔线
                },
            },
            // 配置半径轴
            radiusAxis: {
                show: false, // 不显示半径轴
                type: 'category', // 类型为类别
                data: ['A'] // 数据
            },
            // 配置极坐标系
            polar: {
                radius: [25, 35] // 设置内外半径，调整图表大小
            },
            // 配置系列数据
            series: [
                {
                    type: 'bar', // 类型为柱状图
                    data: [78.09], // 数据
                    coordinateSystem: 'polar', // 使用极坐标系
                    roundCap: true, // 柱状图顶部圆角
                    itemStyle: {
                        color: (params) => {
                            return this.colorList[params.dataIndex]; // 设置颜色
                        }
                    },
                    animationEasing: 'bounceOut', // 动画缓动效果
                    barGap: '-100%', // 柱间距离
                    z: 200 // z轴层叠顺序
                },
                {
                    type: 'bar', // 类型为柱状图
                    data: [this.maxCount, this.maxCount, this.maxCount], // 数据
                    coordinateSystem: 'polar', // 使用极坐标系
                    roundCap: true, // 柱状图顶部圆角
                    itemStyle: {
                        color: (params) => {
                            return this.bgList[params.dataIndex]; // 设置背景颜色
                        }
                    },
                    barGap: '-100%' // 柱间距离
                }
            ]
        };
        // 将配置项设置到图表实例中并进行渲染
        this.myChart.setOption(this.option, true);
    }
    // 定义一个方法disposeChart，用于清理图表实例
    disposeChart() {
        if (this.myChart) {
            this.myChart.dispose(); // 销毁已有的echarts实例
            this.myChart = null; // 将图表实例置为null
            this.option = null; // 将配置项置为null
        }
    }
}



// 这个类的主要功能是创建一个环形图表（Donut Chart），使用了echarts库进行渲染。它包含了以下几个方法：

// 1. `constructor`：用于初始化一些变量。
// 2. `getInstance`：静态方法，用于获取类的实例。采用了单例模式，确保一个程序中只有一个实例。
// 3. `createChart`：创建并渲染图表。在这个方法中，定义了角度轴、半径轴、极坐标系以及系列数据等配置项。
// 4. `disposeChart`：清理图表实例。这个方法用于在需要重新创建图表时，销毁已有的实例并将相关变量置为null。

