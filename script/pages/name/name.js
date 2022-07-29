var app = getApp();

Page({

 
  data: {
    name:'',
  },
  
  input:function(e) {
    console.log(e.detail.value);
    this.setData({
      name:e.detail.value
    });
  },

  name: function () {
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/user/updateInfo',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data:{
          nickname:this.data.name,
        },
        success: (res) => {
          if(res.data.code == 50015){
            wx.showModal({
              title: '提示',
              content: '请先登录',
              confirmText:'登录',
              success:function (res) {
                if (res.confirm) {
                  app.login()
                }
              }
            })
          }else{
            wx.showToast({
              title: '提交成功',
              icon:"none",
              duration: 2000
            })
            wx.navigateBack();
          }
        },   
      });

    
  },

  onShow:function () {
    //打开界面就获取了用户信息
    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/user/getInfo',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',
                'token':app.globalData.token,},
      data:{
        userId:app.globalData.userId
      },
      success: (res) => {
        if(res.data.code == 50015){
          wx.showModal({
            title: '提示',
            content: '请先登录',
            confirmText:'登录',
            success:function (res) {
              if (res.confirm) {
                app.login()
              }
            }
          })
        }else if (res.data.code == 20000){
          this.setData({
            name:res.data.data.user.nickname
          });
        }
      },   
    });
    
  }



})