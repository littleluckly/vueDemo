<template>
    <div class="headerWrap">
        <div class="headerMenuWrap">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="/">
                    首页
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">跟团游
                    </template>
                        <el-menu-item index="/overseaPackageTour">出境跟团</el-menu-item>
                        <el-menu-item index="/interPackageTour">国内跟团</el-menu-item>
                        <el-menu-item index="/aroundPackageTour">周边跟团</el-menu-item>
                </el-submenu>
                <el-menu-item index="/freeTour">自由行</el-menu-item>
                <el-menu-item index="/mailSteamerTour">邮轮游</el-menu-item>
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
            // console.log(key, keyPath);
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


