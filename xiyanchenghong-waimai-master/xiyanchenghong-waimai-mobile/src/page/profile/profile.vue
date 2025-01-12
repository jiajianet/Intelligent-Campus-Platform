<template>
    <div class="profile_page">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
                    <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p>{{username}}</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{count}}</b>个</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{pointNumber}}</b>分</span>
                        <span class="info-data-bottom">我的积分</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的订单 -->
                <router-link to='/order' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 积分商城 -->
                <a href='https://home.m.duiba.com.cn/#/chome/index' class="myorder">
                    <aside>
                        <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>积分商城（敬请期待）</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </a>
                <!-- 智慧校园服务平台会员卡 -->
                <router-link to='/vipcard' class="myorder">
                    <aside>
                        <svg fill="#ffc636">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>智慧校园外卖会员卡</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='/service' class="myorder">
                    <aside>
                      <svg t="1733317910218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="52005" width="256" height="256"><path d="M511.486032 368.634303m-257.392386 0a257.392386 257.392386 0 1 0 514.784772 0 257.392386 257.392386 0 1 0-514.784772 0Z" fill="#9776FF" p-id="52006"></path><path d="M955.057359 944.858125a450.08759 450.08759 0 0 0-258.323281-330.933067 364.445277 364.445277 0 0 1-367.703408 0A451.483932 451.483932 0 0 0 70.70739 944.858125 67.955313 67.955313 0 0 0 137.731808 1023.984175h749.370237a67.489866 67.489866 0 0 0 67.955314-79.12605z" fill="#9776FF" p-id="52007"></path><path d="M947.610201 347.689172a93.08947 93.08947 0 0 0-82.384181-93.08947 367.703408 367.703408 0 0 0-698.171029 0 93.08947 93.08947 0 0 0-89.831339 93.08947 95.416707 95.416707 0 0 0 93.089471 93.089471h6.050816a23.737815 23.737815 0 0 0 20.014236-26.995947 315.107857 315.107857 0 0 1-3.258132-46.544735 323.020462 323.020462 0 0 1 645.575478 0 316.969647 316.969647 0 0 1-3.258132 46.544735 23.737815 23.737815 0 0 0 20.014236 26.530499h3.258132a23.737815 23.737815 0 0 0 15.82521-6.050815 93.08947 93.08947 0 0 0 73.075234-86.573208z" fill="#B799FF" p-id="52008"></path></svg>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 进入智慧校园服务平台 -->
                <router-link to='/download' class="myorder">
                    <aside>
                      <svg t="1733317862316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="49904" width="256" height="256"><path d="M969.728 308.992L542.72 88.32a62.64832 62.64832 0 0 0-57.8048 0.1536L63.2832 309.0944c-19.2512 10.0864-19.2512 37.376 0 47.4624l46.2336 24.2176v173.3632c0 16.6912 13.6192 30.208 30.4128 30.208 16.7936 0 30.4128-13.5168 30.4128-30.208V412.5696l314.5216 164.608c18.0736 9.472 39.68 9.5232 57.8048 0.1536l427.008-220.7232c19.4048-10.0352 19.4048-37.5808 0.0512-47.616z" fill="#002870" p-id="49905"></path><path d="M542.72 88.32a62.64832 62.64832 0 0 0-57.8048 0.1536L63.2832 309.0944c-19.2512 10.0864-19.2512 37.376 0 47.4624l46.2336 24.2176v173.3632c0 16.6912 13.6192 30.208 30.4128 30.208 16.7936 0 30.4128-13.5168 30.4128-30.208V412.5696l314.5216 164.608c18.0736 9.472 39.68 9.5232 57.8048 0.1536L860.16 413.2352a693.76 693.76 0 0 0 35.8912-130.4064c0.6144-3.6864 1.0752-7.3216 1.6896-11.008L542.72 88.32z" fill="#002870" p-id="49906"></path><path d="M732.2624 186.2656L542.72 88.32a62.64832 62.64832 0 0 0-57.8048 0.1536L63.2832 309.0944c-19.2512 10.0864-19.2512 37.376 0 47.4624l46.2336 24.2176v173.3632c0 16.6912 13.6192 30.208 30.4128 30.208 16.7936 0 30.4128-13.5168 30.4128-30.208V412.5696l268.7488 140.6464c134.5536-82.4832 240.384-210.5344 293.1712-366.9504z" fill="#002870" p-id="49907"></path><path d="M484.864 88.4224l-421.5808 220.672c-19.2512 10.0864-19.2512 37.376 0 47.4624l46.2336 24.2176V435.2c20.6336-5.5296 40.96-11.9808 60.8256-19.3536v-3.2768l3.6352 1.8944C330.5984 355.2768 462.336 239.104 539.4432 86.8864c-17.408-7.8336-37.5296-7.3728-54.5792 1.536z" fill="#002870" p-id="49908"></path><path d="M769.8944 522.0864l-202.5472 110.0288a105.91744 105.91744 0 0 1-101.3248 0l-202.5472-110.0288c-18.5856-8.7552-39.8336 5.0176-39.8336 25.856v262.6048c0 4.7616 1.1264 9.4208 3.3792 13.568 14.5408 26.88 80.7936 122.0096 289.4848 122.0096s275.1488-95.1296 289.792-122.0096c2.2528-4.1984 3.4304-8.8576 3.4304-13.6192v-262.5536c0-20.8384-21.248-34.6112-39.8336-25.856z" fill="#002870" p-id="49909"></path><path d="M802.6624 529.0496c-7.7824-8.9088-20.8384-12.6464-32.768-6.9632l-202.5472 110.0288a105.91744 105.91744 0 0 1-101.3248 0l-202.5472-110.0288c-18.5856-8.7552-39.8336 5.0176-39.8336 25.856v262.6048c0 4.7616 1.1264 9.4208 3.3792 13.568 3.6864 6.7584 10.6496 17.8688 22.3232 30.72 228.4032-10.8544 435.0976-135.1168 553.3184-325.7856zM139.9296 629.6064c-16.7936 0-30.4128 13.5168-30.4128 30.208v20.9408c0 16.6912 13.6192 30.208 30.4128 30.208 16.7936 0 30.4128-13.5168 30.4128-30.208v-20.9408c0-16.6912-13.6192-30.208-30.4128-30.208z" fill="#002870" p-id="49910"></path><path d="M168.3456 649.2672a30.3104 30.3104 0 0 0-28.416-19.6608 30.3104 30.3104 0 0 0-29.8496 24.7296c19.5584-0.9216 39.0144-2.56 58.2656-5.0688zM223.6928 547.9424v95.2832c22.528-3.6864 42.8032-7.936 60.928-12.4928 31.8976-8.0384 62.3104-21.1968 90.2656-38.5536 3.2768-2.048 5.9904-3.7888 8.0896-5.1712l-119.5008-64.9216c-18.5344-8.7552-39.7824 5.0176-39.7824 25.856z" fill="#002870" p-id="49911"></path></svg>
                    </aside>
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>进入智慧校园服务平台</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'

