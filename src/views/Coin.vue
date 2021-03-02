<template>
    <div>
        <div class="coin-page-header">
            <h1><img :src="require(`@/assets/${coin.key}.jpeg`)"> {{coin ? coin.name : ''}}</h1>
            {{this.$route.params.key}} <span v-if="price(this.$route.params.key)">/ {{ price(this.$route.params.key)}} $</span>
            <iframe v-if="coin.link" :src="`https://${coin.link}`"
                    width="100%" height="1000" frameborder="0"
                    allowfullscreen sandbox>
           
            </iframe>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Coin',
    data() {
        return {
            coin: null
        }
    },
    methods: {
         ...mapActions('coins', {
            getPrice: 'GET_PRICE',
        })
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
</style>