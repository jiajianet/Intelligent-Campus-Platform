import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const LineChart = ({ title, height = 300 }) => {

    const chartRef = useRef(null);
    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);


        const option = {
            tooltip: {
                trigger: 'axis'
            }, legend: {
                data: ['军事', '推荐', '体育', '娱乐', '科技']
            }, grid: {
                left: '3%', right: '4%', bottom: '3%', containLabel: true
            }, toolbox: {
                feature: {
                    saveAsImage: {}
                }
            }, xAxis: {
                type: 'category', boundaryGap: false, data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }, yAxis: {
                type: 'value'
            }, series: [{
                name: '军事', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210, 230, 120, 132, 101, 134]
            }, {
                name: '推荐', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310, 320, 312, 281, 194, 123]
            }, {
                name: '体育', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410, 420, 312, 381, 294, 223]
            }, {
                name: '娱乐', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320, 310, 282, 281, 294, 223]
            }, {
                name: '科技', type: 'line', stack: 'Total', data: [820, 932, 901, 934, 1290, 1330, 1320, 1310, 1282, 1281, 1294, 1223]
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


    return <div ref={chartRef} style={{ width: '100%',  height: `${height}px` }}></div>;


}

export default LineChart;


