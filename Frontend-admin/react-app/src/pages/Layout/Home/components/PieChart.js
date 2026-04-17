/**
 * PieChart Component
 * @description Donut chart for visitor insights
 * @author 犀焰澄泓团队
 * @version 2.0.0
 */

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const PieChart = ({ height = 220 }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                textStyle: {
                    color: '#1a1a2e'
                },
                padding: [12, 16],
                extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;',
                formatter: '{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '访客类型',
                    type: 'pie',
                    radius: ['50%', '75%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 3
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#1a1a2e'
                        },
                        scale: true,
                        scaleSize: 10
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {
                            value: 680,
                            name: '新访客',
                            itemStyle: {
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
                            }
                        },
                        {
                            value: 320,
                            name: '老访客',
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: '#52c41a' },
                                        { offset: 1, color: '#389e0d' }
                                    ]
                                }
                            }
                        }
                    ]
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

export default PieChart;
