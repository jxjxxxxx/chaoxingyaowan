<template>
	<div>
		<div class='signBox' v-for="sign in signList" v-on:click="goSign(sign.activityId,sign.name)">
			<image class="img" v-if="sign.type == 'NORMAL' " src='../../static/sign.png'></image>
			<image class="img" v-else-if="sign.type == 'GESTURE' " src='../../static/gesture.png'></image>
			<image class="img" v-else-if="sign.type == 'PASSWORD' " src='../../static/secret.png'></image>
			<image class="img" v-else-if="sign.type == 'LOCATION' " src='../../static/location.png'></image>
			<image class="img" v-else-if="sign.type == 'LOCATION_SIMPLE' " src='../../static/location.png'></image>
			<image class="img" v-else-if="sign.type == 'QR_CODE' " src='../../static/qrcode.png'></image>
			 <div>
				 <div class="signName">{{sign.name}}</div>
				 <div class="signTime">{{sign.endTime}}</div>
			 </div>
			 
		</div>
			
		<div class='noSign' v-if='noSign'>暂无签到</div>
		<div class='load' v-if='loading'>正在加载...</div>
	</div>
	
	
</template>

<script>
	export default {
		name: 'Sign',
		
		data() {
			return {
				jwt:'',
				classId:'',
				courseId:'',
				signList:[],
				noSign:false,
				loading:true,
			}
		},
		
		onLoad(options) {
			
			this.jwt = options.jwt;
			this.classId = options.classId;
			this.courseId = options.courseId;
			uni.request({
					url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/sign-activities",
					header: {
						  'jwt': this.jwt
					},
					data:{
						classId:this.classId,
						courseId:this.courseId,
					},
					method:'GET',
					success: (res) => {
						this.loading = false;
						this.signList = res.data.data.signActivities;
						if(!this.signList.length){
							this.noSign = true;
						}
						//console.log(this.signList);
					},
			});
		},
		methods: {
			goSign(a,b){ 
				console.log(a,b); 
				if(b == '二维码签到'){
					uni.showToast({
						icon:"none",
						title:"允许使用过期二维码",
					}) 
					uni.scanCode({
						success: (res) => {
							var n = res.result.split(/SIGNIN:aid=|&source=|&Code=|&enc=/);
							var aid = n[1];
							var enc = n[4];
							console.log(aid);
							console.log(enc);
							if(aid&&enc){
								uni.request({
									url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/qrcode-sign",
									header: {
										'jwt': this.jwt,
										'content-type': 'application/x-www-form-urlencoded',
									},
									data:{
										activityId:aid,
										enc:enc
									}, 
									method:'POST',
									success: (res) => {
										
										if(res.data.code == 2000){
											uni.showToast({
												title:'签到成功',
												icon:"none",
												duration:3000,
											});
											uni.request({
													url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/sign-activities",
													header: {
														  'jwt': this.jwt
													},
													data:{
														classId:this.classId,
														courseId:this.courseId,
													},
													method:'GET',
													success: (res) => {
														if(!this.signList.length){
															this.noSign = true;
														}
														this.signList = res.data.data.signActivities;
													},
											});
										}else{
											uni.showModal({
												title: '提示',
												content: '二维码错误',
												success: function (res) {
													if (res.confirm) {
														console.log('用户点击确定');
														
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												}
																		
											})
										} 
									},
								});
							}else{
								uni.showModal({
									title: '提示',
									content: '二维码错误',
									success: function (res) {
										if (res.confirm) {
											console.log('用户点击确定');
											
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
							
								})
							}
						},
						
					});
							
						
					
					 
				}else{
					var aid = Number(a)
					uni.request({
						url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/simple-sign",
						header: {
							'jwt': this.jwt,
							'content-type': 'application/x-www-form-urlencoded',
						},
						data:{
							activityId:aid,
						}, 
						method:'POST',
						success: (res) => {
							if(res.data.code == 2000){
								uni.showToast({
										title:'签到成功',
										icon:"none",
										duration:3000,
								});  
								uni.request({
										url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/sign-activities",
										header: {
											  'jwt': this.jwt
										},
										data:{
											classId:this.classId,
											courseId:this.courseId,
										},
										method:'GET',
										success: (res) => {
											this.signList = res.data.data.signActivities;
											if(!this.signList.length){
												this.noSign = true;
											}
										},
								});
							} 
						},
					});
				}
				
				
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
	
	.signName{
		width:500rpx;
		font-size: 35rpx;
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
	
	.tips{
		font-size: 50rpx;
		width: 100%;
		height: 100%;
		text-align: center;
		color: forestgreen;
		padding-top: 400rpx;
		font-family: SimHei;
		background-color: #F8F8FF;
	}
	
	.noSign{
		font-size: 50rpx;
		font-family: SimHei;
		width: 100%;
		height: 100%;
		padding-top: 200rpx;
		text-align: center;
	}
	
	.load{
		font-size: 50rpx;
		font-family: SimHei;
		width: 100%;
		height: 100%;
		padding-top: 200rpx;
		text-align: center;
	}
</style>
