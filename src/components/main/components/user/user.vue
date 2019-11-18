<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-12 10:05:45
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
	<div class="user-avator-dropdown">
		<Dropdown>
			<!--<Badge :dot="!!messageUnreadCount">-->
			<Avatar :src="userAvator" />
			<!-- </Badge>-->
			<Icon :size="18" type="md-arrow-dropdown"></Icon>
			<DropdownMenu slot="list">
				<DropdownItem @click.native="isAdminModal = true">修改密码</DropdownItem>
				<DropdownItem @click.native="logOut" divided>退出</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	
		<Modal v-model="isAdminModal" :styles="{top:'60px'}">
			<p slot="header" style="font-size:16px">
				<span>修改密码</span>
			</p>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
				<FormItem label="修改密码" prop="password">
					<Input type="password" v-model="formCustom.password"></Input>
				</FormItem>
				<FormItem label="再次输入密码" prop="passwdCheck">
					<Input type="password" v-model="formCustom.passwdCheck"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="modify">提交</Button>
					<Button @click="cancelAdmin" style="margin-left: 8px">取消</Button>
				</FormItem>
			</Form>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
export default {
	name: "User",
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("密码不能为空"));
			} else {
				if (this.formCustom.passwdCheck !== "") {
					// 对第二个密码框单独验证
					this.$refs.formCustom.validateField("passwdCheck");
				}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.formCustom.password) {
				callback(new Error("两次密码不匹配"));
			} else {
				callback();
			}
		};
		return {
			isAdminModal: false,
			formCustom: {
				password: "",
				passwdCheck: ""
			},
			ruleCustom: {
				password: [
					{ required: true, validator: validatePass, trigger: "blur" }
				],
				passwdCheck: [
					{ required: true, validator: validatePassCheck, trigger: "blur" }
				]
			}
		};
	},
	props: {
		userAvator: {
			type: String,
			default: ""
		},
		messageUnreadCount: {
			type: Number,
			default: 0
		}
	},
	methods: {
		cancelAdmin() {
			this.isAdminModal = false;
		},
		logOut() {
			this.$axios
				.get("api/api/netflow/v1/xky/logout")
				.then(res => {
					// console.log(res)
					const code = res.data.code;
					// console.log(code)
					if (code == "0000") {
						this.$Notice.success({
							desc: "登出成功！"
						});
						this.$router.push("/");
					} else {
						this.$Notice.error({
							title: "登出失败",
							desc: res.data.errMsg
						});
					}
				})
				.catch(error => {
					console.log(error.response);
					console.log(error.message);
					this.$Notice.error({
						desc: "登出失败！"
					});
				});
		},
		modify() {
			const password = this.formCustom.password;
			// console.log(password)
			this.$axios
				.post("api/api/netflow/v1/xky/change/admin/" + password)
				.then(response => {
					// console.log(response)
					this.isAdminModal = false;
					this.$Message.success("修改密码成功");
				})
				.catch(err => {
					console.log(err);
					this.$Message.error("修改密码失败");
				});
		}
	}
};
</script>
