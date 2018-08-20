<template>
    <div class="headerWrap">
        <div class="headerMenuWrap">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="/">
                    首页1
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台
                    </template>
                        <el-menu-item index="2-1"><i class="el-icon-edit"></i>选项test1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">
                                选项4
                            </template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
        </div>
        <div class="userOper">
            <span class="userOperBtn">注册/登陆{{loginStatus}}</span>
        </div>
    </div>
</template>

<script>
import {
    createNamespacedHelpers
} from 'vuex'

const {
    mapGetters,
    mapActions,
    mapState
} = createNamespacedHelpers('headerStore')

export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    computed: {
        ...mapGetters(['loginStatus'])
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$router.push(key);
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped lang="less">
    .headerWrap{
        display: flex;
        .headerMenuWrap{
            flex:1;
        }
        .userOper{
            width: 100px;
            float: right;
            .userOperBtn{
                cursor: pointer;
            }
        }
    }
</style>


