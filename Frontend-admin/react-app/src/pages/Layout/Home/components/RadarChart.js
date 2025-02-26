import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const RadarChart = ({ title }) => {

    const chartRef = useRef(null);
    useEffect(() => {

        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: title,
            }, legend: {
                data: ['Allocated Budget', 'Actual Spending']
            }, radar: {
                indicator: [{ name: 'Sales', max: 6500 }, {
                    name: 'Useristration',
                    max: 16000
                }, { name: 'Information Technology', max: 30000 }, {
                    name: 'Customer Support',
                    max: 38000
                }, { name: 'Development', max: 52000 }, { name: 'Marketing', max: 25000 }], axisLabel: {
                    formatter: function (value) {
                        return (value / 1000) + 'K'; // 转换为千单位
                    }
                }
            }, series: [{
                name: 'Budget vs spending', type: 'radar', data: [{
                    value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget'
                }, {
                    value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending'
                }]
            }]
        };


        myChart.setOption(option);

        const resizeChart = () => myChart.resize();
        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
            myChart.dispose();
        };
    }, [title]);


    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;


}

export default RadarChart;