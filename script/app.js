//app.js
App({
    globalData: {
        //用于发起组队
        areaName:'',
        locationName:'',
        placeId:'',
        scriptName:'',
        scriptId:'',
        scriptIndex:-1,
        //有关个人信息
        token:'',
        weixinNum:'',
        userId:'',
    },





    onLaunch: function(options) {
        if(!wx.getStorageSync('token')){
            this.login();
        }else{
            this.globalData.token = wx.getStorageSync('token')
            this.globalData.userId = wx.getStorageSync('userId')  
        }
        //
        if(this.globalData.userId < 100 && wx.getStorageSync('token')){
            var userInfo = wx.getStorageSync('userInfo')
            wx.login({
                success: (res) => {
                    var code=res.code
                    if(code){
                        wx.request({                   
                            url: 'https://beyond-murder.be.wizzstudio.com/user/login',           
                            data: {
                                code:code, 
                            },
                            header: {'content-type': 'application/x-www-form-urlencoded'},
                            method: 'POST',
                            success: (res) => {
                                //若新用户未上传头像昵称        
                                if (res.data.code == 20001 ){
                                    wx.request({                   
                                        url: 'https://beyond-murder.be.wizzstudio.com/user/updateInfo',           
                                        data: {
                                            avatarUrl:userInfo.avatarUrl,
                                            nickname:userInfo.nickName
                                        },
                                        header: {'content-type': 'application/x-www-form-urlencoded',
                                                'token':res.data.data.token},
                                        method: 'POST',
                                        success:(e) => {
                                            wx.showToast({
                                                title: '登录成功',
                                                icon:"none",
                                                duration: 2000
                                            })
                                        }
                                    })
                                    
                                }else if(res.data.code == 20000){
                                    wx.showToast({
                                        title: '登录成功',
                                        icon:"none",
                                        duration: 2000
                                    })
                                }
                                this.globalData.token = res.data.data.token;
                                this.globalData.userId = res.data.data.userId;
                                var token = res.data.data.token;
                                wx.setStorageSync('token',token);
                                var userId = res.data.data.userId;
                                wx.setStorageSync('userId',userId);
                                
                            },
                        });
                        
                    }
            },
            });
            
        }
    },

    login(){
        wx.showModal({
            title: '登录',
            content: '是否登录以授权小程序获取你的信息',
            success: (result) => {
                if (result.confirm) {
                    new Promise(resolve=>{
                        wx.getUserProfile({
                            desc:"用于获取用户信息",
                            success:(res)=>{
                                let userInfo=res.userInfo
                                wx.setStorageSync("userInfo",userInfo)
                                resolve('success')
                            }
                        }) 
                    }).then((val)=>{
                            var userInfo = wx.getStorageSync('userInfo')
                            wx.login({
                                success: (res) => {
                                    var code=res.code
                                    if(code){
                                        wx.request({                   
                                            url: 'https://beyond-murder.be.wizzstudio.com/user/login',           
                                            data: {
                                                code:code, 
                                            },
                                            header: {'content-type': 'application/x-www-form-urlencoded'},
                                            method: 'POST',
                                            success: (res) => {
                                                //若新用户未上传头像昵称        
                                                if (res.data.code == 20001 ){
                                                    wx.request({                   
                                                        url: 'https://beyond-murder.be.wizzstudio.com/user/updateInfo',           
                                                        data: {
                                                            avatarUrl:userInfo.avatarUrl,
                                                            nickname:userInfo.nickName
                                                        },
                                                        header: {'content-type': 'application/x-www-form-urlencoded',
                                                                'token':res.data.data.token},
                                                        method: 'POST',
                                                        success:(e) => {
                                                            wx.showToast({
                                                                title: '登录成功',
                                                                icon:"none",
                                                                duration: 2000
                                                            })
                                                        }
                                                    })
                                                    
                                                }else if(res.data.code == 20000){
                                                    wx.showToast({
                                                        title: '登录成功',
                                                        icon:"none",
                                                        duration: 2000
                                                    })
                                                }
                                                this.globalData.token = res.data.data.token;
                                                this.globalData.userId = res.data.data.userId;
                                                var token = res.data.data.token;
                                                wx.setStorageSync('token',token);
                                                var userId = res.data.data.userId;
                                                wx.setStorageSync('userId',userId);
                                                
                                            },
                                        });
                                        
                                    }
                            },
                            });
                        
                    })
                    
                    
                }
            } ,

        })
    },
});
  