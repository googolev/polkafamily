<template>
    <div class="langSelector">
        <div @click="toggleSelector()" class="item">{{lngSelected}}</div>
        <ul v-if="show">
            <li v-for="option in optionsLng" :key="option.$index" @click="selectLang(option)" class="item">
                {{option.name}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LangSelector',
    data() {
        return {
            optionsLng: [
                { name: 'ENG', key: 'en' },
                { name: 'Рус', key: 'ru' },
            ],
            lngSelected: 'ENG',
            show: false
        }
    },
    methods: {
        selectLang(option) {
            localStorage.setItem('selectedLng', option.name)
            localStorage.setItem('selectedLngKey', option.key)
            this.lngSelected = option.name
            this.$i18n.locale = option.key
            this.toggleSelector()
        },
        toggleSelector() {
            this.show = !this.show
        }
    },
    mounted() {
        const selectedLang = localStorage.getItem('selectedLng')
        const localeKey = localStorage.getItem('selectedLngKey')
        if (selectedLang) {
            this.lngSelected = selectedLang
        } else {
            this.lngSelected = 'ENG'
        }
        if (localeKey) {
            this.$i18n.locale = localeKey
        } else {
            this.$i18n.locale = 'en'
        }
    }
}
</script>

<style lang="less">
    .langSelector {
            position: absolute;
            right: 30px;
            top: 30px;
            min-width: 55px;
            ul {
                padding: 0;
                list-style-type: none;
                margin: 0;
            }
            .item {
                padding: 5px;
                border: 1px solid black;
                border-radius: 4px;
                cursor: pointer;
                background-color:white;
            }
    }
</style>