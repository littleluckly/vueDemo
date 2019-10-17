<template>
    <div>
        <h1>及时新闻</h1>
        <div>
            <ul>
                <li v-for="news in militaryNews" :key="news.id" class="newsItem">
                    <a :href="news.newsSrc" target="_blank">{{news.newsTitle}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default { 
        methods: {
            ...mapActions('militaryStore', [
                'fetchMilitaryNews',
            ]) 
        },
        computed: {
            ...mapState('militaryStore', {
                militaryNews: state => state.militaryNews,
            })
        },
        created() {
            this.fetchMilitaryNews()
        }
    }
</script>

<style scoped lang="less">
    .newsItem{
        position: relative;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px dotted #ececec;
        text-align: left;
    }

</style>