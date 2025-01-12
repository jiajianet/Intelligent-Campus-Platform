import { getList } from '@/api/system/notice'
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'

export default {

  name: 'dashboard',
  components: {
    chart: ECharts
  },
  data() {
    const data = []

    for (let i = 0; i <= 360; i++) {
      const t = i / 180 * Math.PI
      const r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      notice: [],
      lineData: {
        title: {
          text: '智慧校园外卖营销数据统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('dashboard.email'), this.$t('dashboard.ad'), this.$t('dashboard.vedio'), this.$t('dashboard.direct'), this.$t('dashboard.searchEngine')]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$t('dashboard.email'),
            type: 'line',
            stack: '总量',
            data: [900, 220, 261, 105, 67, 860, 428],
            color: '#3fb1e3'
          },
          {
            name: this.$t('dashboard.ad'),
            type: 'line',
            stack: '总量',
            data: [920, 12, 850, 560, 450, 102, 30],
            color: '#6be6c1'
          },
          {
            name: this.$t('dashboard.vedio'),
            type: 'line',
            stack: '总量',
            data: [800, 232, 201, 154, 190, 330, 410],
            color: '#626c91'
          },
          {
            name: this.$t('dashboard.direct'),
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320],
            color: '#a0a7e6'
          },
          {
            name: this.$t('dashboard.searchEngine'),
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            color: '#c4ebad'
          }
        ]
      },
      barData: {
        xAxis: {
          type: 'category',
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          color: '#4154f1'
        }]
      },
      tableData: [{
        date: '2024-11-09',
        name: '小杨',
        address: '广州软件学院'
      }, {
        date: '2024-11-23',
        name: '小贾',
        address: '广州软件学院'
      }, {
        date: '2024-12-10',
        name: '小曾',
        address: '广州软件学院'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const self = this
      getList(self.listQuery).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          var notice = response.data[i]
          self.$notify({
            title: notice.title,
            message: notice.content,
            duration: 3000
          })
        }
        self.listLoading = false
      })
    }
  }
}
