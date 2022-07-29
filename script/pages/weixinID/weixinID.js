var app = getApp();

Page({

 
  data: {
    weixinNum:'',
    correct:false,
  },
  
  input:function(e) {
    var that = this
    let value = (e.detail.value || "").trim()
    console.log(value)
    if (value) {
      const reg =  /[\u4e00-\u9fa5]/ig
      if (reg.test(value)) {
        value = value.replace(reg, '')
        wx.showToast({
          title: '不能输入中文!',
          icon: "none",
        })
        var weixin = that.data.weixinNum
        this.setData({
          weixinNum: weixin,
          correct:false,
        })
      }else{
        this.setData({
          weixinNum: value,
          correct:true,
        })
        console.log(that.data.weixinNum)
      }
    }
  },

  weixinNum: function () {
    if(this.data.correct){
      wx.showModal({
          title: '提示',
          content: '微信号将用于车队联系，请确认填写正确',
          success: (res)=>{
            if (res.confirm){
              wx.request({
                url: 'https://beyond-murder.be.wizzstudio.com/user/updateInfo',
                method:'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded',
                          'token':app.globalData.token,},
                data:{
                  wxNum:this.data.weixinNum,
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
                    wx.showToast({
                      title: '微信号提交成功',
                      icon:"none",
                      duration: 2000
                    })
                    wx.navigateBack();
                  }
                },   
              });
            }
          }
      })
    }else{
      wx.showToast({
        title: '不能输入中文!',
        icon: "none",
      })
    }  

    
    
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
            weixinNum:res.data.data.user.wxNum
          });
        }
      },   
    });
    
  }



})