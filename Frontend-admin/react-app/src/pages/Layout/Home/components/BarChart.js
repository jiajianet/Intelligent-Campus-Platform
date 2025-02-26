import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            title: { text: '文章统计', left: 'center', top: 10 },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { type: 'value' },
            series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
        };

        myChart.setOption(option);

        const resizeChart = () => myChart.resize();
        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
            myChart.dispose();
        };
    }, []);
    //一定要有xy轴渲染
    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;

}
export default BarChart;

