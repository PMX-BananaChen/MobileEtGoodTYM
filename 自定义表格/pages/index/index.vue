<template>
	<view class="content" @click="closeSelect">
		<cui-table custom-class="custom-table" :columns="table.columns" :data="table.data" :row-class="rowClass" align="center"
			headerStyle="background:#EAD4D6;color:#c04851;" :showSelectIndex="table.showSelectIndex"
			@changeSelect="changeSelect" @onSelectClick="onSelectClick" :sort-by.sync="table.sortBy"
			:sort-order.sync="table.sortOrder" @sort="onSort">
			<template #default="{ row, column, rowIndex }">
				<template v-if="column.prop == 'index'">
					<image v-if="rowIndex < 3" class="index-img" :src="'/static/index' + (rowIndex + 1) + '.png'" />
					<template v-else>{{ rowIndex + 1 }}</template>
				</template>
				<template v-else>{{ row[column.prop] }}</template>
			</template>
		</cui-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				table: {
					sortBy: '',
					sortOrder: '',
					columns: [{
							label: '排名',
							prop: 'index',
							width: 100
						}, {
							label: '工号',
							prop: 'gh',
							showSelect: false,
							selectList: ["全部", "新员工", "老员工"],
							selectIndex: 0
						},
						{
							label: '职务',
							prop: 'zw',
							showSelect: false,
							selectList: ["全部", "管理", "养生", "足浴", "客服"],
							selectIndex: 0
						},
						{
							label: '总业绩',
							prop: 'zyj',
							sortBy: 'zyj'
						},
						{
							label: '总提成',
							prop: 'ztc',
							sortBy: 'ztc'
						}
					],
					showSelectIndex: -1,//控制筛选菜单的显示隐藏
					data: [{
							gh: '00001',
							yg: '新员工',
							zw: '管理',
							zyj: 5000.00,
							ztc: 400.00
						},
						{
							gh: '00002',
							yg: '老员工',
							zw: '足浴',
							zyj: 6000.00,
							ztc: 500.00
						},
						{
							gh: '00003',
							yg: '新员工',
							zw: '养生',
							zyj: 5000.00,
							ztc: 800.00
						},
						{
							gh: '00004',
							yg: '老员工',
							zw: '客服',
							zyj: 8000.00,
							ztc: 600.00
						}
					]
				},
				tableData: []
			}
		},
		onLoad() {
			this.tableData = [...this.table.data]
		},
		methods: {
			//排序
			onSort() {
				const {
					sortBy,
					sortOrder
				} = this.table;
				this.table.data = this.table.data.sort((a, b) => {
					if (!sortBy) {
						return 0;
					} else {
						if (sortOrder === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
						return a[sortBy] > b[sortBy] ? -1 : 1;
					}
				});
			},
			//筛选
			onSelectClick(columnIndex, index) {
				this.table.columns[columnIndex].selectIndex = index;
				this.table.data = this.tableData.filter((item) => {
					let v = this.table.columns[columnIndex].selectList[index];
					if (v == '全部') {
						return item;
					}
					if (columnIndex == 0) {
						return item.yg == v;
					}
					return item.zw == v;
				})
			},
			changeSelect(columnIndex) {
				if (this.table.showSelectIndex == columnIndex) {
					this.table.showSelectIndex = -1;
					return;
				}
				this.table.showSelectIndex = columnIndex;
			},
			closeSelect() {
				this.table.showSelectIndex = -1;
			},
			//改变行样式
			rowClass(row, rowIndex) {
				if (rowIndex % 2 != 0) {
					return 'warning';
				}
			}
		}
	}
</script>

<style lang="scss">
	::v-deep {
		.s-table .warning {
			background-color: #e8e8e8;
		}
	}

	.custom-table {
		::v-deep .s-table__tr {
			&:nth-child(1) {
				background-color: mix(#f9cb29, transparent, 10%);
			}

			&:nth-child(2) {
				background-color: mix(#bfbfbf, transparent, 10%);
			}

			&:nth-child(3) {
				background-color: mix(#834e00, transparent, 10%);
			}
		}

		.index-img {
			width: 55rpx;
			height: 48rpx;
			display: block;
		}
	}
</style>
