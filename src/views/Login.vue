<template>
	<div class="login-container" style="margin: 0px;overflow: hidden;height:100%;">
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm2.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import jsCookie from 'js-cookie'
	// import THREE from '@/assets/jquery.particleground.min'
	// import {
	// 	createNamespacedHelpers
	// } from 'vuex'
	// const {
	// 	mapActions
	// } = createNamespacedHelpers('loginStore')
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					username: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					username: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						jsCookie.set('auth', 'true222')
						this.$router.push('/')
						const {
							dispatch,
							commit
						} = this.$store;
						// dispatch({
						// 	type: 'toggleLoginStatus',
						// 	flag: true
						// })
						dispatch('toggleLoginStatus',{flag:true}, {root:false})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// ...mapActions(['toggleLoginStatus'])
		}
	}
</script>

<style lang="less" scoped>
</style>
