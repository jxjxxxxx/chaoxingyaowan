var app = getApp();
const util = require('../../utils/util.js');
Page({
  
  data: {
    isentered:false,
    isAdmin:false,
    isChecked:false,
    ismanaging:false,
    shadeshow:false,
    host:false,
    actionSheetHidden:true,

    roomData:[],
    goDate:'',
    roomId:'',
    inviterId:'',
    gender:'',
    wxNum:'',
    color:['#777DAA','#B8BDDA','#AFAACA','#8591B7','#DDCFE6']

  },
  
  onLoad:function(options) {
    //获取房间信息
    var roomId = options.roomId
    var inviterId = options.inviterId
    this.setData({
      roomId:roomId,
      inviterId:inviterId,
    })
    if(!wx.getStorageSync('token')){
      app.login();
    }
  },

  onShow:function() {
    //获取房间信息
    var roomId = this.data.roomId
    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/room/getDetail',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',},
      data:{
        roomId:roomId,
      },
      success: (res) => {  
        this.setData({
          roomData:res.data.data.room,
        })
        var timeStamps = this.data.roomData.goDate
        var timeString = util.formatAcString(timeStamps);
        this.setData({
          goDate:timeString,
        })
        for(var i = 0 ; i < (res.data.data.room.manNum + res.data.data.room.womanNum) ; i++) {
          if(app.globalData.userId == res.data.data.room.players[i].userId){
            this.setData({
              isentered:true,
            })
            if(app.globalData.userId == res.data.data.room.adminId){
              this.setData({
                isAdmin:true,
              })
            }
            break;
          }
        }
      },   
    }); 
    //获取玩家性别及微信号
    if(wx.getStorageSync('token')){
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/user/getInfo',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data:{
          userId:app.globalData.userId
        },
        success: (res) => {
          this.setData({
            gender:res.data.data.user.gender,
            wxNum:res.data.data.user.wxNum,
          })
        },   
      });
    }
    
  },

  teammate: function(res) {
    console.log(res.currentTarget) 
    if(wx.getStorageSync('token')){
      wx.navigateTo({
        url: '../others_profile/others_profile?userId=' + res.currentTarget.dataset.userid,
      });
    }else{
      wx.showToast({
        title: '您尚未登录，无法查看他人信息',
        icon:"none",
        duration: 2000
      })
    }  
  },
  

  enter(){
    if(wx.getStorageSync('token')){
      if(this.data.inviterId){
        if(this.data.gender == 'MAN'){
          if(this.data.roomData.script.manMax == this.data.roomData.manNum){
            wx.showToast({
              title: '您的性别人数已满，加入车队失败',
              icon:"none",
              duration: 2000
            })
          }else{
            wx.showModal({
            title: '提示',
            content: '确定要加入车队吗',
            success: (res)=>{
              if (res.confirm){
                wx.request({
                  url: 'https://beyond-murder.be.wizzstudio.com/room/join',
                  method:'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded',
                            'token':app.globalData.token,},
                  data:{
                    roomId:this.data.roomData.roomId,
                    inviterId:this.data.inviterId
                  },
                  success: (res) => {
                    if(res.data.code == 20000){
                      this.setData({
                        isentered: !this.data.isentered
                      });
                      this.onShow()
                      wx.showToast({
                        title: '加入队伍成功',
                        icon:"none",
                        duration: 2000
                      })
                      
                    }else if(res.data.code == 50001){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50002){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50003){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别和微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
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
                    }else if(res.data.code == 50014){
                      wx.showToast({
                        title: '信誉积分过低，加入车队失败',
                        icon:"none",
                        duration: 2000
                      })
                    } 
                  },   
                });
              }
              
            }
  
            })
          }
        }else if(this.data.gender == 'WOMAN'){
          if(this.data.roomData.script.womanMax == this.data.roomData.womanNum){
            wx.showToast({
              title: '您的性别人数已满，加入车队失败',
              icon:"none",
              duration: 2000
            })
          }else{
            wx.showModal({
            title: '提示',
            content: '确定要加入车队吗',
            success: (res)=>{
              if (res.confirm){
                wx.request({
                  url: 'https://beyond-murder.be.wizzstudio.com/room/join',
                  method:'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded',
                            'token':app.globalData.token,},
                  data:{
                    roomId:this.data.roomData.roomId,
                    inviterId:this.data.inviterId
                  },
                  success: (res) => {
                    if(res.data.code == 20000){
                      this.setData({
                        isentered: !this.data.isentered
                      });
                      this.onShow()
                      wx.showToast({
                        title: '加入队伍成功',
                        icon:"none",
                        duration: 2000
                      })
                    }else if(res.data.code == 50001){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50002){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50003){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别和微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
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
                    }else if(res.data.code == 50014){
                      wx.showToast({
                        title: '信誉积分过低，加入车队失败',
                        icon:"none",
                        duration: 2000
                      })
                    } 
                  },   
                });             
              } 
            }
  
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '需要补全性别信息',
            confirmText:'补全',
            success: function (res) {
              if (res.confirm) {
                  wx.navigateTo({
                      url: '../settings/settings',
                  });
              }
            }
          }) 
        }
      }else{
        if(this.data.gender == 'MAN'){
          if(this.data.roomData.script.manMax == this.data.roomData.manNum){
            wx.showToast({
              title: '您的性别人数已满，加入车队失败',
              icon:"none",
              duration: 2000
            })
          }else{
            wx.showModal({
            title: '提示',
            content: '确定要加入车队吗',
            success: (res)=>{
              if (res.confirm){
                wx.request({
                  url: 'https://beyond-murder.be.wizzstudio.com/room/join',
                  method:'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded',
                            'token':app.globalData.token,},
                  data:{
                    roomId:this.data.roomData.roomId,
                  },
                  success: (res) => {
                    if(res.data.code == 20000){
                      this.setData({
                        isentered: !this.data.isentered
                      });
                      this.onShow()
                      wx.showToast({
                        title: '加入队伍成功',
                        icon:"none",
                        duration: 2000
                      })
                      
                    }else if(res.data.code == 50001){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50002){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50003){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别和微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
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
                    }else if(res.data.code == 50014){
                      wx.showToast({
                        title: '信誉积分过低，加入车队失败',
                        icon:"none",
                        duration: 2000
                      })
                    } 
                  },   
                });
              }
              
            }
  
            })
          }
        }else if(this.data.gender == 'WOMAN'){
          if(this.data.roomData.script.womanMax == this.data.roomData.womanNum){
            wx.showToast({
              title: '您的性别人数已满，加入车队失败',
              icon:"none",
              duration: 2000
            })
          }else{
            wx.showModal({
            title: '提示',
            content: '确定要加入车队吗',
            success: (res)=>{
              if (res.confirm){
                wx.request({
                  url: 'https://beyond-murder.be.wizzstudio.com/room/join',
                  method:'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded',
                            'token':app.globalData.token,},
                  data:{
                    roomId:this.data.roomData.roomId,
                  },
                  success: (res) => {
                    if(res.data.code == 20000){
                      this.setData({
                        isentered: !this.data.isentered
                      });
                      this.onShow()
                      wx.showToast({
                        title: '加入队伍成功',
                        icon:"none",
                        duration: 2000
                      })
                    }else if(res.data.code == 50001){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50002){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
                      })
                    }else if(res.data.code == 50003){
                      wx.showModal({
                        title: '提示',
                        content: '需要补全性别和微信号信息',
                        confirmText:'补全',
                        success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '../settings/settings',
                              });
                          }
                        }
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
                    }else if(res.data.code == 50014){
                      wx.showToast({
                        title: '信誉积分过低，加入车队失败',
                        icon:"none",
                        duration: 2000
                      })
                    } 
                  },   
                });             
              } 
            }
  
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '需要补全性别信息',
            confirmText:'补全',
            success: function (res) {
              if (res.confirm) {
                  wx.navigateTo({
                      url: '../settings/settings',
                  });
              }
            }
          }) 
        }
      }
    }else{
      app.login();
    }  
  },

  quit(){
    wx.showModal({
      title: '确认下车',
      content: '下车将扣除相应的信誉积分，可能导致不能再参与拼车',
      cancelText:'我再想想',
      confirmText:'确认下车',
      confirmColor:'#AFAACA',
      cancelColor:'#C09DBE',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'https://beyond-murder.be.wizzstudio.com/room/quit',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded',
                      'token':app.globalData.token,},
            data:{
              roomId:this.data.roomData.roomId
            },
            success: (res) => {
              wx.showToast({
                title: '退出队伍成功',
                icon:"none",
                duration: 2000
              })
              this.setData({
                isentered: !this.data.isentered
              });
              this.onShow()
            }, 
          });
          wx.navigateBack();
          
        }
        
      }

    })
  },

  host(){
    this.setData({
      host:true,
      shadeshow:true,
    })
  },

  dissolve(){
    wx.showModal({
      title: '提示',
      content: '确定要解散车队吗,会被扣除一定的信誉积分',
      success: (res)=>{
        if (res.confirm){
          wx.request({
            url: 'https://beyond-murder.be.wizzstudio.com/room/dismiss',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded',
                      'token':app.globalData.token,},
            data:{
              roomId:this.data.roomData.roomId
            },
            success: (res) => {
              wx.showToast({
                title: '解散队伍成功',
                icon:"none",
                duration: 2000
              })               
            },   
          });
          wx.navigateBack();
        }
      }
    })
      
  },
  
  manage(){
    this.setData({
      ismanaging:!this.data.ismanaging,
    })
  },

  check(){
    this.setData({
      isChecked:true,
      shadeshow:true,
    })
  },

  cancel(){
    this.setData({
      isChecked:false,
      shadeshow:false,
      host:false,
    });
  },

  kick(e){
    console.log(e.currentTarget.dataset.userid)
    var kickedId = e.currentTarget.dataset.userid
    wx.showModal({
      title: '提示',
      content: '确定踢出该玩家吗',
      success: (res)=>{
        if (res.confirm){
          wx.request({
            url: 'https://beyond-murder.be.wizzstudio.com/room/kick',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded',
                      'token':app.globalData.token,},
            data:{
              roomId:this.data.roomData.roomId,
              kickedId:kickedId
            },
            success: (res) => {
              wx.showToast({
                title: '踢人成功',
                icon:"none",
                duration: 2000
              })
              this.onShow() 

            },   
          });
          
        }
      }
    })
  },
  
  copy(e){
    var text = e.currentTarget.dataset.wxnum
    wx.setClipboardData({
      data:text,
    })
  },
  
  showActionSheet(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  
  listenerActionSheet: function (res) {
    console.log(res);
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  onShareAppMessage(res) {
    if(res.from==='button'){
      var roomId=this.data.roomId
      var inviterId=app.globalData.userId
    }
    return {
      title: 'beyond-murder',
      path:'/pages/team/team?roomId='+roomId+'&inviterId='+inviterId,
    }
  }
  
  
  
  
});