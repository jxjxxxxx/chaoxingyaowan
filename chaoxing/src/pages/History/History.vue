<template>
	<div>
		
		<div class='signBox' v-for="sign in signList" >
			<image class="img" v-if="sign.type=='NORMAL'" src='../../static/sign.png'></image>
			<image class="img" v-if="sign.type=='GESTURE'" src='../../static/gesture.png'></image>
			<image class="img" v-if="sign.type=='PASSWORD'" src='../../static/secret.png'></image>
			<image class="img" v-if="sign.type=='LOCATION'" src='../../static/location.png'></image>
			<image class="img" v-if="sign.type=='LOCATION_SIMPLE'" src='../../static/location.png'></image>
			<image class="img" v-if="sign.type=='QR_CODE'" src='../../static/qrcode.png'></image>
			 <div class="box">
				 <div class="signName">{{sign.courseName}}</div>
				 <div class="signTime">{{sign.signTime}}</div>
			 </div>
			<div class="type" v-if="sign.type=='NORMAL'">普通签到</div>
			<div class="type" v-if="sign.type=='GESTURE'">手势签到</div>
			<div class="type" v-if="sign.type=='PASSWORD'">密码签到</div>
			<div class="type" v-if="sign.type=='LOCATION'">位置签到</div>
			<div class="type" v-if="sign.type=='LOCATION_SIMPLE'">位置签到</div>
			<div class="type" v-if="sign.type=='QR_CODE'">二维码签到</div>
		</div>	
	</div>
	
</template>

<script>
	export default {
		name: 'Course',
		data() {
			return {
				courses:[],
				jwt:'',
				signList:[],
				current:1,
				pages:'',
			}
		},
		onLoad(options) {
			this.jwt = options.jwt;
			uni.request({
					url: "https://chaoxing-pill.be.wizzstudio.com/sign-record/get",
					header: {
						  'jwt': this.jwt
					},
					data:{
						size:12,
					},
					method:'GET',
					success: (res) => {
						console.log(res.data.data);
						if(res.data.code == 5001){
							uni.setStorage({
								key:'jwt',
								data:'',
								success:() => {
									uni.showModal({
										title: '提示',
										content: '登录已过期，请重新登录',
										success: (res) => {
											if(res.confirm){ 
												uni.reLaunch({
													url: "../index/index",
												})	
											} else {  
												uni.reLaunch({
													url: "../index/index",
												})	
											}  
										}  	  
									})
								}
							});
						}else if(res.data.code == 2000){
							this.signList = res.data.data.signRecords.records;
							this.pages = res.data.data.signRecords.pages; 
						}
					},
			});
		},
		onReachBottom() { 
			if(this.current < this.pages){
				this.current++;
				console.log(this.current);
				uni.request({
						url: "https://chaoxing-pill.be.wizzstudio.com/sign-record/get",
						header: {
							  'jwt': this.jwt
						},
						data:{
							size:12,
							current:this.current, 
						},
						method:'GET',
						success: (res) => {
							this.signList = this.signList.concat(res.data.data.signRecords.records);
							//console.log(res.data.data.signRecords);
						},
				});
			}
			
		}
	}
</script>

<style scoped>
	.signBox {
		display: flex;
		background-color: #F8F8FF;
		width: 100%;
		height: 130rpx;
	}
	
	.img{
		height: 100rpx;
		width: 100rpx;
		margin: 15rpx;
	}
	
	.box{
		width:410rpx; 
	}
	
	.signName{
		width:410rpx;
		font-size: 37rpx;
		font-family: Simhei;
		margin-top: 18rpx;
		height: 50rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.signTime{
		color: darkgrey;
		padding-left: 6rpx;
	}
	
	.type{
		width:200rpx;
		margin-left: auto;
		margin-top: 20rpx;
		color: darkgrey;
		text-align: right;
		padding-right: 16rpx;
	}
</style>