var app = getApp();

Page({

  
  data: {
      userInfo:'',

      area:'',
      
      index:'',
      sex1:['男','女'],

      areaArray:[
        
        "新城区" ,
        "长安区" ,
        "未央区" ,
        "灞桥区" ,
        "莲湖区" ,
        "雁塔区" ,
        "高新区" ,
        "碑林区" ,
        
      ],
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
            content: '登录过期，请先登录',
            confirmText:'登录',
            success:function (res) {
              if (res.confirm) {
                app.login()
              }
            }
          })
        }else if (res.data.code == 20000){
          this.setData({
            userInfo:res.data.data.user,
            area:res.data.data.user.area
          })
          if(this.data.userInfo.gender == 'MAN'){
            this.setData({
              index:0,
            })
          }else if(this.data.userInfo.gender == 'WOMAN'){
            this.setData({
              index:1,
            })
          }
        }
      },   
    });    
  },

  bindsexChange: function(res) {
    this.setData({
      index: res.detail.value
    })
    if(res.detail.value == 1){
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/user/updateGender',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data:{
          gender:'WOMAN',
        },
        success: (res) => {
          if(res.data.code == 50016){
            wx.showToast({
              title: '修改性别后,用户加入的某些房间没有对应性别的空闲位置,可以退出这些房间后重试',
              icon:"none",
              duration: 2000
            })
          }else if(res.data.code == 20000){
            wx.showToast({
              title: '提交性别成功',
              icon:"none",
              duration: 2000
            })
          }else if(res.data.code == 50015){
            wx.showModal({
              title: '提示',
              content: '登录过期，请重新登录',
              confirmText:'登录',
              success:function (res) {
                if (res.confirm) {
                  app.login()
                }
              }
            })
          }
        }, 
      })
    }else{
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/user/updateGender',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data:{
          gender:'MAN',
        },
        success: (res) => {
          if(res.data.code == 50016){
            wx.showToast({
              title: '修改性别后,用户加入的某些房间没有对应性别的空闲位置,可以退出这些房间后重试',
              icon:"none",
              duration: 2000
            })
          }else if(res.data.code == 20000){
            wx.showToast({
              title: '提交性别成功',
              icon:"none",
              duration: 2000
            })
          }else if(res.data.code == 50015){
            wx.showModal({
              title: '提示',
              content: '登录过期，请重新登录',
              confirmText:'登录',
              success:function (res) {
                if (res.confirm) {
                  app.login()
                }
              }
            })
          }
        },
      })
    }

  },

  changeAvatar:function() {
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'], 
      success: (res)=> {
        var img = res.tempFilePaths[0]
        var size = res.tempFiles[0].size
        if(size < 5242880){
          wx.uploadFile({
            filePath: img,
            name: 'avatar',
            url: 'https://beyond-murder.be.wizzstudio.com/user/updateAvatar',
            header: {
              'token':app.globalData.token
            },
            success:(res)=>{
              this.onShow()
            }
          })
        }else{
          wx.showToast({
            title: '图片过大,无法上传',
            icon:"none",
            duration: 2000
          })
        }
        
      }
    })
  },

  wxNum: function() {
    
    wx.navigateTo({
      url: '../weixinID/weixinID',
    });
  },
  
  intro: function() {
    wx.navigateTo({
      url: '../intro/intro',
    });
  },

  name: function() {
    
    wx.navigateTo({
      url: '../name/name',
    });
  },


  changeArea:function(e){
    switch(e.detail.value){
      case '0':
        var area = '新城区';
        break;
      case '1':
        var area = '长安区';
        break;
      case '2':
        var area = '未央区';
        break;
      case '3':
        var area = '灞桥区';
        break;
      case '4':
        var area = '莲湖区';
        break;
      case '5':
        var area = '雁塔区';
        break; 
      case '6':
        var area = '高薪区';
        break
      case '7':
        var area = '碑林区';
        break      
    }

    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/user/updateInfo',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',
                'token':app.globalData.token,},
      data:{
        area:area
      },
      success: (res) => {
        if(res.data.code == 20000){
          this.setData({
            area:area
          })
          wx.showToast({
            title: '提交地区成功',
            icon:"none",
            duration: 2000
          })
        }else if(res.data.code == 50015){
          wx.showModal({
            title: '提示',
            content: '登录过期，请重新登录',
            confirmText:'登录',
            success:function (res) {
              if (res.confirm) {
                app.login()
              }
            }
          })
        }
      }, 
    })
  }
  })