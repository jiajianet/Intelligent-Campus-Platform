import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const PieChart = ({ title, height }) => {

    const chartRef = useRef(null);
    useEffect(() => {

        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: title,
            }, tooltip: {
                trigger: 'item'
            }, legend: {
                top: '5%', left: 'center'
            }, series: [{
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false, position: 'center'
                },
                emphasis: {
                    label: {
                        show: true, fontSize: 40, fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [{ value: 1048, name: 'Search Engine' }, { value: 735, name: 'Direct' }, {
                    value: 580,
                    name: 'Email'
                }, { value: 484, name: 'Union Ads' }, { value: 300, name: 'Video Ads' }]
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


    return <div ref={chartRef} style={{ width: '100%', height: `${height}px` }}></div>;


}

export default PieChart;