export default {
    data(){
        return{
            profiletitle: '我的',
            username: '登录/注册',           //用户名
            resetname: '',
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
        }
    },
    mounted(){
        this.initData();
    },
    mixins: [getImgPath],
    components:{
        headTop,
        footGuide,
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
        //后台会返回两种头像地址格式，分别处理
        imgpath:function () {
            let path;
            if(this.avatar.indexOf('/') !==-1){
                path = imgBaseUrl +　this.avatar;
            }else{
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },

    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        initData(){
            if (this.userInfo && this.userInfo.user_id) {
                this.avatar = this.userInfo.avatar;
                this.username = this.userInfo.username;
                this.mobile = this.userInfo.mobile || '暂无绑定手机号';
                this.balance = this.userInfo.balance;
                this.count = this.userInfo.gift_amount;
                this.pointNumber = this.userInfo.point;
            }else{
                this.username = '登录/注册';
                this.mobile = '暂无绑定手机号';
            }
        },
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';

    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
   .profile-number{
        padding-top:1.95rem;
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:$blue;
            padding: .666667rem .6rem;
            .privateImage{
                display:inline-block;
                @include wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    @include wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.48rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    @include sc(.8rem,$fc);
                    .user-icon{
                        @include wh(0.5rem,0.75rem);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem;
                        .icon-mobile{
                            @include wh(100%,100%);
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        @include sc(.57333rem,$fc);

                    }
                }

            }
            .arrow{
                @include wh(.46667rem,.98rem);
                display:inline-block;
                svg{
                   @include wh(100%,100%);
                }
            }
        }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding: .853333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(1.2rem,#f90);
                        font-weight:700;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:400;
                    padding-bottom:.453333rem;

                }
            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(3){
                border:0;
                .info-data-top{
                    b{
                        color:#6ac20b;
                    }
                }
            }
        }
   }
   .profile-1reTe{
        margin-top:.4rem;
        background:$fc;
        .myorder{
            padding-left:1.6rem;
            display:flex;
            align-items: center;
            aside{
                @include wh(.7rem,.7rem);
                margin-left:-.866667rem;
                margin-right:.266667rem;
                display:flex;
                align-items: center;
                svg{
                    @include wh(100%,100%);
                }
            }
            .myorder-div{
                width:100%;
                border-bottom:1px solid #f1f1f1;
                padding:.433333rem .266667rem .433333rem 0;
                @include sc(.7rem,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                }
                .myorder-divsvg{
                    @include wh(.46667rem,.466667rem);
                    svg{
                        @include wh(100%,100%);
                    }
                }
            }
        }
        .myorder:nth-of-type(3) .myorder-div{
            border:0;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
