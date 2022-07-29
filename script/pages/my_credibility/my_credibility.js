var app = getApp();
Page({

  data: {
    num:'',
  },
  onLoad: function () {
    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/user/getCredit',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',
                'token':app.globalData.token,},
      success: (res) => {
        this.setData({
          num:res.data.data.credit
        })
      }
    })  
  },

})