<template>
    <div>
        <h1>个人中心</h1>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
                <el-tab-pane label="密码修改" name="first">密码修改</el-tab-pane>
                <el-tab-pane label="个人资料" name="second">个人资料</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                activeName: 'second'
            };
        },
        created(){
            this.toggleHeaderVisible(false);
        },
        methods: {
            ...mapActions(['toggleHeaderVisible']),
            handleClick(tab, event) {
                console.log(tab, event);
            },
        }
    };
</script>

<style lang="less" scoped>

</style>


