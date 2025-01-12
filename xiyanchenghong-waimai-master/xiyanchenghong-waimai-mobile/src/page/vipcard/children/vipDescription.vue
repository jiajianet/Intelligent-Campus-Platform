 <template>
  <div class="page_container">
        <head-top head-title="会员优惠" go-back='true'></head-top>
        <div class="markdown">
            <blockquote>
                <p>尊敬的用户，随着会员体系逐渐完善，自2024年10月01日起，智慧校园外卖会员权益将做如下优化：
                购卡后31天内，累积享有10单减免配送费服务（每日最多1单，每单最高减免6元）。
                注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</p>
            </blockquote>
            <h3 id="q1-">Q1: 特权介绍</h3>
            <ul>
                <li>身份标识：智慧校园外卖会员服务有效期内，享有专属VIP标识。</li>
                <li>减免配送费： 智慧校园外卖会员卡自绑定账户之日起31天内，在「智慧专送」标识商家下单，享有10次减免配送费特权，每日最多减免1单，每单最高可减6元。</li>
                <li>更多特权，敬请期待！</li>
            </ul>
            <h3 id="q2-">Q2: 价格介绍</h3>
            <ul>
                <li>智慧校园外卖会员卡：30元</li>
            </ul>
            <h3 id="q3-">Q3: 使用说明</h3>
            <p>当用户满足以下任一条件，会员服务自动失效：</p>
            <ol>
                <li>自绑定之日起超过31天；</li>
                <li>在31天内累计使用减免配送费的订单数量达到10单；</li>
            </ol>
            <h3 id="q4-">Q4: 购卡说明</h3>
            <ul>
                <li>在线购买：智慧校园外卖主页&gt;我的&gt;智慧校园外卖会员卡</li>
            </ul>
            <h3 id="q5-">Q5: 温馨提示</h3>
            <ul>
                <li>用户在当前会员服务失效前，无法购买新卡。</li>
                <li>请认准智慧校园外卖官方渠道，任何从其他第三方途径获得的会员卡，智慧校园外卖不保证其可用性。</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState, mapMutations} from 'vuex'
    import {getOrderList} from 'src/service/getData'

    export default {
      data(){
            return{
    
            }
        },
        mounted(){

        },
        computed: {
            ...mapState([
                'userInfo', 
            ]),
        },
        components: {
            headTop,
        },
        methods: {
            ...mapMutations([
                'SAVE_AVANDER'
            ]),
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .page_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
        overflow-y: auto;
        color: #999;
        font-size: .6rem;
        padding: 2rem .7rem 0;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5 {
        margin-top: 0.666667rem;
        margin-bottom: 0.2rem;
        font-size: 0.7rem;
        font-weight: 600;
        color: #333;
    }
    .markdown ul {
        li{
            color: #666;
            margin-bottom: .2rem;
        }
    }
</style>
