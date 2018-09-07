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
                <!-- <el-submenu index="2">
                    <template slot="title">跟团游</template>
                    <el-menu-item index="/overseaPackageTour">出境跟团</el-menu-item>
                    <el-menu-item index="/interPackageTour">国内跟团</el-menu-item>
                    <el-menu-item index="/aroundPackageTour">周边跟团</el-menu-item>
                </el-submenu> -->
            </el-menu>
        </div>
        <div class="userOper">
            <el-dropdown v-if="username">
                <span class="el-dropdown-link">
                    <i class="icon iconfont icon-person"></i>{{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout"><i class="icon iconfont icon-hkquit"></i>退出</el-dropdown-item>
                    <el-dropdown-item @click.native="linkTo"><i class="icon iconfont icon-set1"></i>设置</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <span class="userOperBtn"><i class="icon iconfont icon-person1"></i>{{username}}</span> -->
        </div>
    </div>
</template>

<script>
    import jsCookie from 'js-cookie'
    import axios from 'axios'
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
                activeIndex2: '1',
                username:''
            };
        },
		created() {
            this.username=jsCookie.get('username') ;
		},
        computed: {
            // ...mapGetters(['username'])
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.push(key);
            },
            linkTo(){
                this.$router.push('/perCenter');
                // window.open('/perCenter')
            },
            logout() {
                const {
                    dispatch,
                    commit,
                } = this.$store;
                jsCookie.remove('auth')
                jsCookie.remove('username')
                this.$router.push('/login')
                // axios({
                //     method: 'get',
                //     url: '/login/logout'
                // }).then(res=>{
                //     if(res.data==="ok"){
                //         this.$router.push('/login')
                //     }
                // })
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
            .userOperBtn {
                cursor: pointer;
                >i {
                    margin-right: 6px;
                }
            }
            .el-dropdown{
                height: 40px;
            }
        }
    }
</style>


