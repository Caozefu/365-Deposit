<template>
    <div class="home">
        <div class="top-swiper">
            <md-swiper
                    @before-change="beforeChange"
                    @after-change="afterChange"
                    :autoplay="5000"
                    transition="fade"
                    ref="swiper">
                <md-swiper-item :key="$index" v-for="(item, $index) in simple">
                    <a href="javascript:void(0)"
                       class="banner-item"
                       :style="{'background': `${item.color}`}">{{item.text}}</a>
                </md-swiper-item>
            </md-swiper>
        </div>
        <div class="total-count">
            <span class="title">累计存款：¥ </span>
            <md-amount
                    :value="totalCount"
                    :duration="800"
                    v-if="isVisible"
                    transition
            ></md-amount>
            <span v-else style="vertical-align: -webkit-baseline-middle;">{{getHide}}</span>
            <md-icon :name="isVisible ? 'visible' : 'invisible'"
                     style="margin-left: 0.2rem"
                     @click="isVisible = !isVisible">
            </md-icon>
        </div>
        <div style="padding: 0.4rem 0.4rem 0 0.4rem">
            <md-button type="primary" round @click="isCashierhow = !isCashierhow">今日存一笔</md-button>
            <md-cashier ref="cashier"
                        v-model="isCashierhow"
                        :payment-amount="cashierAmount"
                        large-radius
                        title="今日存款"
                        payment-title="存款金额（元）"
                        pay-button-text="完成存款"
                        @pay="onCashierPay"
                        @cancel="onCashierCancel"
            ></md-cashier>
            <div style="text-align: left">
                <md-button type="link">查看存款记录
                    <md-icon name="arrow-right" size="md"></md-icon>
                </md-button>
            </div>
        </div>
        <div class="hot-content">
            <md-field>
                <md-detail-item title="今日热搜榜" content="阅读量" bold/>
                <md-detail-item
                        :title="`${index + 1}.\t ${item.note}`"
                        :content="item.num"
                        v-for="(item, index) in hotList"
                        :key="index"
                        @click.native="toDetail(item.word)"/>
            </md-field>
        </div>
        <div class="tab-bar">
            <md-tab-bar
                    v-model="current"
                    :items="items"
                    :has-ink="false"
            >
                <template slot="item" slot-scope="{ item }">
                    <div class="custom-item">
                        <div class="icon">
                            <md-icon :name="item.icon"/>
                        </div>
                        <div class="text">
                            <span v-text="item.label"></span>
                        </div>
                    </div>
                </template>
            </md-tab-bar>
        </div>
    </div>
</template>

<script>
    import {fetchJsonp} from "../../utils/fetchJsonp";
    import {Toast} from 'mand-mobile';

    export default {
        name: "home",
        data() {
            return {
                simple: [{
                    text: '123',
                    color: '#f00'
                }, {
                    text: '456',
                    color: '#ff0'
                }, {
                    text: '789',
                    color: '#0f0'
                }],
                current: 1,
                items: [{name: 1, label: '首页', icon: 'home'}, {name: 2, label: '我的', icon: 'user'}],
                hotList: [],
                totalCount: 300000000,
                isVisible: true,
                isCashierhow: false,
                cashierAmount: '100.00',
                cashierResult: 'success',
                cashierResults: [
                    {
                        text: '支付成功',
                        value: 'success',
                    },
                    {
                        text: '支付失败',
                        value: 'fail',
                    },
                ]
            }
        },
        computed: {
            getHide() {
                const len = this.totalCount.toString().length;
                let res = '';
                for (let i = 0; i < len; i++) {
                    res += '*';
                }
                return res;
            },
            cashier() {
                return this.$refs.cashier
            }
        },
        methods: {
            setValue(id, value) {
                document.querySelector(id) && (document.querySelector(id).innerHTML = value)
            },
            beforeChange(from, to) {
                this.setValue('#valueSwiper10', from)
                this.setValue('#valueSwiper11', to)
            },
            afterChange(from, to) {
                this.setValue('#valueSwiper12', from)
                this.setValue('#valueSwiper13', to)
            },
            goto() {
                this.$refs.swiper.goto(2)
            },
            toDetail(key) {
                window.open('https://s.weibo.com/weibo?q=' + key);
            },
            doPay() {
                this.createPay().then(() => {
                    this.cashier.next(this.cashierResult, {
                        buttonText: '好的',
                        handler: () => {
                            this.isCashierhow = false
                            Toast.info(`保存成功`)
                        },
                    })
                })
            },
            createPay() {
                this.cashier.next('loading')
                return new Promise(resolve => {
                    this.timer = setTimeout(() => {
                        resolve()
                    }, 3000)
                })
            },
            onCashierPay() {
                this.doPay()
            },
            onCashierCancel() {
                this.timer && clearTimeout(this.timer)
            }
        },
        mounted() {
            fetchJsonp('https://s.weibo.com/ajax/jsonp/gettopsug?ref=PC_topsug&_cb=cb', (data) => {
                this.hotList = data.data.list;
            });
        }
    };
</script>

<style lang="less">
    .home {
        height: 100vh;
        background-color: #f9fafb;
        padding: 20px;

        .top-swiper {
            height: 250px;
            border-radius: 10px;
            overflow: hidden;

            .banner-item {
                float: left;
                width: 100%;
                height: 100%;
                line-height: 250px;
                text-align: center;
                font-size: 28px;
                color: #FFF;
                box-align: center;
                align-items: center;
                box-pack: center;
                justify-content: center;
                text-decoration-line: none;
            }
        }
    }

    .tab-bar {
        position: fixed;
        bottom: 0;
        width: 100vw;
    }

    .total-count {
        height: 0.7rem;
        margin-top: 30px;
        padding-left: 0.4rem;
        text-align: left;
        font-size: 0.5rem;

        & > .title {
            font-size: 0.30rem;
            font-weight: bold;
        }
    }

    .hot-content {
        .md-detail-title {
            color: #409EFF;
        }

        .md-detail-content {
            color: #858b9c;
        }
    }
</style>
