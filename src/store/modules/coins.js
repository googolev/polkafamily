import axios from 'axios'
import Vue from 'vue'

const getDefaultState = () => {
    return {
        coins: [
            {
                name: 'Polkadot',
                key: 'DOT',
                link: 'polkadot.network'
            },
            {
                name: 'Chainlink',
                key: 'LINK',
                link: 'chain.link'
            },
            {
                name: 'Kusama',
                key: 'KSM',
                link: 'kusama.network'
            },
            {
                name: 'Polkastarter',
                key: 'POLS',
                link: 'polkastarter.com?output=embed '
            },
            {
                name: 'Litentry',
                key: 'LIT',
                link: 'litentry.com'
            },
            {
                name: 'Reef',
                key: 'REEF',
                link: 'reef.finance'
            },
            {
                name: 'Edgeware',
                key: 'EDG',
                link: 'edgewa.re'
            },
            {
                name: 'Phala.Network',
                key: 'PHA',
                link: 'phala.network'
            },
            {
                name: 'Akropolis',
                key: 'AKRO',
                link: 'akropolis.io'
            },
            {
                name: 'ChainX',
                key: 'PCX',
                link: 'chainx.org/en/'
            },
            {
                name: 'MANTRA DAO',
                key: 'OM',
                link: 'mantradao.com/'
            },
            {
                name: 'Darwinia Network',
                key: 'RING',
                link: 'darwinia.network/'
            },
            {
                name: 'Bondly',
                key: 'BONDLY',
                link: 'bondly.finance/'
            },
            {
                name: 'Bounce Token',
                key: 'AUCTION',
                link: 'bounce.finance/'
            },
            {
                name: 'Stafi',
                key: 'FIS',
                link: 'stafi.io/'
            },
            {
                name: 'Polkamarkets',
                key: 'POLK',
                link: 'polkamarkets.com/'
            },
            {
                name: 'Rio DeFi',
                key: 'RFUEL',
                link: 'riochain.io/'
            },
            {
                name: 'Razor Network',
                key: 'RAZOR',
                link: 'razor.network/'
            },
            {
                name: 'Bitgear',
                key: 'GEAR',
                link: 'bitgear.io/'
            },
            {
                name: 'Xeno Token',
                key: 'XNO',
                link: 'xno.live/'
            },
            {
                name: 'Polkacover',
                key: 'CVR',
                link: 'polkacover.com/'
            },
            {
                name: 'DefiCliq',
                key: 'CLIQ',
                link: 'deficliq.medium.com/'
            }, 
        ],
        price: {}
    }
}

const api_key = '365755c4770126fccace6bb6fd07576fcf6a94e6939c95dd9a225e2c2b156789'

const coins = {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        getCoins: state => state.coins,
        getPrice(state){
            return (key) => {
               return state.price[key];
            }
        },
        getCoin(state){
            return (key) => {
               return state.coins.find(coin => coin.key === key)
            }
        }
    },
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },
        UPDATE_PRICE(state, currency) {
            Vue.set(state.price, currency.key, currency.price )
        }
    },
    actions: {
        async GET_PRICE({commit}, key) {
            const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${key}&tsyms=USD&api_key=${api_key}`)
            let data = {
                price: response.data.USD,
                key: key
            }
            commit('UPDATE_PRICE', data)
        }
    }
}

export default coins