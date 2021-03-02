<template>
    <div>
        <div class="coin-page-header" v-if="coin">
            <h1><img :src="require(`@/assets/${coin.key}.jpeg`)" v-if="coin"> {{coin ? coin.name : ''}}</h1>
            {{this.$route.params.key}} <span v-if="price(this.$route.params.key)">/ {{ price(this.$route.params.key)}} $</span>
            <div class="tabs">
                <div @click="selectTab('default')"  :class="{'active': selectedTab === 'default'}">{{ $t('COIN_PAGE.SUMMARY') }}</div>
                <div @click="selectTab('webPreview')"  :class="{'active': selectedTab === 'webPreview'}">{{ $t('COIN_PAGE.PREVIEW') }}</div>
            </div>
            <div v-show="selectedTab === 'webPreview'">
                <iframe v-if="coin.link" :src="`https://${coin.link}`"
                    width="100%" height="1000" frameborder="0"
                    allowfullscreen sandbox="allow-scripts">
                </iframe>
            </div>
            <div v-show="selectedTab === 'default'">
                Default tab
            </div>
        </div>
        <div v-else>
            <Loader />
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Loader from '../components/Loader'

export default {
    name: 'Coin',
    components: {
        Loader
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
            console.log(tab)
            this.selectedTab = tab
        }
    },
    computed: {
        ...mapGetters('coins', {
            price: 'getPrice',
            getCoin: 'getCoin'
        })
    },
    async mounted() {
        await this.getPrice(this.$route.params.key)
        this.coin = this.getCoin(this.$route.params.key)
    }
}
</script>

<style lang="less" scoped>
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
</style>