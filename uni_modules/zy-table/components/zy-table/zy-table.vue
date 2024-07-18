<template>
	<view class="zy_table_container">
		<scroll-view scroll-x scroll-y :style="`max-height:${scrollHeight}`">
			<!-- 表头数据 -->
			<view class="zy_table headFixed" :style="`width:${tableWidth}px`">
				<view class="zy_tr">
					<!-- 多选框 -->
					<view :class="border == true? 'zy_th_border':'zy_th'" class="zy_index" v-if="checkbox">
						<view v-if="this.dataLists.length !== 0">
							<checkbox-group @change="handleSelectionChange($event, 1)">
								<checkbox :checked="multipleSelection.length === dataLists.length" value="all" />
							</checkbox-group>
						</view>
						<view v-else>
							<checkbox-group @change="handleSelectionChange($event, 1)">
								<checkbox :checked="multipleSelection.length === '0'" value="all" />
							</checkbox-group>
						</view>
					</view>
					<!-- 单选框 -->
					<view :class="border==true? 'zy_th_border':'zy_th'" class="zy_index" v-if="radio"></view>
					<!-- 序列号 -->
					<view :class="border==true? 'zy_th_border':'zy_th'" class="zy_index" v-if="num">序号</view>
					<!-- 表头数据 -->
					<view :class="{zy_th_border:border==true,zy_th:border==false,zy_tc_firstFixed:firstFixed==true }"
						class="zy_tc" :style="[{width:`${item.width?item.width:cellWidth}px`}]"
						v-for="(item,index) in headList" :key="index">
						<view class="zy_th_sort">
							<view class="zy_th_sort_edit" v-if="item.edit">
								<i class="iconfont icon-bianji" style="color: #ff0000;"></i>
							</view>
							<view class="zy_th_sort_span">
								{{item.name}}
							</view>
							<!-- 排序 -->
							<view class="zy_th_sort_icon" @click="sort(item)" v-if="item.sort">
								<i class="iconfont icon-xiangshang"
									:class="sortType === item.key && sortValue ?'zy_th_sort_icon_blue':'zy_th_sort_icon_grey'"></i>
								<i class="iconfont icon-xiangxia"
									:class="sortType === item.key && !sortValue ?'zy_th_sort_icon_blue':'zy_th_sort_icon_grey'"></i>
							</view>
						</view>
					</view>
					<!-- 表头操作 -->
					<view :class="{zy_th_border:border==true,zy_th:border==false,zy_tc_lastFixed:lastFixed==true}"
						class="zy_tc" v-if="operationList.length!==0">
						操作
					</view>
				</view>
			</view>
			<!-- 表格数据不为空 -->
			<template v-if="this.dataLists.length !== 0">
				<view class="zy_table" :style="`width:${tableWidth}px`">
					<view class="zy_tr" v-for="(item,index) in dataLists" :key="index"
						:class="{zy_td_linebg:line == true&&item.id == lineId,zy_td_evenbg:index%2 !==0&&stripe==true}"
						@tap="lineClick(item,index)">
						<!-- 多选框 -->
						<view
							:class="{zy_td_border:border==true,zy_td:border==false,zy_td_evenbg:index%2 !==0&&stripe==true,zy_td_oddbg:index%2 ==0&&stripe==true}"
							class="zy_index" v-if="checkbox">
							<checkbox-group @change="handleSelectionChange($event, 0, item.id)">
								<checkbox :checked="selectionChecked(item.id)" :value="item.id + ''" />
							</checkbox-group>
						</view>
						<!--单选框 -->
						<view
							:class="{zy_td_border:border==true,zy_td:border==false,zy_td_evenbg:index%2 !==0&&stripe==true,zy_td_oddbg:index%2 ==0&&stripe==true}"
							class="zy_index" v-if="radio">
							<radio-group @change="radioChange($event)">
								<radio :value="item" :checked="index === current" />
							</radio-group>
						</view>
						<!-- 序列号 -->
						<view
							:class="{zy_td_border:border==true,zy_td:border==false,zy_td_evenbg:index%2 !==0&&stripe==true,zy_td_oddbg:index%2 ==0&&stripe==true}"
							class="zy_index" v-if="num">{{index+1}}
						</view>
						<!-- 表格数据 -->
						<view v-for="(h, i) of headList"
							:class="{zy_td_border:border==true,zy_td:border==false,zy_tc_firstFixed:firstFixed==true,zy_td_evenbg:index%2 !==0&&stripe==true,zy_td_oddbg:index%2 ==0&&stripe==true}"
							class="zy_tc" :style="[{width:`${h.width?h.width:cellWidth}px`}]">
							<!-- 表格数据为图片 -->
							<view v-if="h.keyType==='img'" class="zy_td_img">
								<span v-if="h.key==''||!item[h.key]">--</span>
								<image v-else :src="item[h.key]" style="width: 100%;height: 100%;"></image>
							</view>
							<!-- 表格数据为图标 -->
							<view v-else-if="h.keyType==='icon'">
								<zy-icon :name="item[h.key]" size="32" :color="item.iconColor||'#409EFE'"></zy-icon>
							</view>
							<!-- 表格数据为手机号码 -->
							<view v-else-if="h.keyType==='tel'">
								<span @click="makePhoneCall(item)" class="zy_td_tel">{{item[h.key]}}</span>
							</view>
							<!-- 表格数据为文字 -->
							<view v-else>
								<input v-if="h.edit==true" class="zy_td_input" :style="{color:`${item.editColor}`}"
									v-model="item[h.key]" :disabled="!h.edit" :focus="focus" :type="h.type "
									@confirm="editConfirm(item,index)" />
								<span v-else @click="edit(item,h)">{{item[h.key]}}</span>
							</view>
						</view>
						<!-- 表格操作 -->
						<view
							:class="{zy_td_border:border==true,zy_td:border==false,zy_tc_lastFixed:lastFixed==true,zy_td_evenbg:index%2 !==0&&stripe==true,zy_td_oddbg:index%2 ==0&&stripe==true}"
							class="zy_tc" v-if="operationList.length!==0">
							<view :style="`${operationWidth}px;display:flex`">
								<view v-for="(j, k) of operationList" class="zy_td_operation">
									<!-- 开关按钮 -->
									<switch v-if="j.kind==='switch'" :checked="item.switch"
										@change="j.handle(item,index,$event)" style="transform:scale(0.7)" />
									<!-- 按钮 -->
									<button v-if="j.kind==='button'" :type="j.type" :size="j.size || size"
										:disabled="item.switch" @click='j.handle(item,index)'
										class="zy_td_operation_btn">{{j.label}}</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</scroll-view>
		<template v-if="!this.dataLists.length">
			<view class="zy_td_none">
				<!-- 表格数据待加载 -->
				<zy-load v-if="load"></zy-load>
				<!-- 表格数据为空 -->
				<text v-else>暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	import pinyin from './js/characterToPinyin.js'
	import {
		isEqual
	} from './js/objEqual.js'
	export default {
		name: 'multiSelect',
		emits: ['handleSelectionChange', 'radioChange', 'lineClick', 'editConfirm'],
		props: {
			//表格边框
			border: {
				type: Boolean,
				default: false
			},
			//表头数据
			headList: {
				type: Array,
				default: []
			},
			//表格数据
			dataList: {
				type: Array,
				default: []
			},
			//表格首列是否固定
			firstFixed: {
				type: Boolean,
				default: false
			},
			//表格最后一列是否固定
			lastFixed: {
				type: Boolean,
				default: false
			},
			//表格斑马纹
			stripe: {
				type: Boolean,
				default: false
			},
			//多选框是否显示
			checkbox: {
				type: Boolean,
				default: false
			},
			//单选框是否显示
			radio: {
				type: Boolean,
				default: false
			},
			//点击行事件是否显示
			line: {
				type: Boolean,
				default: false
			},
			//序列号是否显示
			num: {
				type: Boolean,
				default: false
			},
			//操作列数据
			operationList: {
				type: Array,
				default: () => []
			},
			//表格数据前加载，若一进页面执行loading，则需要将事件放在mounted生命周期里执行
			loading: {
				type: Boolean,
				default: false
			},
			//监听父组件选项类型
			selectedType: {
				type: String
			},
		},
		data() {
			return {
				sortType: '',
				sortValue: 0,
				multipleSelection: [], //默认多选框初始状态
				current: '', //默认单选框初始状态
				lineId: '1',
				editShow: false,
				focus: false, //可编辑列的focus初始状态
				load: this.loading, //表格加载
				dataLists: [], //获取dataList数据
				operationWidth: this.operationList.length * 68, //设置操作列的按钮每个占据68px				
				size: 'mini', // 操作列按钮默认尺寸
				headerHeight: '',
				sortStatus: [],
			};
		},
		//监听父组件传值
		watch: {
			//监听选项类型，selectedType为0时，表格多选框置空
			selectedType: {
				handler(newVal, oldVal) {
					if (newVal == 0) {
						this.multipleSelection = []
					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
			//监听父组件dataList表格数据
			dataList: {
				handler(newVal, oldVal) {
					// if (this.dataLists.length == 0) {
					// 	this.dataLists = newVal.map(m => {
					// 		return Object.assign(m, {
					// 			editColor: ''
					// 		})
					// 	})
					// } else {
					// 	for (var i = 0; i < newVal.length; i++) {
					// 		if (newVal[i].editColor == undefined) {
					// 			Object.assign(newVal[i], {editColor: ''})
					// 		}
					// 	}   
					this.dataLists = newVal
					// }
					if (newVal.length >= 0) {
						this.load = false
					}
				}
			},
		},
		computed: {
			//针对自定义表格单元格宽度累加
			tableWidth: function() {
				//监听屏幕宽度
				let system = uni.getSystemInfoSync()
				let windowWidth = system.windowWidth
				//获取表格单/多选框/序列号为true的宽度
				let sortStatus = [this.checkbox, this.radio, this.num]
				sortStatus.forEach(item => {
					if (item == true) {
						this.sortStatus.push(item)
					}
				})
				//获取父组件定义的单元格宽度
				const values = this.headList.map(item => Number(item.width));
				for (var i = 0; i < this.headList.length; i++) {
					//替换父组件未定义的单元格宽度为默认宽度
					if (this.headList[i].width == null) {
						this.$set(values, i, 100);
					}
				}
				//计算合计每个单元格的宽度
				let sumWidth = 0;
				sumWidth = values.reduce((prev, curr) => {
					const value = Number(curr);
					if (!isNaN(value)) {
						return prev + curr;
					} else {
						return prev;
					}
				}, 0);
				if (windowWidth >= sumWidth + 50 * this.sortStatus.length + 20 * this.headList.length) {
					return `${windowWidth}`
				} else {
					if (this.operationList.length !== 0) {
						return `${sumWidth+50*this.sortStatus.length + 20 * this.headList.length + this.operationWidth +20}`
					} else {
						return `${sumWidth+50*this.sortStatus.length + 20 * this.headList.length}`
					}
				}
			},
			//监听屏幕宽度，定义的单元格宽度默认为100px
			cellWidth() {
				let system = uni.getSystemInfoSync()
				let windowWidth = system.windowWidth
				if (windowWidth < this.tableWidth) {
					return 100
				}
			},
			//获取屏幕窗口高度适配表格数据滚动
			scrollHeight() {
				let system = uni.getSystemInfoSync()
				let windowHeight = system.windowHeight
				return `${windowHeight}px;`
			},
		},
		mounted() {
			//获取表格表头高度
			const query = uni.createSelectorQuery().in(this)
			query
				.select('.zy_tr')
				.boundingClientRect(data => {
					this.headerHeight = data.height + 'px'
				})
				.exec();
		},
		methods: {
			//表格列变编辑
			edit(item, h) {
				this.editShow = true
			},
			//表格排序
			sort(e) {
				this.sortValue = this.sortType === e.key ? !this.sortValue : 0;
				this.sortType = e.key;
				this.dataLists.sort((a, b) => {
					// let obj=[]
					// obj.push(a[e.key])
					// console.log(obj)
					// var numReg = /^[0-9]*$/
					// var numRe = new RegExp(numReg)
					// if (!numRe.test(this.sortValue)) {
					// let type = e.key
					// var x = pinyin.getSpell(a[e.key].charAt(0), function(charactor, spell) {
					// 	return spell[1]
					// }).charAt(0).charCodeAt()
					// var y = pinyin.getSpell(b[e.key].charAt(0), function(charactor, spell) {
					// 	return spell[1]
					// }).charAt(0).charCodeAt();
					// return this.sortValue ? x - y : y - x
					// } else {
					//只针对该列字符串是数字有效
					return this.sortValue ? a[e.key] - b[e.key] : b[e.key] - a[e.key];
					// }
				});
			},
			//表格多选框事件
			selectionChecked(id) {
				return !!~this.multipleSelection.findIndex(o => o.id === id);
			},
			handleSelectionChange(e, type, id) {
				const {
					detail: {
						value
					}
				} = e;
				// 全选被点击
				if (type === 1) {
					// 选中
					if (value.length) {
						this.multipleSelection = this.deepClone(this.dataLists);
						// 取消选中
					} else {
						this.multipleSelection = [];
					}
					// 非全选被点击
				} else {
					const i = this.multipleSelection.findIndex(o => o.id === id);
					// 选中
					if (value.length) {
						this.multipleSelection.push(this.dataLists.find(o => o.id === id));
						// 取消选中
					} else {
						this.multipleSelection.splice(i, 1);
					}
				}
				this.$emit('handleSelectionChange', {
					value: this.multipleSelection
				})
			},
			// 深度克隆
			deepClone(obj) {
				// 对常见的“非”值，直接返回原来值
				if ([null, undefined, NaN, false].includes(obj)) return obj;
				if (typeof obj !== 'object' && typeof obj !== 'function') {
					//原始类型直接返回
					return obj;
				}
				var o = this.isArray(obj) ? [] : {};
				for (let i in obj) {
					if (obj.hasOwnProperty(i)) {
						o[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i];
					}
				}
				return o;
			},
			// 判断arr是否为一个数组，返回一个bool值
			isArray(arr) {
				return Object.prototype.toString.call(arr) === '[object Array]';
			},
			//表格单选框事件
			radioChange($event) {
				for (let i = 0; i < this.dataLists.length; i++) {
					if (this.dataLists[i].id === $event.detail.value.id) {
						this.current = i;
						this.$emit('radioChange', {
							value: $event.detail.value
						})
						break;
					}
				}
			},
			//单击选中行事件
			lineClick(item, index) {
				if (this.line == true) {
					this.lineId = item.id
					this.$emit('lineClick', {
						value: item,
						index: index
					})
				}
			},
			//表格编辑
			editConfirm(item, index) {
				// this.dataLists[index].editColor = "#ff0000"
				Object.assign(this.dataLists[index], {
					editColor: '#ff0000'
				})
				this.$forceUpdate() //强制刷新，渲染
				this.focus = false
				this.$emit('editConfirm', {
					item: item,
					index: index
				})
			},
			//表格电话拨打
			makePhoneCall(item) {
				console.log(item)
				uni.makePhoneCall({
					phoneNumber: item.tel //仅为示例
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
