var app = getApp();
const util = require('../../utils/util.js');
Page({

 
  data: {
    roomList:'',
    page:1,
    joinDate:[],
    leaveDate:[],
    leaveReason:[],
  },
  
  
  onShow:function () {
       
    //打开界面就获取了用户信息
    wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/user/history',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data:{
          userId:app.globalData.userId,
          pageSize:10
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
          }else if(res.data.code == 20000){
            this.setData({
                roomList:res.data.data.records.list
            })
          }
          //加入时间
          for(var i = 0;i < res.data.data.records.list.length;i++) {
            var timeStamps1 = res.data.data.records.list[i].joinDate;
            var timeString1 = util.formatString(timeStamps1);
            this.setData({
              joinDate:this.data.joinDate.concat(timeString1)
            })
          }
          //离开时间
          for(var i = 0;i < res.data.data.records.list.length;i++) {
            var timeStamps2 = res.data.data.records.list[i].leaveDate;
            if(timeStamps2){
                var timeString2 = util.formatString(timeStamps2);
                this.setData({
                leaveDate:this.data.leaveDate.concat(timeString2)
                })
            }else{
                this.setData({
                leaveDate:this.data.leaveDate.concat('未离开')
                })
            }
            
          }
          //离开原因
          for(var i = 0;i < res.data.data.records.list.length;i++) {
            var reason = res.data.data.records.list[i].leaveReason;
            if(reason){
                if(reason == 'QUIT'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('自行退出')
                    })
                }else if(reason == 'KICKED'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('房主踢出')
                    })
                }else if(reason == 'FAIL'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('人数不足以发车')
                    })
                }else if(reason == 'DISMISSED'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('房间解散')
                    })
                }else if(reason == 'SUCCESS'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('成功发车')
                    })
                }
            }else{
                this.setData({
                    leaveReason:this.data.leaveReason.concat('无')
                })
            }  
          }
        },   
      });
  },

  onReachBottom: function() {
    ++this.data.page;
    console.log(this.data.page);
    if(!this.data.isLastPage){
        wx.request({
          url: 'https://beyond-murder.be.wizzstudio.com/user/history',
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded',
                    'token':app.globalData.token,},
          data: {
            pageNum:this.data.page,
            pageSize:10,
            userId:app.globalData.userId,
          },                                                                   
          success: (res) => {
            this.setData({
                roomList:this.data.roomList.concat(res.data.data.records.list),
                isLastPage:res.data.data.records.isLastPage,
            })
            for(var i = 0;i < res.data.data.records.list.length;i++) {
                var timeStamps1 = res.data.data.records.list[i].joinDate;
                var timeString1 = util.formatString(timeStamps1);
                this.setData({
                    joinDate:this.data.joinDate.concat(timeString1)
                })
            
            }
            for(var i = 0;i < res.data.data.records.list.length;i++) {
                var timeStamps2 = res.data.data.records.list[i].leaveDate;
                if(timeStamps2){
                    var timeString2 = util.formatString(timeStamps2);
                    this.setData({
                        leaveDate:this.data.leaveDate.concat(timeString2)
                    })
                }else{
                    this.setData({
                        leaveDate:this.data.leaveDate.concat('未离开')
                    })
                }
            }
            //离开原因
          for(var i = 0;i < res.data.data.records.list.length;i++) {
            var reason = res.data.data.records.list[i].leaveReason;
            if(reason){
                if(reason == 'QUIT'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('自行退出')
                    })
                }else if(reason == 'KICKED'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('房主踢出')
                    })
                }else if(reason == 'FAIL'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('人数不足以发车')
                    })
                }else if(reason == 'DISMISSED'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('房间解散')
                    })
                }else if(reason == 'SUCCESS'){
                    this.setData({
                        leaveReason:this.data.leaveReason.concat('成功发车')
                    })
                }
            }else{
                this.setData({
                    leaveReason:this.data.leaveReason.concat('无')
                })
            }  
          }
          },     
        });
    }
  },



})