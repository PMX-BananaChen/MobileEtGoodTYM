<template>
	<form ref="form" model="form">
		<div class="van-divider--center" v-show="showT">
			暂无签核数据
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<!-- 待签核清单列表 -->
		<div style="margin: 0px auto;" v-if="!showT">
			<div style="text-align: center">物品電子放行單</div>
			<van-field label="異常通報"></van-field>
			<uni-row>
				<uni-col :span="6">
					<van-field label="系統單號："></van-field>
				</uni-col>
				<uni-col :span="18">
					<van-cell center="false" :value="form.formno" />
				</uni-col>
			</uni-row>
			<van-cell title="放行類型：" :value="form.releasetypes" />
			<van-cell title="申請人：" :value="form.empnames" />
			<van-cell title="攜帶人：" :value="form.carriers" />
			<van-cell title="出发地點：" :value="form.placedepartures" />
			<van-cell title="送貨地點：" :value="form.placedeliverys" />
			<van-cell title="專案物品：" :value="form.projectitem" />
			<van-cell title="備註：" :value="form.remark" />
			<van-cell title="交通工具：" :value="form.vehicles" />
			<van-cell title="放行時段：" :value="releaseperiodname" v-if="goodcompanyv" />
			<van-cell title="物品類型：" :value="itemtypename" v-if="goodcompanyv" />
			<view>
			  <van-cell-group inset>
			      <van-cell title="通報異常安檢站：" class="myCell"><view style="color: red;">{{form.sitename}}</view></van-cell>
			  </van-cell-group>
			</view>
			<van-cell  title="異常內容：" class="myCell"><view style="color: red;">{{form.errremark}}</view></van-cell>
			<van-field label="放行內容："  ></van-field>
			<view v-if="goodprivatev">
				<uni-table ref="tableprivate">
					<uni-tr>
						<uni-th align="center">序号<span style="color:red">*</span></uni-th>
						<uni-th width="150px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th align="center">物品照片<span style="color:red">*</span></uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.privates" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td>{{ item.itemname }}</uni-td>
						<uni-td>
							<view class="name">{{ item.unit }}</view>
						</uni-td>
						<uni-td align="center">{{ item.quantity }}</uni-td>
						<uni-td align="center">
							<uni-image-preview :urls="imageUrls[index]"></uni-image-preview>
							<image v-for="(url, index) in imageUrls[index]" :key="index" :src="url"
								@click="previewImage(index)"
								mode="widthFix" style="width: 100%;"
								></image>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view v-if="goodbyov">
				<uni-table ref="tablebyo">
					<uni-tr>
						<uni-th align="center">序号<span style="color:red">*</span></uni-th>
						<uni-th width="150px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th align="center">物品照片<span style="color:red">*</span></uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.byos" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td>{{ item.itemname }}</uni-td>
						<uni-td>
							<view class="name">{{ item.unit }}</view>
						</uni-td>
						<uni-td align="center">{{ item.quantity }}</uni-td>
						<uni-td align="center">
							<uni-image-preview :urls="imageUrls[index]"></uni-image-preview>
							<image v-for="(url, index) in imageUrls[index]" :key="index" :src="url"
								@click="previewImage(index)"
								mode="widthFix" style="width: 100%;"
								></image>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view v-if="goodcompanyv">
				<uni-table ref="tablecompany" border>
					<uni-tr>
						<uni-th width="60" align="center">物品名稱</uni-th>
						<uni-th width="40" align="center">規格/單位</uni-th>
						<uni-th align="40">數量</uni-th>
						<uni-th width="40" align="center">放行原因</uni-th>
						<uni-th align="left">物品照片<span style="color:red">*</span></uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.companys" :key="index">
						<uni-td>{{ item.itemname }}</uni-td>
						<uni-td>
							<view class="name">{{ item.unit }}</view>
						</uni-td>
						<uni-td align="center">{{ item.quantity }}</uni-td>
						<uni-td align="center">{{ item.reason }}</uni-td>
						<uni-td align="center">
							<uni-image-preview :urls="imageUrls[index]"></uni-image-preview>
							<image v-for="(url, index) in imageUrls[index]" :key="index" :src="url"
								@click="previewImage(index)"
								mode="widthFix" style="width: 100%;"
								></image>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view v-if="goodprojectv">
				<van-cell v-model="form.projectcode" label="管制專案代號:" placeholder="代號" required />
				<uni-row>
					<uni-col :span="12">
						<van-cell v-model="form.sealno" label="保密封條編號:" placeholder="編號1" required />
					</uni-col>
					<uni-col :span="12">
						<van-cell v-model="form.sealno2" />
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="8">
						<van-cell title="包裝箱照片(可見封條)" />
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col>
						<uni-image-preview :urls="imageUrls"></uni-image-preview>
						<image v-for="(url, index) in imageUrls" :key="index" :src="url" @click="previewImage(index)"
						mode="widthFix" style="width: 100%;"
						>
						</image>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col>
						<uni-image-preview :urls="imageUrls2"></uni-image-preview>
						<image v-for="(url, index) in imageUrls2" :key="index" :src="url"   @click="previewImage2(index)"
						 mode="widthFix" style="width: 100%;"
						>
						</image>
					</uni-col>
				</uni-row>
				<uni-table ref="tableproject" border>
					<uni-tr>
						<uni-th width="150" align="center">物品名稱</uni-th>
						<uni-th width="80" align="center">規格/單位</uni-th>
						<uni-th align="center">數量</uni-th>
						<uni-th width="204" align="center">放行原因</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.projects" :key="index">
						<uni-td>{{ item.itemname }}</uni-td>
						<uni-td>
							<view class="name">{{ item.unit }}</view>
						</uni-td>
						<uni-td align="center">{{ item.quantity }}</uni-td>
						<uni-td align="center">{{ item.reason }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<van-field v-model="form.returntype" v-show="false"></van-field>
			<van-field v-model="form.checkno" v-show="false"></van-field>
		</div>
		<van-field v-model="form.returntype"></van-field>
		<van-field v-model="form.returntype"></van-field>
		<msg v-show="msgbox">
			<template slot="buttons">
				<x-button plain type="primary">操作成功</x-button>
			</template>
		</msg>
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
	import {
		getReleaseGood,
		updateReleaseGood
	} from "@/api/releasegood";
	import Conversion from "@/utils/Conversion";
	import {
		FormPreview,
		Group,
		Msg,
		Loading
	} from 'vux';
	import {
		Field
	} from 'vant';
	import {
		getCode
	} from "@/api/login";
	import {
		getEmployee
	} from "@/api/user";
	import {
		updateFlow
	} from "@/api/flow";
	
	import config from '@/config'
	const baseUrl = config.baseUrl
	const imagePaths=config.imagePath;
	
	export default {
		data() {
			return {
				id: '',
				userNo: '',
				titles: '状态',
				titlesv: '待签核',
				showT: false, //无数据显示
				msgbox: false, //操作成功对话框
				listboxs: true, //
				opinShow: false,
				butonShow: true,
				opinionsList: [],
				opinionsLists: [],
				// 第一：错误信息
				errorMsg: {
					resulta: '',
				},
				showLoading: true,
				loadText: '加载中...',
				count: 0,
				timer: 0,
				remark: '',
				// 表单参数
				form: {
					formno: '',
					empno: '',
					empname: '',
					empnames: '',
					factory: '',
					dept: '',
					area: '',
					company: '',
					releasedate: null,
					releaseperiod: null,
					releasetype: null,
					releasetypes: '',
					itemtype: null,
					carriertype: null,
					carrier: '',
					carriers: '',
					carrierin: '',
					vehicle: null,
					vehicles: '',
					licenseplate: null,
					placedepartures:'',
					placedelivery: null,
					placedeliverys: '',
					deliverystation: null,
					leavestatus: null,
					livingdorm: null,
					thatdorm: null,
					computerequipment: null,
					securitystation: null,
					projectcode: null,
					projectitem: '',
					sealno: null,
					sealno2: null,
					picture: null,
					pictureurl: null,
					picture2: null,
					pictureurl2: null,
					stateid: null,
					privates: [],
					byos: [],
					companys: [],
					projects: [],
					remark: '',
					returntype: '',
					checkno: '',
					backremark: '',
					sitename:'',
					errremark:'',
				},
				active: 1,
				goodprivatev: false,
				goodbyov: false,
				goodcompanyv: false,
				goodprojectv: false,
				imageUrls: [],
				imageUrls2: [],
				imageItem:[],
				flow:{
					  formno:'',
					  sitename:'',
					  checkNo:'',
					  result:'',
				},
				itemtypename: '',
				releaseperiodname: '',
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "放行申请",
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
				],
			};
		},
		created() { //查询数据
		    var userNos=uni.getStorageSync('UserNo');
		    var userId = uni.getStorageSync('UserId');
			if (window.location.href.split('?id=').length > 1) {
				this.id = window.location.href.split('?id=')[1]
				console.log('33322');
				console.log(this.id);
				this.id = this.id.split('&')[0];
				this.userNo = this.id;
				uni.setStorageSync('UserNo', this.id);
				console.log('123');
				console.log(this.id);
				console.log('44');
			} else {
				this.id = userNos;
				console.log('33');
				console.log(this.id);
			}
			//从网络进来的就不要在调用了，不然太慢了
			if (userId === null || userId === "") {
				this.setUser(); //从网络进来的重新拿账号
			} else {
				this.butonShow = false;
				this.listboxs = false;
				this.getdata();
				this.remark = this.form.remark;
			}
			// //测试账号
			// this.$store.commit('setUserId', 74476)
			// this.setUserName(this.$store.state.userId)
		},
		methods: {
			remarkc(e) {
				this.form.remark = e.detail;
			},
			releasetypesc(e) {
				this.form.releasetypes = e.detail;
			},
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				uni.setStorageSync('TableIndex',  '/abnormalchecks');
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
			query(e) {
				if (e) {
					this.form.backremark = e.detail
				}
			},
			backHome() {
				this.$router.push(uni.getStorageSync('TableIndex'));
			},
			//考虑从超链接进来的要重新设置
			setUser() {
				const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				if (code) {// 通过code获取 openId等用户信息
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
				this.butonShow = false;
				this.listboxs = false;
				if (!userId) return
				getEmployee(userId)
					.then((data) => {
						if (data.msg === "操作成功") {
							// this.$store.commit('setUserName', data.data.empName);
							// this.$store.commit('setSex', data.data.empSex);
							uni.setStorageSync('UserName',  data.data.empName);
							uni.setStorageSync('Sex',data.data.empSex);
							this.getdata();
						} else {
							console.log(err);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
			getBoolean() {
				if (this.showT) {
					this.listboxs = false;
				} else {
					this.listboxs = true;
				}
			},
			getdata() {
				let self = this;
				getReleaseGood(self.id).then(data => {
					if (data.code === 200) {
						self.form = data.data;
						if (self.form.mainresult === '1') //已经审核过
						{
							self.showT = true;
							self.showLoading = false;
							self.butonShow = true;
							// this.errorMsg.resulta = "已经处理！";
							// this.$store.commit('setUserId', this.opinionsList.managerno.replace(/\b(0+)/gi, ""))
						} else {
							self.listboxs = true;
							debugger;
							let preurl =imagePaths;
							switch (self.form.releasetype.replace(' ', '')) {
								case "1":
									self.goodprivatev = true;
									self.goodbyov = false;
									self.goodcompanyv = false;
									self.goodprojectv = false;
									self.form.releasetypes = '員工私人物品';
									var  j=0;
									self.form.privates.forEach((elv) => {
										self.imageItem=[];
										if (elv.picture === null || elv.picture === '') {

										} else {
											for (var i = 0; i < elv.picture.split(';').length; i++) {
												let url =preurl + elv.picture.split(';')[i];
												self.imageItem.push(url);
											}
											self.imageUrls.push(self.imageItem);
										}
										j=j+1;
									});
									break;
								case "2":
									self.goodbyov = true;
									self.goodprivatev = false;
									self.goodcompanyv = false;
									self.goodprojectv = false;
									self.form.releasetypes = '廠商/訪客自帶';
									var  j=0;
									self.form.byos.forEach((elv) => {
										self.imageItem=[];
										if (elv.picture === null || elv.picture === '') {

										} else {
											for (var i = 0; i < elv.picture.split(';').length; i++) {
												let url =preurl + elv.picture.split(';')[i];
												self.imageItem.push(url);
											}
											self.imageUrls.push(self.imageItem);
										}
										j=j+1;
									});
									break;
								case "3":
									if (self.form.itemtype === '12') {
										self.goodbyov = false;
										self.goodprivatev = false;
										self.goodcompanyv = false;
										self.goodprojectv = true;
										if (self.form.picture === null ||self.form.picture === '') {
									
										} else {
											for (var i = 0; i < self.form.picture.split(';').length; i++) {
												self.imageUrls.push(preurl + self.form.picture.split(';')[i]);
											}
										}
										if (self.form.picture2 === null ||self.form.picture2 === '') {
																			
										} else {
											for (var i = 0; i < self.form.picture2.split(';').length; i++) {
												self.imageUrls2.push(preurl + self.form.picture2.split(';')[i]);
											}
										}
									} else {
										self.goodbyov = false;
										self.goodprivatev = false;
										self.goodcompanyv = true;
										self.goodprojectv = false;
										var  j=0;
										self.form.companys.forEach((elv) => {
											self.imageItem=[];
											if (elv.picture === null || elv.picture === '') {
										
											} else {
												for (var i = 0; i < elv.picture.split(';').length; i++) {
													let url =preurl + elv.picture.split(';')[i];
													self.imageItem.push(url);
												}
												self.imageUrls.push(self.imageItem);
											}
											j=j+1;
										});
									}
									self.form.releasetypes = '公司物品';
									switch (self.form.itemtype.replace(' ', '')) {
										case "7":
											self.itemtypename = "一般材料、包材";
											self.form.projectitem = '否';
											break;
										case "8":
											self.itemtypename = "報廢資材";
											self.form.projectitem = '否';
											break;
										case "9":
											self.itemtypename = "資訊設備";
											self.form.projectitem = '否';
											break;
										case "10":
											self.itemtypename = "非資訊設備、治工具";
											self.form.projectitem = '否';
											break;
										case "11":
											self.itemtypename = "樣品外寄";
											self.form.projectitem = '否';
											break;
										case "12":
											self.itemtypename = "保密放行";
											self.form.projectitem = '保密封條號：' + self.form.sealno + '-' + self.form
												.sealno2;
											break;
										case "23":
											self.itemtypename = "移動式存儲媒體";
											self.form.projectitem = '否';
											break;
										case "28":
											self.itemtypename = "廢料回收垃圾清運";
											self.form.projectitem = '否';
											break;
									}
									switch (self.form.releaseperiod.replace(' ', '')) {
										case "4":
											self.releaseperiodname = "管制時段"
											break;
										case "5":
											self.releaseperiodname = "一般時段"
											break;
										case "6":
											self.releaseperiodname = "管制時段"
											break;
									}
									break;
								default:
									break;
							}
							self.form.empnames = self.form.empname + self.form.empno + ' ' + self.form.factory +
								' ' + self.form.dept;
							self.form.carriers = self.form.carrier + self.form.carrierin;
							switch (self.form.placedeparture) {
								case "24":
									self.form.placedepartures = 'iIBG-PH2車間';
									break;
								case "25":
									self.form.placedepartures = 'iIBG-PH2倉庫';
									break;
								case "26":
									self.form.placedepartures = 'iIBG-PH2實驗室';
									break;
								case "27":
									self.form.placedepartures = 'iIBG-PH2辦公區';
									break;
								case "35":
									self.form.placedepartures = 'iIBG-PH6車間';
									break;
								case "36":
									self.form.placedepartures = 'iIBG-PH6倉庫';
									break;
								case "37":
									self.form.placedepartures = 'iIBG-PH6實驗室';
									break;
								case "38":
									self.form.placedepartures = 'iIBG-PH6辦公區';
									break;
								case "39":
									self.form.placedepartures = 'VT車間';
									break;
								case "40":
									self.form.placedepartures = 'VT倉庫';
									break;
								case "41":
									self.form.placedepartures = 'VT實驗室';
									break;
								case "42":
									self.form.placedepartures = 'VT辦公區';
									break;
								case "43":
									self.form.placedepartures = 'SMT車間';
									break;
								case "44":
									self.form.placedepartures = 'SMT倉庫';
									break;
								case "45":
									self.form.placedepartures = 'SMT辦公區';
									break;
								case "46":
									self.form.placedepartures = 'SMT實驗室';
									break;
								case "47":
									self.form.placedepartures = '中央電子倉';
									break;
								case "48":
									self.form.placedepartures = 'SSG車間';
									break;
								case "49":
									self.form.placedepartures = 'SSG倉庫';
									break;
								case "50":
									self.form.placedepartures = 'SSG辦公區';
									break;
								case "51":
									self.form.placedepartures = 'SSG實驗室';
									break;
								case "52":
									self.form.placedepartures = '中央實驗室';
									break;
								case "53":
									self.form.placedepartures = 'ATE辦公區';
									break;
								case "54":
									self.form.placedepartures = '普通辦公區';
									break;
							}
							switch(self.form.placedelivery.replace(' ', ''))
							{
								case "18":
							    	self.form.placedeliverys = '廠區內';
								    break;
								case "19":
									self.form.placedeliverys = '廠區外';
								    break;
							}
							if (self.form.itemtype === '12')
								self.form.projectitem = '保密封條號：' + self.form.sealno + '-' + self.form.sealno2;
							else
								self.form.projectitem = '否';

							if (self.form.vehicle === '16')
								self.form.vehicles = '步行';
							else
								self.form.vehicles = '車輛' + ' ' + self.form.licenseplate;

							self.showLoading = false;

							// this.$store.commit('setUserId', this.opinionsList.managerno.replace(/\b(0+)/gi, ""))
							if (self.form.length === 0) {
								self.errorMsg.resulta = "数据异常!";
							}
						}
					}
				});

			},
			previewImage(index) {
				uni.previewImage({
					urls: this.imageUrls,
					current: this.imageUrls[index]
				})
			},
			previewImage2(index) {
				uni.previewImage({
					urls: this.imageUrls2,
					current: this.imageUrls2[index]
				})
			},
		},
		components: {
			Loading
		},
		mounted: function() {
			this.getBoolean();
		},
	};
</script>

<style>
	.van-divider--center {
		text-align: center;
		font-size: larger;
		color: #007AFF;
	}

	.demo-checkbox-group {
		margin: 10px 0 0 20px;
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

	.vux-form-preview>>>.weui-form-preview__value {
		font-size: 0.8em;
	}

	.vux-flexbox>>>.van-button--large {
		width: 100%;
		height: var(--button-large-height, 38px);
	}

	.gridCell>>>.van-icon {
		font-size: 50px;
	}

	.vant-nav-bar-index>>>.van-icon-arrow-left:before {
		color: #999999;
		block-size: 30px;
	}

	.element.style {
		max-width: 140px;
	}
    /* 单元格标题title */
	.myCell>.van-cell>.van-cell__title {
	  color: rgb(255, 0, 0) !important;
	}
	image {
	        image-rendering:-moz-crisp-edges;
	        image-rendering:-o-crisp-edges;
	        image-rendering:-webkit-optimize-contrast;
	        image-rendering: crisp-edges;
	        -ms-interpolation-mode:nearest-neighbor;
	}
</style>
