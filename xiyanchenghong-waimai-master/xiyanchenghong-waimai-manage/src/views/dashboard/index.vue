<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录:{{name}}(<span v-for='role in roles' :key='role'>{{role}}</span>)</div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg t="1733318162463" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="53047" width="64" height="64"><path d="M146.863158 0h538.947368l296.421053 296.421053v619.789473c0 59.284211-48.505263 107.789474-107.789474 107.789474H146.863158c-59.284211 0-107.789474-48.505263-107.789474-107.789474V107.789474c0-59.284211 48.505263-107.789474 107.789474-107.789474z" fill="#2F77F1" p-id="53048"></path><path d="M688.505263 0l296.421053 296.421053h-296.421053V0zM549.726316 661.557895H142.821053c-14.821053 0-25.6-12.126316-25.6-25.6V633.263158c0-14.821053 12.126316-25.6 25.6-25.6h406.905263c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-10.778947 25.6-25.6 25.6z m-134.736842-350.31579H142.821053c-14.821053 0-25.6-10.778947-25.6-25.6V282.947368c0-14.821053 12.126316-25.6 25.6-25.6h272.168421c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-10.778947 25.6-25.6 25.6z m-272.168421 121.263158h245.221052c13.473684 0 25.6 12.126316 25.6 25.6v2.694737c0 13.473684-12.126316 25.6-25.6 25.6H142.821053c-14.821053 0-25.6-10.778947-25.6-25.6V458.105263c0-14.821053 12.126316-25.6 25.6-25.6z" fill="#AFFCFE" p-id="53049"></path></svg>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">进驻商家</div>
            <div class="card-panel-num">
              10
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg t="1733318522351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="54058" width="64" height="64"><path d="M632 344m-120 0a120 120 0 1 0 240 0 120 120 0 1 0-240 0Z" fill="#A9D8FF" p-id="54059"></path><path d="M809 800H503c-48.1 0-87-39-87-87 0-111 90-201 201-201h78c111 0 201 90 201 201 0 48-39 87-87 87z" fill="#A9D8FF" p-id="54060"></path><path d="M440 296m-168 0a168 168 0 1 0 336 0 168 168 0 1 0-336 0Z" fill="#298DF7" p-id="54061"></path><path d="M638.2 896H241.8C179 896 128 845 128 782.2 128 633 249 512 398.2 512h83.6C631 512 752 633 752 782.2 752 845 701 896 638.2 896z" fill="#298DF7" p-id="54062"></path></svg>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.newUser') }}</div>
            <div class="card-panel-num">3</div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg t="1733318559227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56856" width="64" height="64"><path d="M512 1024c-72.205128 0-131.282051-59.076923-131.282051-131.282051s59.076923-131.282051 131.282051-131.282052 131.282051 59.076923 131.282051 131.282052-59.076923 131.282051-131.282051 131.282051z m0-866.461538c-22.317949 0-39.384615-17.066667-39.384615-39.384616V39.384615c0-22.317949 17.066667-39.384615 39.384615-39.384615s39.384615 17.066667 39.384615 39.384615v78.769231c0 22.317949-17.066667 39.384615-39.384615 39.384616z" fill="#AFFCFE" p-id="56857"></path><path d="M997.74359 827.076923c0 36.758974-28.882051 65.641026-65.641026 65.641026H91.897436c-36.758974 0-65.641026-28.882051-65.641026-65.641026s28.882051-65.641026 65.641026-65.641026H52.512821c57.764103 0 105.025641-47.261538 105.025641-105.025641V459.487179C157.538462 263.876923 316.389744 105.025641 512 105.025641s354.461538 158.851282 354.461538 354.461538v196.923077c0 57.764103 47.261538 105.025641 105.025641 105.025641h-39.384615c36.758974 0 65.641026 28.882051 65.641026 65.641026z" fill="#2F77F1" p-id="56858"></path></svg>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.message') }}</div>
            <div class="card-panel-num">0</div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg t="1733318595697" class="icon" viewBox="0 0 1184 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="58828" width="64" height="64"><path d="M216.92708333 90.125h711.9140625c58.0078125 0 105.46875 47.4609375 105.46875 105.46875v632.8125c0 58.0078125-47.4609375 105.46875-105.46875 105.46875H216.92708333c-58.0078125 0-105.46875-47.4609375-105.46875-105.46875V195.59375c0-58.0078125 47.4609375-105.46875 105.46875-105.46875z" fill="#2F77F1" p-id="58829"></path><path d="M849.73958333 353.796875h237.3046875v316.40625H849.73958333c-58.0078125 0-105.46875-47.4609375-105.46875-105.46875v-105.46875c0-58.0078125 47.4609375-105.46875 105.46875-105.46875z m0 52.734375h184.5703125v210.9375H849.73958333c-29.00390625 0-52.734375-23.73046875-52.734375-52.734375v-105.46875c0-29.00390625 23.73046875-52.734375 52.734375-52.734375z" fill="#AFFCFE" p-id="58830"></path></svg>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.income') }}</div>
            <div class="card-panel-num">5000</div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="chart section">
          <v-chart :options="lineData"/>
        </div>
      </el-col>
    </el-row>
    <el-col :span="12">
      <v-chart :options="barData" class="chart section"/>
    </el-col>
    <el-row :gutter="20" >
      <el-col :span="12">
        <el-collapse   class="section">
          <el-collapse-item title="第十八届“挑战杯”广东大学生课外学术科技作品竞赛暨“百千万工程”青年突击队工作推进会顺利召开" name="1">
            <div><a href="#" target="_blank">点击查看详情</a></div>
          </el-collapse-item>
          <el-collapse-item title="顺利举办2024-2025学年第一学期第一次社团座谈会" name="2">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>
          <el-collapse-item title="丝木棉资助育人工作室召开2024秋季学期学生资助工作座谈交流会" name="3">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>
          <el-collapse-item title="软件工程系第十八届田径运动会顺利举行" name="4">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>
          <el-collapse-item title="“AIGC赋能数字艺术：从灵感到现实”大学生赋能讲座" name="5">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>
          <el-collapse-item title="以青春之名，赴广交之约，广软外语青年在现场！" name="6">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>
          <el-collapse-item title="才艺璀璨舞台上，梦想绽放闪光芒——第二届广州软件学院达人秀初赛落下帷幕" name="7">
            <div><a href="#" target="_blank">点击查看详情</a> </div>
          </el-collapse-item>



        </el-collapse>
      </el-col>

    </el-row>

    <el-row :gutter="20" >
      <el-col :span="24">
        <el-table :data="tableData" class="section">
          <el-table-column
            prop="date"
            :label="$t('dashboard.date')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('dashboard.name')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            :label="$t('dashboard.addr')">
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>


<script src="./dashboard.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .dashboard {

    &-container {
      padding: 15px;
      background-color: #f0f2f5;
    }
    &-text {
      font-size: 14px;
      line-height: 22px;
      padding-bottom:15px;
    }
  }
  .echarts{
    width: 100%;
    height: 100%;
  }
  .box-card{
    height:108px;
  }
  .chart{
    height: 350px;
  }
  .section{
    padding:20px;
    background-color: white;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .box-card > div >div > .svg-icon {
    width: 4em;
    height: 4em;
    color:#34bfa3;
  }
  .card-panel-text{
    padding-top:10px;
    font-size:16px;
    color:gray;
  }
  .card-panel-num{
    padding-top:10px;
    font-size:20px;
    font-weight: bold;
  }
</style>
