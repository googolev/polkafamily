<template>
    <div>
        <ul class="coin-list">
            <li v-for="coin in coins" :key="coin.$index" class="coin-body">
                <a :href="`/coin/${coin.key}`" class="disabled-link">
                <img :src="require(`@/assets/${coin.key}.jpeg`)">
                <div>
                    {{ coin.name }}
                </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'CoinList',
    computed: {
        ...mapGetters('coins', {
            coins: 'getCoins'
        }),
    },
}
</script>

<style lang="less">
    .coin-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        justify-content: center;
         .coin-body {
            display: flex;
            flex-direction: column;
            width: 100px;
            height: 100px;
            justify-content: center;
            align-items: center;
            color: black;
            padding: 10px;
            box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.2);
            &:hover {
                box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.6);
            }
            img {
                width: 25px;
                padding-bottom: 10px;
            }
        }
    }

    .disabled-link {
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
   
</style>