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
            this.lngSelected = option.name
            this.$i18n.locale = option.key
            this.toggleSelector()
        },
        toggleSelector() {
            this.show = !this.show
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
            }
    }
</style>