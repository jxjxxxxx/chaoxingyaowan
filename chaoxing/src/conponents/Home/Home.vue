<template>
	<div>
		<div class="empty"></div>
		
		<div class="courseList" v-on:click="courses()">
			<div class="text" >课程列表</div>
		</div>
		
		
		<div class="signHistory" v-on:click="history()">
			<div class="text">签到记录</div>
		</div>
		
		<div class="subscribe" v-on:click="subscribe()">
			<div class="text">一键签到</div>
		</div>
		
		<div class="subList" v-if="sub">
			<div class="qrsignTitle" v-if="qrsignList.length">二维码签到</div>
			<div class="subBox" v-for="qrsign in qrsignList">
				<div class="name">{{qrsign.courseName}}</div>
				<div class="qrcode" v-on:click="sign()">扫码签到</div>
			</div>
			<div class="qrsignTitle" v-if="signList.length">已完成签到</div>
			<div class="subBox" v-for="sign in signList"> 
				<div class="name">{{sign.courseName}}</div>
				<div class="code" v-if="sign.type=='NORMAL'">普通签到</div>
				<div class="code" v-else-if="sign.type=='GESTURE'">手势签到</div>
				<div class="code" v-else-if="sign.type=='PASSWORD'">密码签到</div>
				<div class="code" v-else-if="sign.type=='LOCATION'">位置签到</div>
				<div class="code" v-else-if="sign.type=='LOCATION_SIMPLE'">位置签到</div>
				<div class="code" v-else-if="sign.type=='QR_CODE'">二维码签到</div>
			</div>
			
		</div> 
		
		<div class="shade" v-if="sub" v-on:click="cancel()"></div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		props: ['jwt'],
		data() {
			return {
				sub:false,
				qrsignList:'',
				signList:'',
			}
		},
		methods: {
			courses(){
			 	uni.navigateTo({
			 		url: "../../pages/Course/Course?jwt=" + this.jwt,
			 	})
			},
			
			history(){
			 	uni.navigateTo({
			 		url: "../../pages/History/History?jwt=" + this.jwt,
			 	})
			},
			
			
			sign(){
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
			},
			 
			subscribe(){
				uni.request({
					  url: "https://chaoxing-pill.be.wizzstudio.com/subscribe/check",
					  header: {
							  'jwt': this.jwt
						},
					  method:'GET',
					  success: (res) => {
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
													url: "../../pages/index/index",
												})
											} else {  
												uni.reLaunch({
													url: "../../pages/index/index",
												})
											}  
										}  
										
									})
								}
							});
						}else if(res.data.code == 2000){
							if(res.data.data.successfulActivities.length > 0){
								uni.showToast({
									icon:"none",
									title: '所有订阅的课程签到成功', 
								})
								this.sub = 	!this.sub
								this.signList = res.data.data.successfulActivities
							}else{
								uni.showToast({
									icon:"none",
									title: '暂无需要签到', 
								})
							}	
						}else if(res.data.code == 1000){
							console.log(res.data.data);
							this.qrsignList = res.data.data.qrCodeSignActivities;
							this.signList = res.data.data.successfulActivities;
							uni.showModal({
								title: '提示',
								content: '有二维码签到，需要手动上传二维码',
								success: (res) => {
									if(res.confirm){ 
										this.sub = 	!this.sub
									}
								}
							})
							
							
						}
					  },
				});
			},
			
			cancel(){
				this.sub = 	!this.sub
			}
		},
		
		mounted() {
			uni.request({ 
				  url: "https://chaoxing-pill.be.wizzstudio.com/user/is-password-changed",
				  header: {
						  'jwt': this.jwt,
				 },
				  method:'GET',
				  success: (res) => {
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
						}
				  },
			})	  
		} 
		
	}
</script>

<style scoped>
	.empty{
		float: left;
		width: 100%;
		height:300rpx;
		z-index: 1;
	}
	
	.courseList{
		float: left;
		width: 335rpx;
		height: 160rpx;
		background-color:#1286db;
		margin: 20rpx;
		border-radius: 30rpx;
		
	}
	
	.signHistory{
		float: left;
		width: 335rpx;
		height: 160rpx;
		background-color: #5286db;
		margin: 20rpx;
		border-radius: 30rpx;
		
	}
	
	.subscribe{
		position: absolute;
		width: 335rpx;
		height: 160rpx;
		background-color: #9286db;
		border-radius: 30rpx;
		bottom:300rpx;
		left:200rpx;
	}
	
	.quit{
		float: left;
		width: 335rpx;
		height: 160rpx;
		background-color: #D286db;
		margin: 20rpx;
		border-radius: 30rpx;
	}
	
	.text{
		color: white;
		font-family: SimHei;
		font-size: 60rpx;
		margin-top: 45rpx;
		margin-left: 45rpx;
	}
	
	.qrsignTitle{
		color: #C286db;
		width: 450rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	
	.subBox{
		width: 450rpx;
		display: flex;
	}
	
	.subList{
		position: fixed;
		top:300rpx;
		left:150rpx;
		background-color: aliceblue;
		border-radius: 30rpx;
		width: 450rpx;
		z-index: 999;
	}
	
	.name{
		
		margin: 40rpx;
		color: #1286db;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.qrcode{
		margin: 30rpx;
		
		background-color: #9286db;
		color: aliceblue;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	
	.code{
		float: right;
		margin: 40rpx;
		color: #9286db;
	}
	
	.shade{
	    position:fixed;
	    width: 100%;
	    height: 100%;
	    z-index:2;
	    background-color: rgb(173, 170, 170);
	    opacity: 0.8;
	}
</style>