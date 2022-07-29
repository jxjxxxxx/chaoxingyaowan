<template>
	<div>
		<div v-for="course in courses">
			<navigator :url="'../../pages/sign/sign?jwt=' + jwt + '&courseId=' + course.courseId + '&classId=' + course.classId">
				<div class='classBox'>
					<image class="left" v-if="course.subscribed" src='../../static/left.png'></image>
					<image class="img" :src='course.imgUrl'></image> 
					<div>
						<div class="className">{{course.courseName}}</div>
						<div class="teacherName">{{course.teacherName}}</div>
					</div>
					<div class="cancel" v-if="control&&course.subscribed" v-on:click.stop="cancel(course.courseId.toString(),course.classId.toString())">取消</div>
					<div class="add" v-if="control&&!course.subscribed" v-on:click.stop="add(course.courseId.toString(),course.classId.toString())">订阅</div>
				</div>
			</navigator>
			
				
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
				control:false,
			}
		},
		onLoad(option) {
			this.jwt = option.jwt;
			uni.request({
				  url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/courses",
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
						}else if(res.data.code == 2000){
							this.courses = res.data.data.courses;
						}
						
				  },
			});
		},
		methods: {
			add(a,b){
				uni.request({
					  url: "https://chaoxing-pill.be.wizzstudio.com/subscribe/add",
					  header: {
							'jwt': this.jwt,
					  },
					  data:{
								"classId":b,
								"courseId":a,
							},
					
					  method:'POST',
					  success: (res) => {
							if(res.data.code == 2000){
								uni.request({
									  url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/courses",
									  header: {
											  'jwt': this.jwt
										  },
									  method:'GET',
									  success: (res) => {
											this.courses = res.data.data.courses;
											//console.log(this.courses);
											uni.showToast({
												icon:'none',
												duration:3000,
												title:"订阅成功\n订阅的课程可在首页一键签到"
											})
									  },
								});
							}else if(res.data.code == 5000&&res.data.msg == "最多订阅5门课程"){
								uni.showToast({
									icon:'none',
									duration:3000,
									title:"订阅课程数量已经达到上限啦"
								})
							}
					  },
				});
			},
			cancel(a,b){
				var id = a;
				var cid = b;
				console.log(id,cid);
				uni.request({
					  url: "https://chaoxing-pill.be.wizzstudio.com/subscribe/delete",
					  header: {
							'jwt': this.jwt,
					  },
					  data:{
								"classId":cid,
								"courseId":id,
							},
					
					  method:'DELETE',
					  success: (res) => {
							if(res.data.code == 2000){
								uni.request({
									  url: "https://chaoxing-pill.be.wizzstudio.com/chaoxing/courses",
									  header: {
											  'jwt': this.jwt
										  },
									  method:'GET',
									  success: (res) => {
											this.courses = res.data.data.courses;
											//console.log(this.courses);
											uni.showToast({
												icon:'none',
												title:"取消订阅成功"
											})
									  },
								});
								
							}
					  },
				});
			},
		} ,
		onNavigationBarButtonTap(){
			this.control = !this.control;
		},
	}
</script>

<style scoped>
	.classBox {
		display: flex;
		background-color: #F8F8FF;
		height: 130rpx;
		
	}
	
	.img{
		height: 90rpx;
		width: 90rpx;
		margin: 20rpx;
	}
	
	.className{
		width:500rpx; 
		font-size: 35rpx;
		font-family: Simhei;
		margin-top: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.teacherName{
		color: darkgrey;
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	
	.date{
		color: darkgrey;
		padding-top: 10rpx;
		margin-right: 20rpx;
	}
	
	.left{
		position: absolute;
		width: 30rpx;
		height: 30rpx;
	}
	
	.add{
		float: right;
		color: #F8F8FF;
		font-size: 25rpx;
		height: 60rpx;
		width: 100rpx;
		background-color: #1296db;
		text-align: center;
		line-height: 60rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}
	
	.cancel{
		float: right;
		color: #F8F8FF;
		font-size: 25rpx;
		height: 60rpx;
		width: 100rpx;
		background-color: #D296db;
		text-align: center;
		line-height: 60rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}
</style>
