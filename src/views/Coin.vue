<template>
    <div>
        <div class="coin-page-header" v-if="coin">
            <h1><img :src="require(`@/assets/${coin.key}.jpeg`)" v-if="coin"> {{coin ? coin.name : ''}}</h1>
            {{this.$route.params.key}} <span v-if="price(this.$route.params.key)">/ {{ price(this.$route.params.key)}} $</span>
            <div class="tabs">
                <div @click="selectTab('default')"  :class="{'active': selectedTab === 'default'}">{{ $t('COIN_PAGE.SUMMARY') }}</div>
                <div @click="selectTab('webPreview')"  :class="{'active': selectedTab === 'webPreview'}">{{ $t('COIN_PAGE.PREVIEW') }}</div>
                <div @click="selectTab('twitter')" v-if="coin.twitter"  :class="{'active': selectedTab === 'twitter'}">Twitter</div>
            </div>
            <div v-show="selectedTab === 'webPreview'" class="site-preview-block">
                <Loader />
                <iframe v-if="coin.link" :src="`https://${coin.link}`"
                    width="100%" height="1000" frameborder="0"
                    allowfullscreen sandbox="allow-scripts">
                </iframe>
            </div>
            <div v-show="selectedTab === 'default'">
                <div class="description-block" v-if="getDescription($i18n.locale, coin.key)" v-html="getDescription($i18n.locale, coin.key)"></div>
            </div>
            <div v-show="selectedTab === 'twitter'" class="twitter-block">
                <Loader />
                <Timeline :id="coin.twitter" sourceType="profile" @loaded="console.log('fasf')" />
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

export default {
    name: 'Coin',
    components: {
        Loader,
        Timeline
    },
    data() {
        return {
            coin: null,
            selectedTab: 'default'
        }
    },
    methods: {
         ...mapActions('coins', {
            getPrice: 'GET_PRICE',
        }),
        selectTab(tab) {
            this.selectedTab = tab
        }
    },
    computed: {
        ...mapGetters('coins', {
            price: 'getPrice',
            getCoin: 'getCoin',
            getDescription: 'getDescription'
        })
    },
    async mounted() {
        await this.getPrice(this.$route.params.key)
        this.coin = this.getCoin(this.$route.params.key)
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
        div {
            padding: 10px;
            border: 1px solid black;
            cursor: pointer;
            &.active {
                background: grey;
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
    }
</style>