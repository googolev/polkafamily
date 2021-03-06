<template>
    <div>
        <div class="coin-page-header" v-if="coin">
            <h1><img :src="require(`@/assets/${coin.key}.jpeg`)" v-if="coin"> {{coin ? coin.name : ''}}</h1>
            {{this.$route.params.key}} <span v-if="price(this.$route.params.key)">/ {{ price(this.$route.params.key)}} $</span>
            <div class="tabs">
                <div @click="selectTab('default')"  :class="{'active': selectedTab === 'default'}">{{ $t('COIN_PAGE.SUMMARY') }}</div>
                <div @click="selectTab('webPreview')"  :class="{'active': selectedTab === 'webPreview'}">{{ $t('COIN_PAGE.PREVIEW') }}</div>
                <div @click="selectTab('twitter')" v-if="coin.twitter"  :class="{'active': selectedTab === 'twitter'}">Twitter</div>
                <div @click="selectTab('chart')" v-if="getChartData.length"  :class="{'active': selectedTab === 'chart'}">{{ $t('COIN_PAGE.CHART')}}</div>
            </div>
            <div v-show="selectedTab === 'webPreview'" class="site-preview-block">
                <Loader v-if="!iframe_loaded" />
                <iframe :src="`https://${coin.link}`" id="coin-iframe"
                    width="100%" height="1000" frameborder="0"
                    allowfullscreen sandbox="allow-scripts">
                </iframe>
            </div>
            <div v-show="selectedTab === 'default'">
                <div class="description-block" v-if="getDescription($i18n.locale, coin.key)" v-html="getDescription($i18n.locale, coin.key)"></div>
            </div>
            <div v-show="selectedTab === 'twitter'" class="twitter-block">
                <Loader  v-if="isTwitterLoaded"/>
                <Timeline :id="coin.twitter" sourceType="profile" :ref="'twitter'" />
            </div>
            <div v-show="selectedTab === 'chart'">
                <Chart :chartData="getChartData" v-if="getChartData.length" :coinKey="coin.key" />
            </div>
        </div>
        <div v-else>
            <Loader />
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {Timeline} from 'vue-tweet-embed'
import Loader from '../components/Loader'
import Chart from '../components/Chart'

export default {
    name: 'Coin',
    components: {
        Loader,
        Timeline,
        Chart
    },
    data() {
        return {
            coin: null,
            selectedTab: 'default',
            iframe_loaded: false,
        }
    },
    methods: {
         ...mapActions('coins', {
            getPrice: 'GET_PRICE',
            getChartInfo: 'GET_CHART_INFO'
        }),
        selectTab(tab) {
            this.selectedTab = tab
        }
    },
    computed: {
        ...mapGetters('coins', {
            price: 'getPrice',
            getCoin: 'getCoin',
            getDescription: 'getDescription',
            getChartData: 'getChartData'
        }),
        isTwitterLoaded() {
            return this.$refs['twitter'] ? this.$refs['twitter'].isLoaded : false
        }
    },
    async mounted() {
        await this.getPrice(this.$route.params.key)
        await this.getChartInfo(this.$route.params.key)
        this.coin = this.getCoin(this.$route.params.key)
        const that = this
        setTimeout(function() {
            document.querySelector('#coin-iframe').onload = function() {
                that.iframe_loaded = true
            }
        }, 1000)
    }
}
</script>

<style lang="less">
    .coin-page-header {
        h1 {
        display: flex;
        justify-content: center;
        align-items: center;
            img {
                padding-right: 10px;
                width: 25px;
                height: 25px;
            }
        }
    }

    .tabs {
        display:flex;
        margin-top: 10px;
        div {
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid black;
            &.active {
                border: 1px solid black;
                border-radius: 4px 4px 0px 0px;
                border-bottom: none;
                background: linear-gradient(183deg, rgba(96, 96, 100, 0.5) -8%, rgba(121,25,9,0) 35%, transparent);
                // background: grey;
            }
        }
    }

    .description-block {
        text-align: left;
        max-width: 80%;
        margin: 0 auto;
    }

    .twitter-block {
        max-width: 80%;
        margin: 0 auto;
    }

    .twitter-block, .site-preview-block {
        position: relative;
        .loader {
            position: absolute;
            left: 37%;
            top: 170px;
            z-index: -1;
        }

        iframe {
            z-index: 9999;
        }
    }
</style>