<template>
    <div class="perCenWrap">
        <h1>个人中心</h1>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
                <el-tab-pane label="个人资料" name="infoTab">
                    <el-form :model="userInfoData" :rules="rules2" ref="userInfo" label-width="180px" class="userInfoWrap">
                        <el-form-item label="头像" prop="avatar">
                            <div class="user-avatar">
                                <img :src="avatarSrc" />
                                <el-upload
                                    class="upload-demo"
                                    action="/doc/uploadFile"
                                    ref="elupload"
                                    :show-file-list=false
                                    :on-success="showUploadModal"
                                    :on-change="handleFileChange"
                                    >
                                    <div class="uploadBtn">
                                        <i class="el-icon-picture"></i>
                                        <div>修改我的头像</div>
                                    </div>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="用户名称" prop="username">
                            <el-input v-model="userInfoData.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userInfoData.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender" style="text-align:left;">
                            <el-radio-group v-model="userInfoData.gender">
                                <el-radio border :label=1>男</el-radio>
                                <el-radio border :label=2>女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="简介" prop="desc">
                            <el-input type="textarea" v-model="userInfoData.desc" placeholder="请输入简介"></el-input>
                        </el-form-item>
                        <el-form-item class="operWrap">
                            <el-button type="danger" @click="resetUserInfoForm('userInfo')" class="loginBtn">重置</el-button>
                            <el-button type="primary" @click="handleUpdateUserInfo" class="loginBtn">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码修改" name="psdTab">
                    <el-form :model="userPwdData" :rules="rules1" ref="userPwd" label-width="180px" class="userInfoWrap">
                        <el-form-item label="原密码" prop="oriPwd">
                            <el-input type="password" v-model="userPwdData.oriPwd" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPwd">
                            <el-input type="password" v-model="userPwdData.newPwd" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="密码确认" prop="checkPwd">
                            <el-input type="password" v-model="userPwdData.checkPwd" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item class="operWrap">
                            <!-- <el-button type="danger" @click="resetUserInfoForm('userInfo')" class="loginBtn">重置</el-button> -->
                            <el-button type="primary" @click="updateUserPwd" class="loginBtn">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog
            title="头像编辑"
            :visible.sync="avatarDialogVisible"
            width="30%">
            <!-- <canvas id="canEle"></canvas> -->
            <div class="avatar-preview-wrap"><img class="avatar-preview" :src="userAvatar.host+userAvatar.src"/></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAvatarDialog">取 消</el-button>
                <el-button type="primary" @click="handleUpdateUserAvatar">确 定</el-button>
            </span>
            </el-dialog>

    </div>
</template>

<script>
    import { validIsEmpty, validateAgain } from 'utils/helper'
    import avatarSrc from '../assets/img/default_avatar.jpg'
    import {
        mapActions,
        mapState,
    } from 'vuex'
    export default {
        data() {
            return {
                activeName: 'infoTab',
                avatarDialogVisible: false,
                userAvatar: {},
                userInfo: {
                    username: ''
                },
                userPwdData: {
                    oriPwd:'',
                    newPwd:'',
                    checkPwd:'',
                },
                rules2: {
                    username: [{
                        validator: (rule, value, callback)=>validIsEmpty({value, callback, errorText:'用户名不能为空'}),
                        trigger: 'blur'
                    }],
                },
				rules1: {
					checkPwd: [{
						validator: (rule, value, callback)=>validateAgain({value, preValue:this.userPwdData.newPwd, callback, errorText:'请再次输入密码', errorTextAgain:'两次输入密码不一致'}),
						trigger: 'blur'
					}],
					oriPwd: [{
						validator: (rule, value, callback)=>validIsEmpty({value, callback, errorText:'请输入原密码'}),
						trigger: 'blur'
					}],
					newPwd: [{
						validator: (rule, value, callback)=>validIsEmpty({value, callback, errorText:'请输入密码'}),
						trigger: 'blur'
					}],
				}

            };
        },
        created() {
            this.toggleHeaderVisible({currRoute:this.$route.name});
            this.fetchUserInfo()
        },
        computed: {
            ...mapState({
                userInfoData: state => {
                    return state.perCentStore.userInfoData;
                }
            }),
            avatarSrc(){
                // E:\vue-demo\vueDemo\src\assets\img\default_avatar.jpg
                return this.userInfoData.avatar?this.userInfoData.host+this.userInfoData.avatar:avatarSrc
            }
        },
        methods: {
            ...mapActions(['toggleHeaderVisible']),
            ...mapActions('perCentStore', [
                'updateUserInfo',
                'fetchUserInfo',
                'updateUserAvatar',
            ]),
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            resetUserInfoForm() {
                this.$refs['userInfo'].resetFields();
                this.fetchUserInfo()
            },
            async handleUpdateUserInfo() {
                const result = await this.updateUserInfo({
                    form: this.$refs['userInfo']
                });
                if (result.status === 'ok') {
                    this.$message({
                        message: result.msg,
                        type: 'success'
                    });
                }
            },
            showUploadModal(response, file, fileList) {
                // console.log(response)
                this.userAvatar = response;
                this.avatarDialogVisible = true;
            },
            handleFileChange(file, fileList){
                // TODO:图片转canvas,实现裁剪，压缩上传
                // let img = new Image();
                // img.src = window.URL.createObjectURL(file.raw);
                // img.onload=function(){
                //     const canvas = document.getElementById('canEle');
                //     canvas.width=800;
                //     canvas.height=300;
                //     let ctx = canvas.getContext('2d');
                //     ctx.drawImage(img,10,10,800,300)
                // }
            },
            // 更新头像信息
            async handleUpdateUserAvatar(){
                this.avatarDialogVisible=false;
                const result = await this.updateUserAvatar(this.userAvatar.src);
                if(result.data.status==='ok'){
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                }
            },
            cancelAvatarDialog(){
                this.avatarDialogVisible=false;
                this.userAvatar={};
            },
            // 修改密码
            updateUserPwd(){
                this.$refs['userPwd'].validate( async valid=>{
                    if(valid){
                        const result = await this.$request({
                            method:'post',
                            url:'/users/updateUserPwd',
                            data:this.userPwdData
                        });
                        if(result.data.status==='ok'){
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                        }else{
                            this.$message({
                                type: 'error',
                                message: result.data.msg||'操作失败'
                            })
                        }
                        console.log(result)
                    }
                })
            },
        }
    };
</script>

<style lang="less">
    .perCenWrap {
        height: 100%;
        background-color: #ffffff;
        >h1 {
            margin-top: 0;
        }
    }
    .userInfoWrap {
        width: 80%;
        .operWrap {
            text-align: center;
        }
        .user-avatar {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
            &:hover {
                .upload-demo {
                    background: rgba(0, 0, 0, 0.3);
                    .uploadBtn {
                        display: block;
                    }
                }
            }
            .upload-demo {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                z-index: 2;
                background: rgba(0, 0, 0, 0);
                .el-upload {
                    width: 100%;
                    height: 100%;
                }
                .uploadBtn {
                    display: none;
                    color: #fff;
                    i {
                        font-size: 24px;
                        vertical-align: bottom
                    }
                }
            }
        }
    }
    .el-dialog {
        width: 65% !important;
        max-height: 650px;
        .el-dialog__header{
            text-align: left;
        }
        .avatar-preview {
            max-height: 400px;
            width: 100%;
        }
    }
</style>


