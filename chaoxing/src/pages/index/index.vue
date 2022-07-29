<template>
  <div>
    <Login @loginSuccess='parentFn' v-if="!jwt"></Login>
	<Home @quitSuccess='parentFm' :jwt="jwt" v-else></Home>
  </div>
</template>

<script>
	import Login from '../../conponents/Login/Login.vue'
	import Home from '../../conponents/Home/Home.vue'
	export default {
		name: '',
		components: {
			Login,
			Home
		},
		
		data(){
		  return {
			jwt:'',
		  }
		},
		
		methods:{ 
			//收到jwt
			parentFn(jwt){
				this.jwt = jwt
				console.log('父组件收到jwt,即将传给Home');	
			},
			//退出登录收到jwt为空
			parentFm(jwt){
				this.jwt = jwt
				console.log(this.jwt);	
			}
			
		},
		beforeMount() {
			uni.getStorage({
				key:'jwt', 
				success:(res)=> {
					this.jwt = res.data;
				},
			}) 
		}, 
		onShow(){
			uni.getStorage({
				key:'jwt', 
				success:(res)=> {
					this.jwt = res.data;
				},
			}) 
		},
		onNavigationBarButtonTap(){
			uni.showModal({
				title:'提示',
				content:'确认退出',
				success: (res) => {
					if(res.confirm){
						this.jwt = '';
						uni.setStorage({
							key:'jwt',
							data:'',
							success:() => {
								this.$emit('quitSuccess',this.jwt);
								uni.showToast({
									title:'退出成功'
								});
							}
						});
					}
				}
			})	
		},
		
	}
</script>

<style scoped>
	
</style>
