/**
 * RadarChart Component
 * @description Radar chart for user satisfaction metrics
 * @author 犀焰澄泓团队
 * @version 2.0.0
 */

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const RadarChart = ({ height = 200 }) => {
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
                extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;'
            },
            radar: {
                indicator: [
                    { name: '内容质量', max: 100 },
                    { name: '更新频率', max: 100 },
                    { name: '用户体验', max: 100 },
                    { name: '界面设计', max: 100 },
                    { name: '响应速度', max: 100 },
                    { name: '功能丰富', max: 100 }
                ],
                center: ['50%', '55%'],
                radius: '65%',
                axisName: {
                    color: '#64748b',
                    fontSize: 11
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(102, 126, 234, 0.02)', 'rgba(102, 126, 234, 0.05)']
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#e2e8f0'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#e2e8f0'
                    }
                }
            },
            series: [
                {
                    name: '满意度评分',
                    type: 'radar',
                    data: [
                        {
                            value: [92, 85, 88, 90, 86, 84],
                            name: '当前评分',
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
                                        { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
                                    ]
                                }
                            },
                            lineStyle: {
                                color: '#667eea',
                                width: 2
                            },
                            itemStyle: {
                                color: '#667eea',
                                borderColor: '#fff',
                                borderWidth: 2
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

export default RadarChart;
