## zyTable 表格

## zyTable 表格参数属性
|序号	|参数			|说明				|类型	|可选值		|默认值	|是否必须	|
|---	| ---			| ---				| ---	| ---		| ---	| ---		|
|1		|headList		|显示表格列的数据	|Array	|空			|空		|√			|
|2		|dataList		|显示表格数据		|Array	|空			|空		|√			|
|3		|checkbox		|多选框是否显示		|Boolean|true/false	|false	|×			|
|4		|radio			|单选框是否显示		|Boolean|true/false	|false	|×			|
|5		|line			|点击行事件是否显示	|Boolean|true/false	|false	|×			|
|6		|num			|序列号是否显示		|Boolean|true/false	|false	|×			|
|7		|operationList	|操作列数据			|Array	|空			|空		|×			|
|8		|border			|表格边框是否显示	|Boolean|true/false	|false	|×			|
|9		|firstFixed		|表格首列是否固定	|Boolean|true/false	|false	|×			|
|10		|lastFixed		|表格尾列是否固定	|Boolean|true/false	|false	|×			|
|11		|stripe			|表格斑马纹是否显示	|Boolean|true/false	|false	|×			|

## columns属性
|序号		|参数	|说明		|类型	|可选值		|默认值	|是否必须	|
|---	    | ---	| ---		| ---	| ---		| ---   | ---       |
|1			|name	|显示的标题	|String	|空			|空		|√			|
|2			|key	|属性值		|String	|空			|空		|√			|
|3			|width	|列宽度		|String	|空			|空		|×			|
|4			|sort	|列排序		|Boolean|true/false	|false	|×			|
|5			|edit	|列编辑		|Boolean|true/false	|false	|×			|
|6			|keyType|列显示类型	|String	|icon/img/tel	|空		|×			|
|7			|iconColor|图标自定义颜色	|String	|空	|#409EFE		|×			|

## 操作列属性
|序号	|参数	|说明			|类型		|可选值					|默认值	|是否必须	|
|---	| ---	| ---			| ---		| ---					| ---	| ---		|
|1		|kind	|按钮种类		|String		|switch/button			|空		|×			|
|2		|type	|button按钮类型	|String		|primary/default/warn	|default|×			|
|3		|handle	|按钮事件		|Function	|空						|空		|×			|
|4		|label	|button按钮名称	|String		|空						|空		|×			|

## zyTable 表格事件
|序号	|参数					|说明													|类型		|可选值				|默认值	|是否必须	|
|---	| ---					| ---													| ---		| ---				| ---	| ---		|
|1		|handleSelectionChange	|用于表格多选，切换某一行的选中状态，传值为所选行的数据	|Function	|(e, type, id)=>{}	|否		|×			|
|2		|radioChange			|用于表格单选，切换某一行的选中状态，传值为所选行的数据	|Function	|($event)=>{}		|否		|×			|
|3		|lineClick				|行单击事件，传值为所选行的数据							|Function	|(item，index)=>{}	|否		|×			|
|4		|editConfirm			|表格列编辑开启											|Function	|(item)=>{}			|否		|×			|

## zyTable 使用方式
```
<template>
	<view class="content">
		<zyTable border :headList="headList" :dataList="dataList" checkbox num :radio="false"
			@handleSelectionChange="handleSelectionChange" @lineClick="lineClick" @editConfirm="editConfirm"
			 :operationList="operationList" :firstFixed="false" :lastFixed="false" stripe loading></zyTable>
	</view>
</template>
<script>
	import zyTable from '@/components/zy-table/index.vue';
	import list from '@/api/data';
	export default {
		components: {
			zyTable
		},
		data() {
			return {
				//表头数据
				headList: [{
					name: '编号',
					key: 'id',
					sort: true
				}, {
					name: '姓名',
					key: 'name',
					edit: true,
				}, {
					name: '奖牌',
					keyType: 'img',
					key: 'img',
				}, {
					name: '年龄',
					key: 'age',
					sort: true
				}, {
					name: '年级',
					key: 'grade',
					width: '200',
				}, {
					name: '班级',
					key: 'class',
					width: '200',
				}, {
					name: '学号',
					key: 'num',
					sort: true
				}, {
					name: '性别',
					key: 'sex'
				}, {
					name: '手机',
					keyType: 'tel',
					key: 'tel',
					width: '200',
				}, {
					name: '联系方式',
					keyType: 'icon',
					key: 'icon'
				}, ],
				//默认表格数据
				dataList: [],
				//操作列数据
				operationList: [{
					kind: "switch",
					handle: this.switchChange,
				}, {
					kind: "button",
					type: "primary",
					handle: this.editBtn,
					label: "编辑",
				}, {
					kind: "button",
					type: "warn",
					handle: this.delBtn,
					label: "删除",
				}, {
					kind: "button",
					type: "",
					handle: this.detailBtn,
					label: "详情",
				}],
				index: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			//获取表格中数据
			getList() {
					this.dataList=list
			},
			//表格多选
			handleSelectionChange(e) {
				uni.showToast({
					title: "已选" + e.value.length + "条",
					duration: 2000,
					icon: 'none'
				});
			},
			//表格单选（表格用到单选框时表格数据中需添加id值）
			radioChange(e) {
				console.log(e)
				uni.showToast({
					title: e.value.id,
					duration: 2000,
					icon: 'none'
				});
			},
			//表格行点击事件
			lineClick(e) {
				console.log(e)
				uni.showToast({
					// title: "已选第" + e.index + "行：" + e.value.name,
					duration: 2000,
					icon: 'none'
				});
			},
			//表格列编辑
			editConfirm(e) {
				console.log(e)
				uni.showToast({
					title: "编辑成功!",
					duration: 2000,
					icon: 'none'
				});
			},
			//表格开关（开关按钮和button的disabled联动）
			switchChange(item, index, $event) {
				uni.showToast({
					title: item.name + $event.detail.value,
					duration: 2000,
					icon: 'none'
				});
			},
			// 表格编辑
			editBtn(item, index) {
				console.log(item, index)
				uni.showToast({
					title: "编辑：" + index + item.name,
					duration: 2000,
					icon: 'none'
				});
			},
			// 表格删除
			delBtn(item, index) {
				console.log(item, index)
				this.dataList.splice(index, 1)
				uni.showToast({
					title: item.name + "删除成功！",
					duration: 2000,
					icon: 'none'
				});
			},
			// 表格详情
			detailBtn(item, index) {
				console.log(item, index)
				uni.showToast({
					title: "详情：" + index + item.name,
					duration: 2000,
					icon: 'none'
				});
			},
		},
	}
</script>

<style>
</style>

```
	
#### 表格中使用到图标列的请下载uni-icons(https://ext.dcloud.net.cn/plugin?name=uni-icons)
#### 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系QQ：2360273432 
