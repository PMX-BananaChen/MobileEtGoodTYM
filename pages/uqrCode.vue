<template>
	<view class="center-item">
          <br/>
		  <yy-qrcode :text="qrcodeText" />
	</view>
</template>

<script>
	// import UQRCode from '@/uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js';
	export default {
		data() {
			return {
				orderNo:'ds',
				qrcodeText: ''
			}
		},
		
		onReady() {
			this.clickFun();
			// 获取uQRCode实例
			// var qr = new UQRCode();
			// 设置二维码内容
			// qr.data = this.orderNo;
			// 设置二维码大小，必须与canvas设置的宽高一致
			// qr.size = 200;
			// 调用制作二维码方法
			// qr.make();
			// 获取canvas上下文
			// var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
			// 设置uQRCode实例的canvas上下文
			// qr.canvasContext = canvasContext;
			// 调用绘制方法将二维码图案绘制到canvas上
			// qr.drawCanvas();
		},
		created() {
			this.qrcodeText="fdss";
		},
		methods:{
			clickFun() {
			 
				// console.log(r);
				var qr = new UQRCode();
				// var orderNos = this.orderNo+";";
				var orderNos = this.orderNo;
			 
				qr.data = orderNos;
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
				 
				 
			}
		}
	}
		
	
</script>

<style lang="scss">
	page {
		background-repeat: no-repeat;
		background-position: center;
		background-attachment: fixed;
		background-size: 100% 100%;
	}
	.text-item{
		width: 100%;
		height: 40%;
		margin-top:50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}
	.text-tip{
		width: 100%;
		height: 100%;
		font-size: 40rpx;
		font-weight: 700;
		text-align: center;
		
	}
	.center-item{
		width: 100%;
		height: 100%;
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.qrcode-item{
		width: 400rpx;
		height: 400rpx;
		margin-top: 20%;
	}
</style>
