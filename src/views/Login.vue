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
						<el-button type="primary" @click="handleSignUp('signUpForm')" class="loginBtn" :icon="loginLoading" :disabled="loginDisabled">注册</el-button>
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
	// import {
	// 	createNamespacedHelpers
	// } from 'vuex'
	// const {
	// 	mapActions
	// } = createNamespacedHelpers('loginStore')
	import { mapActions } from 'vuex'
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			var validatePassAgain = (rule, value, callback) => {
				this.signUpForm.passAgain
				if (!value) {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.signUpForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
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
						validator: validatePass,
						trigger: 'blur'
					}],
					passAgain: [{
						validator: validatePassAgain,
						trigger: 'blur'
					}],
					username: [{
						validator: checkAge,
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
			handleSignIn(formName) {
				this.$refs[formName].validate((valid) => {
					this.loginLoading='el-icon-loading';
					if (valid) {
						setTimeout(() => {
							axios({
								method: 'post',
								url: '/login/signIn',
								data: {
									...this.loginForm
								}
							}).then((res) => {
								this.loginLoading='';
								if (res.data.status === "ok") {
									this.$router.push('/')
									const {
										dispatch,
										commit
									} = this.$store;
									dispatch('toggleLoginStatus', {
										flag: true
									})
									dispatch('toggleUsername', {
										username: this.loginForm.username
									})
								} else {
									this.$message.error(res.data.msg);
								}
							}, (res) => {
								this.loginLoading='';
							});
						}, 1000);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleSignUp(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loginLoading='el-icon-loading';
						setTimeout(() => {
							axios({
								method: 'post',
								url: '/login/signUp',
								data: {
									...this.signUpForm
								}
							}).then((res) => {
								this.loginLoading='';
								if (res.data.status === "ok") {
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
									this.$message.error(res.data.msg);
								}
							}, (res) => {
								alert('error')
								this.loginLoading='';
							});
						}, 1800);
					} else {
						console.log('error submit!!');
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
