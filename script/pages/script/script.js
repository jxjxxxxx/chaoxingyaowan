var app = getApp();

var page = 1;
Page({


    data:{
        scriptList:[],
        key1:-1,
        text:'',
        page:1,
        isLastPage:false,
    },  
    
    choose: function (e) {
      console.log(e.currentTarget.dataset.index),
      app.globalData.scriptId = e.currentTarget.dataset.id,
      app.globalData.scriptName = e.currentTarget.dataset.name,
      app.globalData.scriptIndex = e.currentTarget.dataset.index,
      this.setData({
        key1:e.currentTarget.dataset.index
      });
      wx.navigateBack();
    },
    
    input:function(e) {
      //console.log(e.detail.value);
      this.setData({
        text:e.detail.value
      });
    },

    search: function () {
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/script/search',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
        data: {
          scriptName:this.data.text,
          pageSize:10
        },
        success: (res) => {
          //console.log(res),
          this.setData({
            scriptList:res.data.data.scripts.list,
            key1:-1,
            isLastPage:false,
          })
        },   
      });
    },

    onLoad: function() {
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/script/search',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',
                  'token':app.globalData.token,},
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
              scriptList:res.data.data.scripts.list,
            })
          }
        },   
      });
    },

    onShow: function() {
      
      this.setData({
        key1: app.globalData.scriptIndex
      });
      console.log(this.data.key1);
    },

    onReachBottom: function() {
      ++this.data.page;
      console.log(this.data.page);
      if(!this.data.isLastPage){
          wx.request({
            url: 'https://beyond-murder.be.wizzstudio.com/script/search',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded',
                      'token':app.globalData.token,},
            data: {
              pageNum:this.data.page,
              scriptName:this.data.text,
              pageSize:10
            },                                                                   
            success: (res) => {
              this.setData({
                scriptList:this.data.scriptList.concat(res.data.data.scripts.list),
                isLastPage:res.data.data.scripts.isLastPage
              })
            },     
          });
      }
    },
    

})