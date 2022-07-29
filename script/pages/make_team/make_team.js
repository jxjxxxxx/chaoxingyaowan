const util = require('../../utils/util.js');

var app = getApp();

var dateString = '';
var timeString = '';
//Page Object
Page({



    data: {
      todate:'',
      date:'',
      time:'',
      index:0,
      location:'',
      area:'',
      script:'',
      timeString:'',
      dateString:'',

      timeArray:[
        [
          { id: "1", name: "06" },
          { id: "2", name: "07" },
          { id: "3", name: "08" },
          { id: "4", name: "09" },
          { id: "5", name: "10" },
          { id: "6", name: "11" },
          { id: "7", name: "12" },
          { id: "8", name: "13" },
          { id: "9", name: "14" },
          { id: "10", name: "15" },
          { id: "11", name: "16" },
          { id: "12", name: "17" },
          { id: "13", name: "18" },
          { id: "14", name: "19" },
          { id: "15", name: "20" },
          { id: "16", name: "21" },
          { id: "17", name: "22" },
          { id: "18", name: "23" },
        ],
        [
          { id: "19", name: "00" },
          { id: "20", name: "30" },
        ]
      ],
    },

    onLoad: function () {
      var date = util.formatDate(new Date());
      date = date.toString();
      this.setData({
        todate:date,
        dateString:date,
      });
      
    },

    onShow: function () {
      var todate = util.formatDate(new Date());
      var date = new Date(todate);
      date.setDate(date.getDate() + 7);
      var enddate = util.formatDate(date);
      this.setData({
        location:app.globalData.locationName,
        area:app.globalData.areaName,
        script:app.globalData.scriptName, 
        todate: todate,
        enddate:enddate,
      });
    },    

    make(){
      if(this.data.time&&this.data.date&&this.data.script&&this.data.location){
        wx.showModal({
          title: '提示',
          content: '确定要发起车队吗',
          success: (res) => {
            if (res.confirm) {
              var timeStamps = Date.parse(new Date(this.data.dateString + ' '+this.data.timeString));
              console.log(this.data.dateString + ' '+ this.data.timeString);
              wx.request({
                url: 'https://beyond-murder.be.wizzstudio.com/room/create',
                method:'POST',
                header: {'content-type': 'application/x-www-form-urlencoded',
                          'token':app.globalData.token,},
                data:{
                  goDate:timeStamps,
                  locationId:app.globalData.placeId,
                  scriptId:app.globalData.scriptId,
                },
                success: (res) => {
                  if(res.data.code == 20000){
                    wx.showToast({
                      title: '发起组队成功\n可在 我的-我的车队 内查看',
                      icon:"none",
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '../team/team?roomId=' + res.data.data.roomId,
                    });
                    
                    app.globalData.locationName = '';
                    app.globalData.areaName = '';
                    app.globalData.scriptName = '';
                    this.setData({
                      date:'',
                      time:'',
                      index:0,
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
                  }else if(res.data.code == 50000){
                    wx.showToast({
                      title: '发起组队失败，可能是剧本发起时间不对或者性别与剧本发起条件不符',
                      icon:"none",
                      duration: 2000
                    })
                  }else if(res.data.code == 50014){
                    wx.showToast({
                      title: '信誉积分过低，发起组队失败',
                      icon:"none",
                      duration: 2000
                    })
                  }  
                },   
              });
            }
          }
    
        });
      }else{
        wx.showModal({
          title: '提示',
          content: '车队信息未填写完全',
        })
      }
        
    },
    
    bindDateChange: function(res) {
      
      this.setData({
        date: res.detail.value,
        dateString: res.detail.value
      })
    },
    
    changeMulti:function(e){
      var indexs = e.detail.value;
      console.log(indexs);
      if(indexs[1]==0){
        var min = '00';
      }else{
        var min = '30';
      }
      if(indexs[0] + 6 < 10){
        var hour = '0'+(indexs[0]+6)
      }else{
        var hour = indexs[0] + 6
      }
      var time1 = hour + ':' + min;
      this.setData({
        time:time1,
        timeString:time1,
      })
      
    }
    
    
});