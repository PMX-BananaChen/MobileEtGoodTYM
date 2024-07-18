<template>
	<form ref="form" model="form">
		<van-nav-bar left-arrow @click-left="backHome" />
		<!-- 无数据显示 -->
		<div class="van-divider--center" v-show="showT">
			暂无签核数据
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<!-- 待签核清单列表 -->
		<group class="formItem" v-for="(item, index) in opinionsLists" :key="index" id="listId">
			<form-preview :header-label="sss" :header-value="opinionsList[index].releasedate" style="color:#1989fa;" 
			 :body-items="opinionsLists[index]" @click.native="goDetailOpin(opinionsList[index].id)"
				:name="opinionsList[index].id" />
		</group>
		<van-field v-model="form.checkno" label="主管工号" v-if="false"  />
		<van-card></van-card>
		<van-tabbar v-model="active" active-color="#ff4c7f" class="weui-tabbar">
			<van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars"
				:key="'tabbar' + index">
				<span>{{item.title}}</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? item.active : item.normal" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</form>
</template>

<script>
	//:header-label="sss" :header-value="opinionsList[index].id"
	import {
		listReleaseGood
	} from "@/api/releasegood";
	import Conversion from "@/utils/Conversion";
	import {
		FormPreview,
		Group,
		Loading
	} from 'vux';
	import {
		getCode
	} from "@/api/login";
	import {
		getEmployee
	} from "@/api/user";
	export default {
		data() {
			return {
				id: '',
				sss: '申请时间',
				showT: false, //无数据显示
				opinShow: false,
				opinionsList: [],
				opinionsLists: [],
				// // 第一：错误信息
				// errorMsg: {
				// 	resulta: '',
				// },
				showLoading: true,
				loadText: '加载中...',
				// 表单参数
				form: {
					checkno: '',
					result: '0',
					stateid:null,
				},
				active: false,
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('@/pages/images/pass.png'),
						active: require('@/pages/images/passa.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('@/pages/images/deska.png'),
						active: require('@/pages/images/desk.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('@/pages/images/my.png'),
						active: require('@/pages/images/mya.png')
					},
				]
			};
		},
		created() { //查询数据
			var userId = uni.getStorageSync('UserId');
			//从网络进来的就不要在调用了，不然太慢了
			if (userId === null || userId === "") {
				this.setUser(); //从网络进来的重新拿账号
			} else {
					this.form.checkno=userId;
					listReleaseGood(this.form).then(response => {
						if (response.code === 200) {
							this.opinionsList = response.rows;
							this.processOpinion();
							this.showLoading = false;
							if (this.opinionsList.length === 0) {
								this.showT = true;
							}
						} else {
							this.showT = true;
						}
					});
			}
		},
		onLoad() {},
		methods: {
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				// this.$store.commit('setTableIndex', '/managercheck');
				uni.setStorageSync('TableIndex',  '/managercheck');
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
			// 处理传入的数据集 意见
			processOpinion() {
				let arr = [];
				let self = this;
				var releasetypev='';
				for (let i = 0; i < self.opinionsList.length; i++) {
					let c = {
							label: "申请人",
							value: self.opinionsList[i].empname,
						};
						switch(self.opinionsList[i].releasetype.replace(' ','')) 
						  {
							  case "1":
							      releasetypev='員工私人物品'
							      break;
							  case "2":
							      releasetypev='廠商自帶物品'
							      break;
							  case "3":
							      releasetypev='公司物品'
							      break;
						  }
						let e = {
							label: "放行類型",
							value: releasetypev,
						};
						let f = {
							label: "状 态",
							value: "待审核",
						};
						let g = {
							label: "待签核人",
							value: self.opinionsList[i].checkname,
						};
						let arrs = new Array(c,e,f,g);
						arr.push(arrs);
				}
				self.opinShow = arr.length === 0;
				self.opinionsLists = [...arr];
			},
			// 跳转处理意见单详情按钮
			goDetailOpin(value) {
				// this.$store.commit('setTableIndex', '/managercheck');
				// this.$store.commit('setUserNo', value);
				uni.setStorageSync('TableIndex',  '/managercheck');
				uni.setStorageSync('UserNo',  value);

				let val = "/actioncheck?id=" + value;
				this.$router.push(val);
			},
			backHome() {
				this.$router.push(uni.getStorageSync('TableIndex'));
			},
			//考虑从超链接进来的要重新设置
			setUser() {
				const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				if (code) { // 通过code获取 openId等用户信息
					getCode(code)
						.then((data) => {
							if (data.code === 1) {
								let userId = data.data.empNo.trim()
								uni.setStorageSync('UserId', userId);
								this.setUserName(userId)
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else {
					Conversion.getCodeApi('a')
				}
			},
			// 获取当前登录人名称
			setUserName(userId) {
				let self = this;
				if (!userId) return
				console.log(userId);
				getEmployee(userId)
					.then((data) => {
						if (data.msg === "操作成功") {
							uni.setStorageSync('UserName', data.data.empName);
							uni.setStorageSync('Sex', data.data.empSex);
							self.form.checkno=userId;
							listReleaseGood(self.form).then(response => {
								if (response.code === 200) {
									self.opinionsList = response.rows;
									self.processOpinion();
									self.showLoading = false;
									if (self.opinionsList.length === 0) {
										self.showT = true;
									}
								} else {
									self.showT = true;
								}
							});
						} else {
							console.log(data.msg);
							alert(data.msg);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
		},
		components: {
			Loading
		}
	};
</script>

<style>
	.van-divider--center
	{
	   text-align: center;
	   font-size: larger;
	   color:#007AFF;
	}
	.demo-checkbox {
		margin: 100px 0 0 20px;
	}

	.value-class {
		flex: none !important;
	}

	.icon {
		width: 20px;
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}

	.van-tabbar-item--active {
		color: #e10f02;
	}
	.vux-form-preview >>> .weui-form-preview__value
	{
	  font-size: 0.8em;
	}
	.gridCell >>> .van-icon {
	    font-size: 50px;
	}
	.vant-nav-bar-index >>>.van-icon-arrow-left:before {
	    color: #999999;
		block-size:30px;
	}
</style>
