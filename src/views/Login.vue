<template>
	<div class="loginContainer" style="margin: 0px;overflow: hidden;height:100%;">
		<div class="formWrap">
			<h1 class="loginTitle">嘤嘤嘤</h1>
			<h3 class="subTitle">注册嘤嘤嘤，发现更多逗比</h3>
			<div class="formBody">
				<el-form v-show="isSignIn" :model="loginForm" :rules="rules2" ref="loginForm" label-width="0">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item  prop="pass">
						<el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSignIn('loginForm')" class="loginBtn" :icon="loginLoading" :disabled="loginDisabled">登陆</el-button>
					</el-form-item>
				</el-form>
				<el-form v-show="!isSignIn" :model="signUpForm" :rules="rules2" ref="signUpForm" label-width="0">
					<el-form-item prop="username">
						<el-input v-model="signUpForm.username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item prop="pass">
						<el-input type="password" v-model="signUpForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item prop="passAgain">
						<el-input type="password" v-model="signUpForm.passAgain" auto-complete="off" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSignIn('signUpForm')" class="loginBtn" :icon="loginLoading" :disabled="loginDisabled">注册</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="loginBottom">
				<span v-if="isSignIn">没有帐号？<span class="signUpBtn" @click="toggleSignType(false)">注册</span></span>
				<span v-else>已有帐号？<span class="signUpBtn" @click="toggleSignType(true)">登陆</span></span>
			</div>
		</div>
	</div>
</template>

<script>
	import jsCookie from 'js-cookie'
	import axios from 'axios'
	import request from '@/utils/request'
	import { mapActions } from 'vuex'
	import { validIsEmpty, validateAgain } from 'utils/helper'
	import queryString from 'query-string'
	export default {
		data() {
			return {
				isSignIn: true,
				loginLoading: '',
				loginForm: {
					pass: '',
					username: ''
				},
				signUpForm: {
					pass: '',
					passAgain: '',
					username: ''
				},
				rules2: {
					pass: [{
						validator: (rule, value, callback)=>validIsEmpty({value, callback, errorText:'请输入密码'}),
						trigger: 'blur'
					}],
					passAgain: [{
						validator: (rule, value, callback)=>validateAgain({value, preValue:this.signUpForm.pass, callback, errorText:'请再次输入密码', errorTextAgain:'两次输入密码不一致'}),
						trigger: 'blur'
					}],
					username: [{
						validator: (rule, value, callback)=>validIsEmpty({value, callback, errorText:'用户名不能为空'}),
						trigger: 'blur'
					}]
				}
			};
		},
		computed: {
			loginDisabled(){
				return this.loginLoading==="el-icon-loading";
			}
		},
		methods: {
			handleSignIn(formName,type) {
				this.$refs[formName].validate((valid) => {
					this.loginLoading='el-icon-loading';
					if (valid) {
						const url = formName==='loginForm'?'/login/signIn':'/login/signUp';
						setTimeout(async() => {
							const result = await this.$request({
								method: 'post',
								url,
								data: {
									...this[formName]
								}
							})
							this.loginLoading='';
							if (result.data.status === "ok") {
								// token失效重新登陆后跳转到之前的页面
								const search = window.location.href.split('?')[1]
								const { preUrl } = queryString.parse(search)
								if(preUrl){
									window.location.replace(`${preUrl}`)
								}else{
									this.$router.push('/')
								}
								const {
									dispatch,
									commit
								} = this.$store;
								dispatch('toggleLoginStatus', {
									flag: true
								})
								dispatch('toggleUsername', {
									username: this[formName].username
								})
							} else {
								this.$message.error(result.data.msg);
							}
						}, 600);
					} else {
						console.log('error submit!!');
						this.loginLoading='';
						return false;
					}
				});
			},
			handleSignUp(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loginLoading='el-icon-loading';
						setTimeout(async() => {
							const result = await this.$request({
								method: 'post',
								url: '/login/signUp',
								data: {
									...this.signUpForm
								}
							});
							this.loginLoading='';
							if (result.data.status === "ok") {
								this.$router.push('/')
								const {
									dispatch,
									commit
								} = this.$store;
								dispatch('toggleLoginStatus', {
									flag: true
								})
								dispatch('toggleUsername', {
									username: this.signUpForm.username
								})
								this.$message.success('注册成功');
							} else {
								this.$message.error(result.data.msg);
							}
						}, 1000);
					} else {
						console.log('error submit!!');
						this.loginLoading='';
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName]&&this.$refs[formName].resetFields();
			},
			toggleSignType(flag) {
				this.isSignIn = flag;
				if (flag) {
					this.resetForm('signUpForm')
				} else {
					this.resetForm('loginForm')
				}
			},
		},
	}
</script>

<style lang="less" scoped>
	.loginTitle{
		font-size: 36px;
		text-align: center;
		color: #0084ff;
	}
	.subTitle{
		text-align: center;
		color: #0084ff;
	}
	.loginContainer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: url('../assets/img/sign_bg.png') 100% 100% no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		.formWrap {
			width: 400px; // height: 600px;
			background: #fff;
			box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
			.formBody {
				padding: 40px 20px 20px 20px;
				.loginBtn {
					width: 100%;
				}
			}
			.loginBottom {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				background-color: #f6f6f6;
				height: 58px;
				border-top: 1px solid #ebebeb;
			}
			.signUpBtn {
				color: #175199;
				cursor: pointer;
			}
		}
	}
</style>
