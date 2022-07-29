<template>
  <div class="login">
    <div>
      <input type="number" placeholder="请输入手机号码" v-model="num" clearable class="input_style" id="one"></input>
    </div>
	
    <div>
      <input type="password" placeholder="请输入超星密码" v-model="pwd" show-password class="input_style"></input>
      <div class="errorBox">
		  <span v-if="error" class="err-msg">*手机号或密码不正确*</span>
	  </div>
	  
    </div>
	
    <div>
		<button type="primary" @click="login" class="login_style">登录</button>
    </div>
	<div class="tips">
		*账号密码及登录信息均保存在本地
	</div>
	<div class="tips" id="two">
		服务端不会记录以上信息
	</div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        num: '',
        pwd : '',
        error :'',
		jwt:'',
      }
    },
    methods:{
		login(){
			uni.request({
				url: "https://chaoxing-pill.be.wizzstudio.com/user/login",
				data:{
					phoneNum:this.num,
					password:this.pwd,
				},
				header:{
					'content-type': 'application/x-www-form-urlencoded',
				},
				method:'POST',
				success: (res) => {
					//console.log(res);
					if(res.data.code == 2000) {
						this.jwt = res.data.data.jwt;
						this.$emit('loginSuccess',this.jwt);
						//缓存
						uni.setStorage({
							key:'jwt',
							data:this.jwt,
							success() {
								uni.showModal({
									title:"欢迎使用超星药丸",
									content:"订阅：可以在课程列表的右上角修改订阅课程信息。\n一键签到：可以用于检查所有订阅课程的签到活动，并尝试自动签到。请不要连续频繁点击，否则存在被短期封禁的风险。\n待签到列表：展示当前课程仍开放并且没有签过的活动，除二维码签到以外，点击即签到。\n二维码签到：允许使用过期二维码。",
									
								})
							}
						});
					}else if(res.data.code == 5000){
						this.error = 1;
					}
					
				},
			});
		},
		
    },
  }
</script>

<style scoped>
  .login{
    margin-top: 400rpx;
  }
  .input_style{
    width: 540rpx;
	height: 80rpx;
	margin-left: 100rpx;
	margin-right: 100rpx;
	border:5rpx solid grey;
	border-radius: 8rpx;
	padding-left: 5rpx ;
  }
  
  #one{
	   margin-bottom: 50rpx;
  }
  
  .login_style{
    width: 400rpx;
  }
  
  .errorBox{
	  height: 60rpx;
  }
  
  .err-msg{
	  font-family: monospace;
	  color: crimson;
	  margin-left: 100rpx;
  }
  
  .tips{
	  margin-top: 20rpx;
	  font-family: monospace;
	  margin-left: 100rpx;
	  font-size: 30rpx;
  }

  #two{
	  margin-left: 120rpx;
  }
  
</style>