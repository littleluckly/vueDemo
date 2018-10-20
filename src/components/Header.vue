<template>
    <div class="headerWrap">
        <div class="headerMenuWrap">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="/">
                    首页
                </el-menu-item>
                <el-menu-item index="/military">军事</el-menu-item>
                <el-menu-item index="/mailSteamerTour">邮轮游</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
        </div>
        <div class="userOper">
            <el-dropdown v-if="username">
                <span class="el-dropdown-link">
                    <i class="icon iconfont icon-person"></i>{{username}}
                </span>
                <el-dropdown-menu slot="dropdown" class="setWrap">
                    <el-dropdown-item @click.native="logout"><i class="icon iconfont icon-hkquit"></i>退出</el-dropdown-item>
                    <el-dropdown-item @click.native="linkTo"><i class="icon iconfont icon-set1"></i>设置</el-dropdown-item>
                    <el-dropdown-item @click.native="linkTo"><i class="el-icon-edit"></i>发表帖子</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import jsCookie from 'js-cookie'
    import axios from 'axios'
    import {
        mapGetters,
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
            };
        },
        computed: {
            ...mapState([
                'username',
                'loginStatus'
            ])
            // username(){
            //     return this.$store.state.username
            // }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.push(key);
            },
            linkTo() {
                this.$router.push('/perCenter');
            },
            logout() {
                const {
                    dispatch,
                    commit,
                } = this.$store;
                jsCookie.remove('auth')
                jsCookie.remove('username')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="less">
    .headerWrap {
        display: flex;
        .headerMenuWrap {
            flex: 1;
        }
        .userOper {
            width: 100px;
            float: right;
            &:hover{
                background: #f2f2f2;
            }
            .iconfont {
                margin-right: 6px;
            }
            .el-dropdown {
                height: 40px;
            }
        }
    }
</style>
<style lang="less">
        .setWrap{
            i {
                margin-right: 8px;
            }
        }
</style>


