<template>
    <div class="perCenWrap">
        <h1>个人中心</h1>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
                <el-tab-pane label="个人资料" name="infoTab">
                    <el-form :model="userInfoData" :rules="rules2" ref="userInfo" label-width="180px" class="userInfoWrap">
                        <el-form-item label="用户名称" prop="username">
                            <el-input v-model="userInfoData.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userInfoData.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender" style="text-align:left;">
                            <el-radio-group v-model="userInfoData.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="简介" prop="intro">
                            <el-input type="textarea" v-model="userInfoData.intro" placeholder="请输入简介"></el-input>
                        </el-form-item>
                        <el-form-item class="operWrap">
                            <el-button type="danger" @click="resetUserInfoForm('userInfo')" class="loginBtn">重置</el-button>
                            <el-button type="primary" @click="handleUpdateUserInfo" class="loginBtn">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码修改" name="psdTab">密码修改</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState,
    } from 'vuex'
    export default {
        data() {
            var validateUserName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            return {
                activeName: 'infoTab',
                userInfo: {
                    username: ''
                },
                rules2: {
                    username: [{
                        validator: validateUserName,
                        trigger: 'blur'
                    }],
                },
            };
        },
        created() {
            this.toggleHeaderVisible(false);
            this.fetchUserInfo()
        },
        computed: {
            ...mapState({
                userInfoData: state => {
                    return state.perCentStore.userInfoData;
                }
            })
        },
        methods: {
            ...mapActions(['toggleHeaderVisible']),
            ...mapActions('perCentStore', [
                'updateUserInfo',
                'fetchUserInfo',
            ]),
            handleClick(tab, event) {
                console.log(tab, event);
            },
            resetUserInfoForm() {
                this.$refs['userInfo'].resetFields()
            },
            handleUpdateUserInfo() {
                this.updateUserInfo({
                    form: this.$refs['userInfo']
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    .perCenWrap {
        height: 100%;
        background-color: #ffffff;
        >h1 {
            margin-top: 0;
        }
    }
    .userInfoWrap {
        width: 80%;
        // :global .el-form-item{
        //     &>div{
        //         text-align: left;
        //     }
        // }
        // .el-form-item__content{
        //     text-align: left;
        // }
        .operWrap{
            text-align: center;
        }
    }
</style>


