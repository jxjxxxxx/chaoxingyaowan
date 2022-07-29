var app = getApp();
var date = new Date(date)
const util = require('../../utils/util.js');
Page({

  data: {
      userInfo:[],
      rooms:[],
      date:[],
      
  },

  onLoad: function(options)  {
      var userId = options.userId
      //后端获取用户信息
      wx.request({
          url: 'https://beyond-murder.be.wizzstudio.com/user/getInfo',
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
          data:{
              userId:userId
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
                      userInfo:res.data.data.user
                  })
              }
          },   
      });
      //获取车队列表
      wx.request({
          url: 'https://beyond-murder.be.wizzstudio.com/user/currentJoin',
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded',
                    'token':app.globalData.token,}, 
          data:{
              userId:userId
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
                rooms:res.data.data.rooms,
                date:[],
              })
              for(var i = 0;i < res.data.data.rooms.length;i++) {
                var timeStamps = res.data.data.rooms[i].goDate;
                var timeString = util.formatString(timeStamps);
                this.setData({
                  date:this.data.date.concat(timeString)
                })
              }
            }
          },     
        });
  }, 

  onShow: function() {
      
  },

  team: function(res) {
    console.log(res.currentTarget.dataset.roomid)
    wx.navigateTo({
      url: '../team/team?roomId=' + res.currentTarget.dataset.roomid,
    });
  }

})