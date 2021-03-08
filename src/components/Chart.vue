<template>
    <div>
        <trading-vue :data="chart" :titleTxt="`${coinKey}/USD`" v-if="show" :width="width" :height="height"></trading-vue>
        <div v-else>
            <Loader />
        </div>
    </div> 
</template>

<script>
import TradingVue from 'trading-vue-js'
import Loader from '../components/Loader'

export default {
    name: 'Chart',
    components: { TradingVue, Loader },
    props: ['chartData', 'coinKey'],
    data() {
        return {
            chart: null,
            show: false,
            width: 0,
            height: 0
        }
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight / 2
        }
    },
    beforeMount() {
        const chart = {
            type: 'Candles',
            indexBased: true,
            ohlcv: this.chartData,
            tf: '1h'
        }
        this.chart = chart
        console.log(this.chart)
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
        this.width = window.innerWidth
        this.height = window.innerHeight / 2
        setTimeout(() => {
            this.show = true
        }, 3500)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
}
</script>