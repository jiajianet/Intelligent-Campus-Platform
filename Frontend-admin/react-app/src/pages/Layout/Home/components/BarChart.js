/**
 * BarChart Component
 * @description Interactive bar chart for category statistics
 * @author 犀焰澄泓团队
 * @version 2.0.0
 */

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ height = 280 }) => {
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine: {
                    lineStyle: {
                        color: '#e2e8f0'
                    }
                },
                axisLabel: {
                    color: '#64748b',
                    fontSize: 12
                },
                axisTick: {
                    show: false
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
                    name: '阅读量',
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        borderRadius: [6, 6, 0, 0],
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#667eea' },
                                { offset: 1, color: '#764ba2' }
                            ]
                        }
                    },
                    data: [120, 200, 150, 80, 70, 110, 130],
                    emphasis: {
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#764ba2' },
                                    { offset: 1, color: '#667eea' }
                                ]
                            }
                        }
                    }
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

export default BarChart;
