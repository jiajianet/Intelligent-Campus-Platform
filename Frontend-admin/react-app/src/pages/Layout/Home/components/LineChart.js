/**
 * LineChart Component
 * @description Interactive line chart for article trends
 * @author 犀焰澄泓团队
 * @version 2.0.0
 */

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const LineChart = ({ height = 300 }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                textStyle: {
                    color: '#1a1a2e'
                },
                padding: [12, 16],
                extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;'
            },
            legend: {
                data: ['军事', '推荐', '体育', '娱乐', '科技'],
                bottom: 0,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#64748b',
                    fontSize: 12
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#e2e8f0'
                    }
                },
                axisLabel: {
                    color: '#64748b',
                    fontSize: 12
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#f1f5f9',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color: '#64748b',
                    fontSize: 12
                }
            },
            series: [
                {
                    name: '军事',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 3,
                        color: '#ff4d4f'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(255, 77, 79, 0.2)' },
                                { offset: 1, color: 'rgba(255, 77, 79, 0.01)' }
                            ]
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210, 230, 120, 132, 101, 134]
                },
                {
                    name: '推荐',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 3,
                        color: '#667eea'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(102, 126, 234, 0.2)' },
                                { offset: 1, color: 'rgba(102, 126, 234, 0.01)' }
                            ]
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310, 320, 312, 281, 194, 123]
                },
                {
                    name: '体育',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 3,
                        color: '#52c41a'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(82, 196, 26, 0.2)' },
                                { offset: 1, color: 'rgba(82, 196, 26, 0.01)' }
                            ]
                        }
                    },
                    data: [150, 232, 201, 154, 190, 330, 410, 420, 312, 381, 294, 223]
                },
                {
                    name: '娱乐',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 3,
                        color: '#faad14'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(250, 173, 20, 0.2)' },
                                { offset: 1, color: 'rgba(250, 173, 20, 0.01)' }
                            ]
                        }
                    },
                    data: [320, 332, 301, 334, 390, 330, 320, 310, 282, 281, 294, 223]
                },
                {
                    name: '科技',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 3,
                        color: '#13c2c2'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(19, 194, 194, 0.2)' },
                                { offset: 1, color: 'rgba(19, 194, 194, 0.01)' }
                            ]
                        }
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 1310, 1282, 1281, 1294, 1223]
                }
            ]
        };

        myChart.setOption(option);

        const resizeChart = () => myChart.resize();
        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />;
};

export default LineChart;
