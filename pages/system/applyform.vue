<template>
	<form ref="form" model="form">
		<van-nav-bar left-arrow @click-left="backHome" />
		<uni-row>
			<uni-col>
				<van-field v-model="form.empno" label="申請人工號:" :error-message="errorMsg.empnoa" @blur="findall('a')"
					required @change="empnoc" :focus="firstFocus" readonly />
			</uni-col>
		</uni-row>
		<uni-row>
			<van-cell title="姓 名:" :value="form.empname" />
		</uni-row>
		<uni-row>
			<van-cell title="BU:" :value="form.factory" />
			<van-cell title="部门:" :value="form.dept" v-if="false" />
			<van-cell title="编号:" :value="form.deptno" v-if="false" />
			<van-cell title="区域:" :value="form.area" v-if="false" />
			<van-cell title="公司:" :value="form.company" v-if="false" />
		</uni-row>
		<div>
			<table>
				<tr>
					<td>
						<van-cell title="放行日期:" />
					</td>
					<td>
						<picker mode="multiSelector" :range="dateTimeArray" v-model="form.dateTime" @change="change"
							@columnchange="columnchange">
							<input type="text" disabled="true" style="margin:5px 0 0 28px"
								placeholder-class="inputPlace" v-model="form.releasedate" />
						</picker>
					</td>
				</tr>
			</table>
		</div>
		<uni-row>
			<uni-col :span="7">
				<van-field label="放行類型:" readonly />
			</uni-col>
			<uni-col :span="17">
				<uni-data-select v-model="form.releasetype" @change="typevisible" :localdata="options1" :clear="false">
				</uni-data-select>
			</uni-col>
		</uni-row>
		<uni-row v-if="goodcompanyv1">
			<uni-col :span="7">
				<van-field label="放行時段:" readonly />
			</uni-col>
			<uni-col :span="17">
				<uni-data-select v-model="form.releaseperiod" :localdata="options2">
				</uni-data-select>
			</uni-col>
		</uni-row>
		<view v-if="goodprivatev">
			<view style="color:blue;font-size:9px;text-align:center;">請填報放行物品名稱(料號)、單位規格、數量及照片：</view>
			<uni-row>
				<uni-col :span="6">
					<van-field label="離職" readonly />
				</uni-col>
				<uni-col :span="18">
					<radio-group v-model="form.leavestatus" @change="leavestatusc">
						<radio value="0">否</radio>
						<radio value="1">是</radio>
					</radio-group>
				</uni-col>
			</uni-row>
			<view>
				<uni-row>
					<uni-col :span="6">
						<van-field label="住宿舍" readonly />
					</uni-col>
					<uni-col :span="9">
						<radio-group v-model="form.livingdorm" @change="livingdormc">
							<radio value="0">否</radio>
							<radio value="1">是</radio>
						</radio-group>
					</uni-col>
					<uni-col :span="9">
						<uni-data-select v-if="thatdormv" v-model="form.thatdorm"
							:localdata="options7"></uni-data-select>
					</uni-col>
				</uni-row>
			</view>
			<view>
				<uni-row>
					<uni-col :span="12">
						<van-field label="電腦、U盤、平板、行動碟等" readonly />
					</uni-col>
					<uni-col :span="12">
						<radio-group v-model="form.computerequipment" @change="computerequipmentc">
							<radio value="1">是</radio>
							<radio value="0">否</radio>
						</radio-group>
					</uni-col>
				</uni-row>
			</view>
			<view>
				<uni-table ref="tableprivate">
					<uni-tr>
						<uni-th width="150px;" align="center">
							<van-button type="primary" size="mini" @click="addDate(1)">添加数据</van-button>序号
						</uni-th>
						<uni-th width="150px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th align="center" v-if="false">文件名</uni-th>
						<uni-th width="200px;" align="center">物品照片<span style="color:red">*</span></uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.privates" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center"><input type="text" v-model="item.itemname" placeholder="请输入物品名稱" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.unit" placeholder="请输入規格/單位" /></uni-td>
						<uni-td align="center"><input type="number" v-model="item.quantity" placeholder="请输入數量" />
						</uni-td>
						<uni-td align="center" v-if="false"><input type="text" v-model="item.picture" />
						</uni-td>
						<uni-td align="center">
							<!-- 	<template slot-scope="scope"> -->
							<uni-file-picker :key="index" :ref="'goodprivate'+index" v-model="item.pictureurl"
								fileMediatype="image" mode="grid" @select="select($event,index,'a')" @delete="delIMG"
								limit="2" file-extname="png,jpg,jpeg" required>
							</uni-file-picker>
							<!-- </template> -->
						</uni-td>
						<uni-td>
							<button class="uni-button" size="mini" @click="moverow(1,index)" type="warn">删除</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<view v-if="goodbyov">
			<uni-row>
				<uni-col></uni-col>
				<uni-col :span="23" style="color:blue;font-size:9px;text-align:center;">
					請填報放行物品名稱(料號)、單位規格、數量及照片：
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col></uni-col>
				<uni-col :span="23" style="color:blue;font-size:5px;text-align:center;">
					請勾選經過安檢站：(大門警衛為預設必選，餘依實際動線選擇)
				</uni-col>
			</uni-row>
			<view>
				<checkbox-group v-model="form.deliverystation" @change="deliverystationc">
					<checkbox value="1">內保</checkbox>
					<checkbox value="2">中層警衛</checkbox>
					<checkbox value="3" checked disabled>大門警衛</checkbox>
				</checkbox-group>
			</view>
			<view>
				<uni-table ref="tablebyo">
					<uni-tr>
						<uni-th width="150px;" align="center">
							<van-button type="primary" size="mini" @click="addDate(2)">添加数据</van-button>序号
						</uni-th>
						<uni-th width="150px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th align="center" v-if="false">文件名</uni-th>
						<uni-th width="200px;" align="center">物品照片<span style="color:red">*</span></uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.byos" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center"><input type="text" v-model="item.itemname" placeholder="请输入物品名稱" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.unit" placeholder="请输入規格/單位" /></uni-td>
						<uni-td align="center"><input type="number" v-model="item.quantity" placeholder="请输入數量" />
						</uni-td>
						<uni-td align="center" v-if="false"><input type="text" v-model="item.picture" />
						</uni-td>
						<uni-td align="center">
							<uni-file-picker :key="index" :ref="'goodprivate'+index" v-model="item.pictureurl"
								fileMediatype="image" mode="grid" @select="select($event,index,'b')" @delete="delIMG"
								limit="2" file-extname="png,jpg,jpeg" required>
							</uni-file-picker>
						</uni-td>
						<uni-td>
							<button class="uni-button" size="mini" @click="moverow(2,index)" type="warn">删除</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<uni-row v-if="goodcompanyv1">
			<uni-col :span="7">
				<van-field label="物品類型:" readonly />
			</uni-col>
			<uni-col :span="17">
				<uni-data-select v-model="form.itemtype" @change="typevisible1" :localdata="options3">
				</uni-data-select>
			</uni-col>
		</uni-row>
		<view v-if="goodcompanyv">
			<view style="color:blue;font-size:9px;text-align:center;">詳實填報放行物品名稱(料號)、單位規格、數量及放行原因：</view>
			<view>
				<uni-table ref="tablecompany">
					<uni-tr>
						<uni-th width="150px;" align="center">
							<van-button type="primary" size="mini" @click="addDate(3)">添加数据</van-button>序号
						</uni-th>
						<uni-th width="60px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th width="40px;" align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th width="40px;" align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th width="40px;" align="center">放行原因</uni-th>
						<uni-th align="left">物品照片<span style="color:red">*</span></uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.companys" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center"><input type="text" v-model="item.itemname" placeholder="请输入物品名稱" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.unit" placeholder="请输入規格/單位" /></uni-td>
						<uni-td align="center"><input type="number" v-model="item.quantity" placeholder="请输入數量" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.reason" placeholder="请输入原因" /></uni-td>
						<uni-td align="center">
							<uni-file-picker :key="index" :ref="'goodcompany'+index" v-model="item.pictureurl"
								fileMediatype="image" mode="grid" @select="select($event,index,'e')" @delete="delIMG"
								limit="2" file-extname="png,jpg,jpeg" required>
							</uni-file-picker>
						</uni-td>
						<uni-td>
							<button class="uni-button" size="mini" @click="moverow(3,index)" type="warn">删除</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<view v-if="goodprojectv">
			<view style="color:blue;font-size:9px;text-align:center;">填報放行物品名稱(料號)、單位規格、數量及放行原因：</view>
			<view>
				<van-field v-model="form.projectcode" @change="projectcodes" label="管制專案代號:" placeholder="代號"
					required />
				<uni-row>
					<uni-col :span="12">
						<van-field v-model="form.sealno" @change="sealnos" label="保密封條編號:" placeholder="編號1" required />
					</uni-col>
					<uni-col :span="12">
						<van-field v-model="form.sealno2" @change="sealno2s" placeholder="編號2" required />
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="8"><van-cell title="包裝箱照片(可見封條)" /></uni-col>
					<uni-col :span="8">
						<input type="text" v-model="form.picture" v-if="false" />
						<uni-file-picker :ref="'goodproject1'" v-model="form.pictureurl" fileMediatype="image"
							mode="grid" @select="select($event,1,'c')" @delete="delIMG" limit="9"
							file-extname="png,jpg,jpeg">
						</uni-file-picker>
					</uni-col>
					<uni-col :span="8">
						<input type="text" v-model="form.picture2" v-if="false" />
						<uni-file-picker :ref="'goodproject2'" v-model="form.pictureurl2" fileMediatype="image"
							mode="grid" @select="select($event,1,'d')" @delete="delIMG" limit="9"
							file-extname="png,jpg,jpeg">
						</uni-file-picker>
					</uni-col>
				</uni-row>
				<uni-table ref="tableproject" border>
					<uni-tr>
						<uni-th align="center">
							<van-button type="primary" size="mini" @click="addDate(4)">添加数据</van-button>序号
						</uni-th>
						<uni-th align="center">物品名稱<span style="color:red">*</span></uni-th>
						<uni-th align="center">規格/單位<span style="color:red">*</span></uni-th>
						<uni-th align="center">數量<span style="color:red">*</span></uni-th>
						<uni-th align="center">放行原因</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in form.projects" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center"><input type="text" v-model="item.itemname" placeholder="请输入物品名稱" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.unit" placeholder="请输入規格/單位" /></uni-td>
						<uni-td align="center"><input type="number" v-model="item.quantity" placeholder="请输入數量" />
						</uni-td>
						<uni-td align="center"><input type="text" v-model="item.reason" placeholder="请输入原因" /></uni-td>
						<uni-td>
							<button class="uni-button" size="mini" @click="moverow(4,index)" type="warn">删除</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<view v-if="goodrecyclev">
			<view style="color:blue;font-size:9px;text-align:center;">廠商回收包材</view>
			<uni-row>
				<uni-col></uni-col>
				<uni-col :span="23" style="color:blue;font-size:5px;text-align:center;">
					請勾選經過安檢站：(大門警衛為預設必選，餘依實際動線選擇)
				</uni-col>
			</uni-row>
			<view>
				<checkbox-group v-model="form.deliverystation" @change="deliverystationc">
					<checkbox value="1">內保</checkbox>
					<checkbox value="2">中層警衛</checkbox>
					<checkbox value="3" checked disabled>大門警衛</checkbox>
				</checkbox-group>
			</view>
			<uni-table ref="tablerecyclev">
				<uni-tr>
					<uni-th width="150px;" align="center">
						<van-button type="primary" size="mini" @click="addDate(8)">添加数据</van-button>序号
					</uni-th>
					<uni-th width="60px;" align="center">物品名稱<span style="color:red">*</span></uni-th>
					<uni-th width="40px;" align="center">規格/單位<span style="color:red">*</span></uni-th>
					<uni-th width="40px;" align="center">數量<span style="color:red">*</span></uni-th>
					<uni-th width="40px;" align="center">放行原因</uni-th>
					<uni-th align="left">物品照片<span style="color:red">*</span></uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in form.recycles" :key="index">
					<uni-td align="center">{{index+1}}</uni-td>
					<uni-td align="center"><input type="text" v-model="item.itemname" placeholder="请输入物品名稱" />
					</uni-td>
					<uni-td align="center"><input type="text" v-model="item.unit" placeholder="请输入規格/單位" /></uni-td>
					<uni-td align="center"><input type="number" v-model="item.quantity" placeholder="请输入數量" />
					</uni-td>
					<uni-td align="center"><input type="text" v-model="item.reason" placeholder="请输入原因" /></uni-td>
					<uni-td align="center">
						<uni-file-picker :key="index" :ref="'goodrecycles'+index" v-model="item.pictureurl"
							fileMediatype="image" mode="grid" @select="select($event,index,'f')" @delete="delIMG"
							limit="2" file-extname="png,jpg,jpeg" required>
						</uni-file-picker>
					</uni-td>
					<uni-td>
						<button class="uni-button" size="mini" @click="moverow(8,index)" type="warn">删除</button>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<uni-row>
			<uni-col :span="7">
				<van-field label="攜帶人  ：" required />
			</uni-col>
			<uni-col :span="17">
				<uni-data-select v-model="form.carriertype" @change="carriertypec" :localdata="options4">
				</uni-data-select>
			</uni-col>
		</uni-row>
		<uni-row>
			<uni-col>
				<van-field v-model="form.carrierin" placeholder="工號/入厂识别证/VIP牌號" :label="carrierinname"
					@blur="findall('b')" required @change="carrierinc" />
			</uni-col>
		</uni-row>
		<van-field v-if="carrierv" label="姓 名:" v-model="form.carrier" @change="carrierc" required></van-field>
		<van-cell v-if="!carrierv" title="姓 名:" :value="form.carrier" required></van-cell>
		<uni-row>
			<uni-col :span="7">
				<van-field label="交通工具：" required />
			</uni-col>
			<uni-col :span="17">
				<uni-data-select v-model="form.vehicle" @change="vehiclec" :localdata="options5">
				</uni-data-select>
			</uni-col>
		</uni-row>
		<uni-row>
			<van-field v-model="form.licenseplate" @change="licenseplatec" label="車牌號：" v-if="Licenseplatev"
				required="Licenseplatev" />
		</uni-row>
		<view>
			<uni-row v-if="placedeparturev">
				<uni-col :span="7">
					<van-field label="出發地點：" required />
				</uni-col>
				<uni-col :span="17">
					<uni-data-select v-model="form.placedeparture" :localdata="options8">
					</uni-data-select>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="7">
					<van-field label="送貨地點：" required />
				</uni-col>
				<uni-col :span="17">
					<uni-data-select v-model="form.placedelivery" @change="chkvisible" :localdata="options6">
					</uni-data-select>
				</uni-col>
			</uni-row>
			<van-cell title="請勾選經過安檢站：(依實際動線選擇，出廠房必選中層警衛)" v-if="!chk1"></van-cell>
			<van-cell title="請勾選經過安檢站：(大門警衛為預設必選，餘依實際動線選擇)" v-if="chk1"></van-cell>
			<uni-row>
				<checkbox-group v-model="form.securitystation" @change="securitystationc">
					<checkbox value="1">內保</checkbox>
					<checkbox value="2">中層警衛</checkbox>
					<checkbox value="3" checked disabled v-if="chk1">大門警衛</checkbox>
				</checkbox-group>
			</uni-row>
		</view>
		<van-field v-model="form.remark" label="備  註：" @change="remarkc" />
		<uni-card>
			<view style="color:red;font-size:10px;">{{errorSave}}</view>
		</uni-card>
		<uni-card>
			<view style="color:red;font-size:10px;">提醒：</view>
			<view style="color:red;font-size:10px;">★提交前，請務必確認以下信息正確無誤：
				　1.攜帶人姓名、工號(或身份證號、VIP牌號)
				　2.放行年、月、日
				　3.放行物品(料號)、數量
				★經安檢站如被安檢人員發現異常，請主動配合調查。
				★任何有關放行之疑問，請在抵達第一個安檢站前，與警衛　
				　隊幹部聯絡。
			</view>
		</uni-card>
		<view style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" @click="submit('form')">提交
			</van-button>
		</view>
		<br />
		<br />
		<br />
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
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
	const dateTimePicker = require('@/util/dateTimePicker.js');
	import {
		getEmployee
	} from "@/api/user";
	import {
		addReleaseGood,
		getReleaseGood
	} from "@/api/releasegood";
	import {
		listDormlist
	} from "@/api/dormlist";
	import {
		FormPreview,
		Group,
		Loading
	} from 'vux';
	import config from '@/config'
	const baseUrl = config.baseUrl
	export default {
		data() {
			return {
				firstFocus: true,
				curRowIndex: 0,
				imgURL: '',
				// userId:this.$store.state.userId,
				//图片
				imageValue: [],
				empnames: '',
				// 表单参数
				form: {
					formno: '',
					empno:'',
					empname: '',
					factory: '',
					dept: '',
					deptno: '',
					area: '',
					company: '',
					releasedate: null,
					releaseperiod: null,
					releasetype: 0,
					itemtype: null,
					carriertype: null,
					carrier: '',
					carrierin: '',
					vehicle: null,
					licenseplate: '',
					placedeparture: null,
					placedelivery: null,
					deliverystation: null,
					leavestatus: null,
					livingdorm: null,
					thatdorm: null,
					computerequipment: null,
					securitystation: null,
					projectcode: '',
					sealno: '',
					sealno2: '',
					picture: null,
					pictureurl: null,
					picture2: null,
					pictureurl2: null,
					stateid: null,
					privates: [],
					byos: [],
					companys: [],
					projects: [],
					recycles: [],
					remark: ''
				},
				showLoading: false,
				loadText: '处理',
				active: 0,
				placedeparturev: false,
				// 第一：错误信息  
				errorMsg: {
					empnoa: '',
					startperioda: '',
					endperioda: '',
					resulta: '',
				},
				errorSave: '',
				options1: [{
						value: '1',
						text: '員工私人物品'
					},
					{
						value: '2',
						text: '廠商自帶物品'
					}, {
						value: '3',
						text: '公司物品'
					}, {
						value: '8',
						text: '廠商回收包材'
					}
				],
				options2: [{
					value: '5',
					text: '一般時段(工作日07:00-21:00)'
				}, {
					value: '4',
					text: '管制時段(其餘時間段)'
				}],
				options3: [{
						value: '7',
						text: '一般材料、包材'
					}, {
						value: '8',
						text: '報廢資材'
					},
					{
						value: '10',
						text: '非資訊設備、治工具'
					},
					{
						value: '11',
						text: '樣品外寄'
					},
					{
						value: '12',
						text: '保密放行'
					},
					{
						value: '23',
						text: '移動式存儲媒體'
					},
					{
						value: '28',
						text: '廢料回收垃圾清運'
					},
					{
						value: '9',
						text: '資訊設備'
					}
				],
				options4: [{
						value: '13',
						text: '員工'
					},
					{
						value: '14',
						text: '廠商、訪客'
					},
					{
						value: '15',
						text: '客戶'
					}
				],
				options5: [{
						value: '16',
						text: '步行'
					},
					{
						value: '17',
						text: '車輛'
					},
				],
				options6: [{
						value: '18',
						text: '廠區內'
					},
					{
						value: '19',
						text: '廠區外'
					},
				],
				options7: [],
				options8: [{
						value: '24',
						text: 'iIBG-PH2車間'
					},
					{
						value: '25',
						text: 'iIBG-PH2倉庫'
					},
					{
						value: '26',
						text: 'iIBG-PH2實驗室'
					},
					{
						value: '27',
						text: 'iIBG-PH2辦公區'
					},
					{
						value: '35',
						text: 'iIBG-PH6車間'
					},
					{
						value: '36',
						text: 'iIBG-PH6倉庫'
					},
					{
						value: '37',
						text: 'iIBG-PH6實驗室'
					},
					{
						value: '38',
						text: 'iIBG-PH6辦公區'
					},
					{
						value: '39',
						text: 'VT車間'
					},
					{
						value: '40',
						text: 'VT倉庫'
					},
					{
						value: '41',
						text: 'VT實驗室'
					},
					{
						value: '42',
						text: 'VT辦公區'
					},
					{
						value: '43',
						text: 'SMT車間'
					},
					{
						value: '44',
						text: 'SMT倉庫'
					},
					{
						value: '45',
						text: 'SMT辦公區'
					},
					{
						value: '46',
						text: 'SMT實驗室'
					},
					{
						value: '47',
						text: '中央電子倉'
					},
					{
						value: '48',
						text: 'SSG車間'
					},
					{
						value: '49',
						text: 'SSG倉庫'
					},
					{
						value: '50',
						text: 'SSG辦公區'
					},
					{
						value: '51',
						text: 'SSG實驗室'
					},
					{
						value: '52',
						text: '中央實驗室'
					},
					{
						value: '53',
						text: 'ATE辦公區'
					},
					{
						value: '54',
						text: '普通辦公區'
					}
				],
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('@/pages/images/passa.png'),
						active: require('@/pages/images/pass.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('@/pages/images/desk.png'),
						active: require('@/pages/images/deska.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('@/pages/images/my.png'),
						active: require('@/pages/images/mya.png')
					},
				],
				goodprivatev: false,
				goodbyov: false,
				goodcompanyv: false,
				goodcompanyv1: false,
				goodprojectv: false,
				goodrecyclev: false,
				chk1: false,
				Licenseplatev: false,
				carrierinname: '工  號:',
				carrierv: false,
				dormlists: [],
				dormlist: {
					dormlistid: null
				},
				thatdormv: false,
				recoverydepartment: ['01213100', '50015171', '01212300'],
				isRecovery: false,
				urls: baseUrl + "/system/ReleaseGood/uploadFile",
			};
		},
		created() {
			//传入开始展示年份startYear 结束展示年份endYear
			//自定义开始显示时间
			var newDate = new Date();
			let year = newDate.getFullYear();
			let month = newDate.getMonth() + 1;
			let day = newDate.getDate();
			let arr = year + '-' + this.withData(month) + '-' + this.withData(day);
			let obj = dateTimePicker.dateTimePicker(2000, 2050, arr);
			this.dateTimeArray = obj.dateTimeArray;
			this.form.dateTime = obj.dateTime;
			this.form.releasedate = arr;
			this.form.empno = uni.getStorageSync('UserId');
			this.findall('a');
		    this.form.empname = uni.getStorageSync('UserName');
			// this.form.factory = uni.getStorageSync('UserName');
			// this.form.dept = uni.getStorageSync('UserName');
			// this.form.deptno = uni.getStorageSync('UserName');
			// this.form.area = uni.getStorageSync('UserName');
			// this.form.company = uni.getStorageSync('UserName');
			let prow = {
				isEdit: false,
				isAdd: true,
				itemname: null,
				unit: null,
				quantity: null,
				picture: null,
				pictureurl: null
			};
			this.form.privates.push(prow);
			let byorow = {
				isEdit: false,
				isAdd: true,
				itemname: null,
				unit: null,
				quantity: null,
				picture: null,
				pictureurl: null
			};
			this.form.byos.push(byorow);
			let companyrow = {
				isEdit: false,
				isAdd: true,
				itemname: null,
				unit: null,
				quantity: null,
				reason: null,
				picture: null,
				pictureurl: null
			};
			this.form.companys.push(companyrow);
			let projectrow = {
				isEdit: false,
				isAdd: true,
				itemname: null,
				unit: null,
				quantity: null,
				reason: null
			};
			this.form.projects.push(projectrow);
			let rrow = {
				isEdit: false,
				isAdd: true,
				itemname: null,
				unit: null,
				quantity: null,
				picture: null,
				pictureurl: null
			};
			this.form.recycles.push(rrow);

			listDormlist(this.dormlist).then((data) => {
				self.dormlists = data.rows;
				this.processOpinion(self.dormlists);
			});

		},
		onLoad() {},
		methods: {
			findall(types) {
				if (types == "a") {
					if (this.form.empno === '') {
						this.errorMsg.empnoa = '请输入工号';
					} else {
						getEmployee(this.form.empno)
							.then((data) => {
								this.form.empname = data.data.empName;
								this.form.factory = data.data.factory;
								this.form.dept = data.data.deptname;
								this.form.deptno = data.data.deptno;
								this.form.area = data.data.area;
								this.form.company = data.data.company;
								if (data.data.empName === '') {
									this.form.empname = '找不到相关人员信息';
								} else {
									this.errorMsg.empnoa = '';
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}
				} else {
					if (this.form.carriertype == "13") {
						let self = this;
						getEmployee(this.form.carrierin)
							.then((data) => {
								self.form.carrier = data.data.empName;
								if (data.data.empName === '') {
									self.form.carrier = '找不到相关人员信息';
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}

				}
			},
			//时间格式化
			withData(param) {
				return param < 10 ? '0' + param : '' + param;
			},
			change(e) {
				let this_ = this;
				let value = [];
				e.detail.value.forEach((val, index) => {
					if (index === 0) {
						value.push(this.withData(val));
					} else {
						value.push(this.withData(val + 1));
					}
				})
				let arr = "20" + value[0] + '-' + value[1] + '-' + value[2];
				// document.getElementById("date").val('2022/02/17 13:01:02');
				this.form.releasedate = arr;
				console.log(this.form.releasedate);
			},
			empnoc(e) {
				this.form.empno = e.detail;
			},
			empnamec(e) {
				this.form.empname = e.detail;
			},
			carrierinc(e) {
				this.form.carrierin = e.detail;
			},
			carrierc(e) {
				this.form.carrier = e.detail;
			},
			remarkc(e) {
				this.form.remark = e.detail;
			},
			carrierc(e) {
				this.form.carrier = e.detail;
			},
			leavestatusc(event) {
				this.form.leavestatus = event.detail.value;
			},
			livingdormc(event) {
				this.form.livingdorm = event.detail.value;
				if (this.form.livingdorm === "1") {
					this.thatdormv = true;
				} else {
					this.thatdormv = false;
				}
			},
			computerequipmentc(event) {
				this.form.computerequipment = event.detail.value;
			},
			securitystationc(event) {
				this.form.securitystation = event.detail.value.join(';');
			},
			deliverystationc(event) {
				this.form.deliverystation = event.detail.value.join(';');
			},
			projectcodes(e) {
				this.form.projectcode = e.detail;
			},
			sealnos(e) {
				this.form.sealno = e.detail;
			},
			sealno2s(e) {
				this.form.sealno2 = e.detail;
			},
			licenseplatec(e) {
				this.form.licenseplate = e.detail;
			},
			onIndexChange(e) {
				let indexv = e;
				switch (indexv) {
					case 'apply':
						this.title = '放行申请'
						this.$router.push('/apply')
						break
					case 'work':
						this.title = '工作台'
						this.$router.push('/login')
						break
					case 'myinformation':
						this.title = '我的'
						this.$router.push('/mynavigation')
						break
				}
			},
			columnchange(e) {
				let dateArr = this.dateTimeArray
				let arr = this.form.dateTime
				//滑动所在列的数据并对其值进行更新
				arr[e.detail.column] = e.detail.value
				//更新展示月份对应的天数（28 or 29 or 30 or 31）
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
				//最后把最新的数值赋值到dateTimeArray
				this.dateTimeArray = dateArr
				this.form.dateTime = arr
			},
			submit(ref) {
				let _this = this;
				_this.errorSave = ''
				_this.showLoading = true;
				//保存前判断
				if (_this.form.empno === null || _this.form.empno === '') {
					_this.errorSave = '工号不能为空！'
					_this.showLoading = false;
					return;
				} else {
					if (_this.form.empname === '找不到相关人员信息') {
						_this.errorSave = '申請人工號不存在！'
						_this.showLoading = false;
						return;
					}
				}
				if (_this.form.releasetype === null || _this.form.releasetype === 0) {
					_this.errorSave = '放行類型不能为空！'
					_this.showLoading = false;
					return;
				}
				if (this.form.releasedate === null || this.form.releasedate === '') {
					this.errorSave = '放行日期不能为空！'
					_this.showLoading = false;
					return;
				}
				switch (_this.form.releasetype) {
					case "1":
						_this.form.deliverystation = null;
						_this.saveprivate();
						break;
					case "2":
						_this.savebyo();
						break;
					case "3":
						_this.form.deliverystation = null;
						if (_this.form.releaseperiod === null || _this.form.releasedate === '') {
							_this.errorSave = '放行時段不能为空！'
							_this.showLoading = false;
							return;
						}
						if (_this.form.itemtype === null || _this.form.itemtype === '') {
							_this.errorSave = '物品類型不能为空！'
							_this.showLoading = false;
							return;
						}
						switch (_this.form.itemtype) {
							case '12':
								_this.saveproject();
								break;
							case '28':
								if (_this.recoverydepartment.forEach(eve => {
										if (eve === _this.form.deptno) {
											_this.isRecovery = true;
										}
									}));
								if (_this.isRecovery === false) {
									_this.errorSave = '没有权限申请廢料回收垃圾清運！'
									_this.showLoading = false;
									return;
								}
								_this.isRecovery = false;
								_this.savecompany();
								break;
							default:
								_this.savecompany();
						}
						break;
					case "8":
						_this.saverecycle();
						break;
				}
				if (_this.errorSave === null || _this.errorSave === '') {
					_this.savepublic();
				}
				if (_this.errorSave === null || _this.errorSave === '') {
					addReleaseGood(_this.form).then(response => {
						if (response.code === 200) {
							_this.showLoading = false;
							if (response.data.Message.length > 0) //有错误的时候显示错误内容
							{
								_this.errorSave = response.data.Message;
							} else {
								_this.errorSave = "新增成功!";
								_this.tabIndex = 'work'
								_this.reset();
								// _this.$store.commit('setUserId', _this.userId)
								_this.onIndexChange(_this.tabIndex)
								let val = "/waitcheck";
								_this.$router.push(val);
							}
						} else {
							_this.reset();
							_this.errorSave = "新增失败!";
						}
					});
				} else {
					_this.showLoading = false;
				}
			},
			// 表单重置
			reset() {
				this.form = {
						formno: '',
						empno: '',
						empname: '',
						factory: '',
						dept: '',
						deptno: '',
						area: '',
						company: '',
						releasedate: null,
						releaseperiod: null,
						releasetype: 0,
						itemtype: null,
						carriertype: null,
						carrier: '',
						carrierin: '',
						vehicle: null,
						licenseplate: '',
						placedeparture: null,
						placedelivery: null,
						deliverystation: null,
						leavestatus: null,
						livingdorm: null,
						thatdorm: null,
						computerequipment: null,
						securitystation: null,
						projectcode: '',
						sealno: '',
						sealno2: '',
						picture: null,
						pictureurl: null,
						picture2: null,
						pictureurl2: null,
						stateid: null,
						privates: [],
						byos: [],
						companys: [],
						projects: [],
						remark: ''
					},
					this.resetForm("form");
			},
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				// this.$store.commit('setTableIndex', '/apply')
				uni.setStorageSync('TableIndex', '/apply');
				let val = this.tabbars[index].name
				this.$router.push(val);
			},
			backHome() {
				this.$router.push(uni.getStorageSync('TableIndex'));
			},
			//图片上传
			select(e, rowno, types) {
				const tempFilePaths = e.tempFilePaths;
				for (var i = 0; i < tempFilePaths.length; i++) {
					const imgUrl = tempFilePaths[i];
					let urlall = '';
					let urlone = '';
					let _ths = this;
					// alert(_ths.urls);
					uni.uploadFile({
						url: _ths.urls,
						filePath: imgUrl,
						name: 'file', //后端通过'file'获取上传的文件对象
						fileType: 'image',
						success: (uploadFileRes) => {
							// var curContrlName = "goodprivate" + rowno;
							// this.$refs[curContrlName].isUploading = false;
							console.log('uploadFileRes', JSON.parse(uploadFileRes.data));
							let path = JSON.parse(uploadFileRes.data)
							//后端返回的地址，存入图片地址
							// this.$refs[curContrlName].push({
							// 	url:path.url,
							// 	name: ''
							// })
							urlall = path.url;
							switch (types) {
								case 'a':
									urlone = _ths.form.privates[rowno].picture;
									if (urlone === null)
										_ths.form.privates[rowno].picture = urlall;
									else
										_ths.form.privates[rowno].picture = urlone + ';' + urlall;
									break;
								case 'b':
									urlone = _ths.form.byos[rowno].picture;
									if (urlone === null)
										_ths.form.byos[rowno].picture = urlall;
									else
										_ths.form.byos[rowno].picture = urlone + ';' + urlall;
									break;
								case 'c':
									_ths.form.picture = urlall;
									break;
								case 'd':
									_ths.form.picture2 = urlall;
									break;
								case 'e':
									urlone = _ths.form.companys[rowno].picture;
									if (urlone === null)
										_ths.form.companys[rowno].picture = urlall;
									else
										_ths.form.companys[rowno].picture = urlone + ';' + urlall;
									break;
								case 'f':
									urlone = _ths.form.recycles[rowno].picture;
									if (urlone === null)
										_ths.form.recycles[rowno].picture = urlall;
									else
										_ths.form.recycles[rowno].picture = urlone + ';' + urlall;
									break;
							}
							console.log('imageValue', _ths.imageValue)
						}
					});
				}
			},
			//图片删除
			delIMG(e) {
				console.log('456', e)
				const num = this.imageValue.findIndex(v => v.url === e.tempFilePath);
				this.imageValue.splice(num, 1);
			},
			addDate(types) {
				switch (types) {
					case 1:
						let prow = {
							isEdit: false,
							isAdd: true,
							itemname: null,
							unit: null,
							quantity: null,
							picture: null,
							pictureurl: null
						};
						this.form.privates.push(prow);
						break;
					case 2:
						let byorow = {
							isEdit: false,
							isAdd: true,
							itemname: null,
							unit: null,
							quantity: null,
							picture: null,
							pictureurl: null
						};
						this.form.byos.push(byorow);
						break;
					case 3:
						let companyrow = {
							isEdit: false,
							isAdd: true,
							itemname: null,
							unit: null,
							quantity: null,
							reason: null,
							picture: null,
							pictureurl: null
						};
						this.form.companys.push(companyrow);
						break;
					case 4:
						let projectrow = {
							isEdit: false,
							isAdd: true,
							itemname: null,
							unit: null,
							quantity: null,
							reason: null
						};
						this.form.projects.push(projectrow);
						break;
					case 8:
						let recyclerow = {
							isEdit: false,
							isAdd: true,
							itemname: null,
							unit: null,
							quantity: null,
							reason: null
						};
						this.form.recycles.push(recyclerow);
						break;
					default:
						break;
				}
				//添加数据
			},
			moverow(types, index) {
				switch (types) {
					case 1:
						this.form.privates.splice(index, 1);
						break;
					case 2:
						this.form.byos.splice(index, 1);
						break;
					case 3:
						this.form.companys.splice(index, 1);
						break;
					case 4:
						this.form.projects.splice(index, 1);
						break;
					case 8:
						this.form.recycles.splice(index, 1);
						break;
					default:
						break;
				}
			},
			//放行类型
			typevisible(e) {
				if (this.form.empno === undefined || this.form.empno === '') {
					// this.msgSuccess("工号不能为空！");
					this.errorMsg.resulta = "工号不能为空！";
				}
				if (this.form.empname === '找不到相关人员信息') {
					this.errorMsg.resulta = "工号不存在！";
					// this.msgSuccess("工号存在！");
				}
				switch (e) {
					case "1":
						this.goodprivatev = true;
						this.goodbyov = false;
						this.goodcompanyv = false;
						this.goodprojectv = false;
						this.goodrecyclev = false;
						this.goodcompanyv1 = false;
						this.placedeparturev = false;
						break;
						
					case "2":
						this.goodcompanyv = false;
						this.goodbyov = true;
						this.goodcompanyv = false;
						this.goodprojectv = false;
						this.goodprivatev = false;
						this.goodrecyclev = false;
						this.goodcompanyv1 = false;
						this.placedeparturev = false;
						break;
					case "3":
						this.goodcompanyv = false;
						this.goodbyov = false;
						this.goodcompanyv1 = true;
						this.goodprivatev = false;
						this.goodrecyclev = false;
						this.placedeparturev = true;
						if (this.form.itemtype === '12') {
							this.goodprojectv = true;
							this.goodcompanyv = false;
						} else {
							this.goodcompanyv = true;
							this.goodprojectv = false;
						}
						break;
					case "8":
						this.goodprivatev = false;
						this.goodbyov = false;
						this.goodcompanyv = false;
						this.goodprojectv = false;
						this.goodrecyclev = true;
					    this.goodcompanyv1 = false;
						this.placedeparturev = true;
						break;
					default:
						break;
				}
			},
			typevisible1(e) {
				if (e == 12) {
					this.goodprojectv = true;
					this.goodcompanyv = false;
				} else {
					this.goodcompanyv = true;
					this.goodprojectv = false;
				}
			},
			chkvisible(e) {
				if (e == 19) {
					this.chk1 = true;
				} else {
					this.chk1 = false;
				}
			},
			vehiclec(e) {
				if (e == 16) {
					this.Licenseplatev = false;
				} else {
					this.Licenseplatev = true;
				}
			},
			carriertypec(e) {
				switch (e) {
					case "13":
						this.carrierinname = "工  號:";
						this.carrierv = false;
						break;
					case "14":
						this.carrierinname = "入厂识别证:";
						this.carrierv = true;
						break;
					case "15":
						this.carrierinname = "VIP牌號:";
						this.carrierv = true;
						break;
					default:
						break;
				}
			},
			saveprivate() {
				if (this.form.leavestatus === null || this.form.leavestatus === '') {
					this.errorSave = '请挑选離職情况！'
					return;
				}
				if (this.form.livingdorm === null || this.form.livingdorm === '') {
					this.errorSave = '请挑选住宿舍情况！'
					return;
				}
				if (this.form.livingdorm === '1') {
					if (this.form.thatdorm === null || this.form.thatdorm === '0') {
						this.errorSave = '请选择住栋数情况！'
						return;
					}
				} else {
					this.form.thatdorm = '';
				}
				if (this.form.computerequipment === null || this.form.computerequipment === '') {
					this.errorSave = '请挑选電腦情况！'
					return;
				}
				this.form.privates.forEach((elv) => {
					if (elv.itemname === null || elv.itemname === '') {
						this.errorSave = '请输入物品名稱！'
						return;
					}
					if (elv.unit === null || elv.unit === '') {
						this.errorSave = '请输入单位！'
						return;
					}
					if (elv.quantity === null || elv.quantity === '') {
						this.errorSave = '请输入数量！'
						return;
					}
					if (elv.picture === null || elv.picture === '') {
						this.errorSave = '请选择图片！'
						return;
					}
				});
			},

			savepublic() {

				if (this.form.carrier === '找不到相关人员信息') {
					this.errorSave = "攜帶人工号不存在！";
					return;
				}
				if (this.form.carriertype === null || this.form.carriertype === '0') {
					this.errorSave = '请选择攜帶人！'
					return;
				}
				if (this.form.carrierin === null || this.form.carrierin === '') {
					this.errorSave = '请输入工號/身份證號/VIP牌號！'
					return;
				}
				if (this.form.vehicle === null || this.form.vehicle === '0') {
					this.errorSave = '请输入交通工具！'
					return;
				}
				if (this.form.vehicle === '17') {
					if (this.form.Licenseplate === null || this.form.Licenseplate === '') {
						this.errorSave = '请输入車牌號碼！'
						return;
					}
				}
				if (this.form.placedelivery === null || this.form.placedelivery === '') {
					this.errorSave = '请输入送貨地點！'
					return;
				}
			},
			savebyo() {
				// if (this.form.deliverystation === null || this.form.deliverystation === '') {
				// 	this.errorSave = '请勾選經過安檢站！'
				// 	return;
				// }
				this.form.byos.forEach((elvs) => {
					if (elvs.itemname === null || elvs.itemname === '') {
						this.errorSave = '请输入物品名稱！'
						return;
					}
					if (elvs.unit === null || elvs.unit === '') {
						this.errorSave = '请输入单位！'
						return;
					}
					if (elvs.quantity === null || elvs.quantity === '') {
						this.errorSave = '请输入数量！'
						return;
					}
					if (elvs.picture === null || elvs.picture === '') {
						this.errorSave = '请选择图片！'
						return;
					}
				});
			},
			savecompany() {
				this.form.companys.forEach((el) => {
					if (el.itemname === null || el.itemname === '') {
						this.errorSave = '请输入物品名稱！'
						return;
					}
					if (el.unit === null || el.unit === '') {
						this.errorSave = '请输入单位！'
						return;
					}
					if (el.quantity === null || el.quantity === '') {
						this.errorSave = '请输入数量！'
						return;
					}
				});
			},
			saveproject() {
				this.form.projects.forEach((elvp) => {
					if (elvp.itemname === null || elvp.itemname === '') {
						this.errorSave = '请输入物品名稱！'
						return;
					}
					if (elvp.unit === null || elvp.unit === '') {
						this.errorSave = '请输入单位！'
						return;
					}
					if (elvp.quantity === null || elvp.quantity === '') {
						this.errorSave = '请输入数量！'
						return;
					}
				});
			},
			saverecycle() {
				if (this.form.deliverystation === null || this.form.deliverystation === '') {
					this.errorSave = '请請勾選經過安檢站！'
					return;
				}
				this.form.recycles.forEach((elvs) => {
					if (elvs.itemname === null || elvs.itemname === '') {
						this.errorSave = '请输入物品名稱！'
						return;
					}
					if (elvs.unit === null || elvs.unit === '') {
						this.errorSave = '请输入单位！'
						return;
					}
					if (elvs.quantity === null || elvs.quantity === '') {
						this.errorSave = '请输入数量！'
						return;
					}
					if (elvs.picture === null || elvs.picture === '') {
						this.errorSave = '请选择图片！'
						return;
					}
				});
			},
			processOpinion(lists) {
				let arr = [];
				let self = this;
				for (let i = 0; i < lists.length; i++) {
					let c = {
						value: lists[i].dormlistid,
						text: lists[i].stage,
					};
					self.options7.push(c);
				}
			},
		},
		components: {
			Loading
		},
	};
</script>

<style>
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
		height: 10%;
		background-color: #f7f7fa;
	}

	.van-tabbar-item--active {
		color: #e10f02;
	}

	.gridCell>>>.van-icon {
		font-size: 50px;
	}

	.vant-nav-bar-index>>>.van-icon-arrow-left:before {
		color: #999999;
		block-size: 30px;
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	/*设置 tbody高度大于400px时 出现滚动条*/
	.uni-table tbody {
		display: block;
		width: 200px;
		overflow-x: scroll;
	}

	.uni-table thead,
	tbody tr {
		display: table;
		width: 100%;
		table-layout: fixed;
	}

	/*滚动条默认宽度是16px 将thead的宽度减16px*/
	.uni-table thead {
		width: calc(100% - 1em);
	}

	::v-deep .file-picker__box-content[data-v-4c5c5653] {
		width: 20px;
		height: 20px;
	}

	::v-deep .uni-table-td[data-v-321f8e79] {
		line-height: 66px;
	}

	::v-deep .uni-file-picker[data-v-363ace0e] {
		box-sizing: border-box;
		width: 100%;
		height: 30px;
	}
</style>