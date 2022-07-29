var app = getApp();
const util = require('../../utils/util.js');
Page({

  data: {
    rooms:[],
    date:[],
    isLastPage:false,
    page:1,
    text:'',
  },

  onLoad: function() {
    
  },

  input:function(e) {
    this.setData({
      text:e.detail.value
    });
  },

  search: function () {
    this.setData({
      rooms:[],
      date:[],
      page:1,
      isLastPage:false,
    })
    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',},
      data: {
        scriptName:this.data.text,
        pageSize:8,
        pageNum:1,
      },
      success: (res) => {
        //console.log(res),
        this.setData({
          rooms:res.data.data.rooms.list,
          isLastPage:res.data.data.rooms.isLastPage,
        })
        for(var i = 0;i < res.data.data.rooms.list.length;i++) {
          var timeStamps = res.data.data.rooms.list[i].goDate;
          var timeString = util.formatString(timeStamps);
          this.setData({
            date:this.data.date.concat(timeString)
          })
        }
      },   
    });
  },

  onReachBottom: function() {
    ++this.data.page;
    if(!this.data.isLastPage){
      
        wx.request({
          url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded',},
          data: {
            pageNum:this.data.page,
            pageSize:8,
            scriptName:this.data.text,
          },                                                                   
          success: (res) => {
            this.setData({
              isLastPage:res.data.data.rooms.isLastPage,
              rooms:this.data.rooms.concat(res.data.data.rooms.list),  
            })
            console.log(this.data.page);
            for(var i = 0;i < res.data.data.rooms.list.length;i++) {
              var timeStamps = res.data.data.rooms.list[i].goDate;
              var timeString = util.formatString(timeStamps);
              this.setData({
                date:this.data.date.concat(timeString)
              })
            }
          },     
        });

    }

  },

  team: function(res) {
    console.log(res.currentTarget.dataset) 
    wx.navigateTo({
      url: '../team/team?roomId=' + res.currentTarget.dataset.roomid,
    });
  },
})