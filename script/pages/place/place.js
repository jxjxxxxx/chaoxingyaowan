var app = getApp();


Page({

  data: {
    key1:0,
    key2:-1,
    placelist:[     
      {
      area: "新城区",
      locations: [
        {locationName: "立丰国际", locationId: 81},
        {locationName: "韩森寨", locationId: 82},
        {locationName: "新城广场", locationId: 83},
        {locationName: "康复路", locationId: 84},
        {locationName: "幸福路沿线", locationId: 85},
        {locationName: "民乐园", locationId: 86},
        {locationName: "胡家庙", locationId: 87},]
      },
      
      {
      area: "未央区",
      locations: [
        {locationName: "红旗厂", locationId: 37},
        {locationName: "雅荷花园", locationId: 38},
        {locationName: "文景路", locationId: 39},
        {locationName: "明光路", locationId: 40},
        {locationName: "大明宫万达", locationId: 41},
        {locationName: "张家堡", locationId: 42},
        {locationName: "金华路沿线", locationId: 43},
        {locationName: "未央路沿线", locationId: 44},
        {locationName: "二府庄", locationId: 45},
        {locationName: "北大学城", locationId: 46},
        {locationName: "三桥", locationId: 47},
        {locationName: "大明宫", locationId: 48},
        {locationName: "辛家庙", locationId: 49},
        {locationName: "太华路沿线", locationId: 50},
        {locationName: "朱宏路", locationId: 51},
        {locationName: "龙首", locationId: 52},
        {locationName: "赛高新区", locationId: 53},
        {locationName: "城市运动公园", locationId: 54},
        {locationName: "和平村", locationId: 55},]
      },

      {
      area: "灞桥区",
      locations:[
        {locationName: "浐灞生态区", locationId: 94},
        {locationName: "城东客运站", locationId: 95},
        {locationName: "纺织城", locationId: 96},
        {locationName: "白鹿原", locationId: 97},
        {locationName: "世园会", locationId: 98},]
      },

      {
      area: "碑林区",
      locations:[
        {locationId: 1, locationName: "建工路"},
        {locationId: 2, locationName: "南二环东段"},
        {locationId: 3, locationName: "怡丰城"},
        {locationId: 4, locationName: "互助路立交"},
        {locationId: 5, locationName: "李家村"},
        {locationId: 6, locationName: "东门外"},
        {locationId: 7, locationName: "文艺路7"}, 
        {locationId: 8, locationName: "何家村"},
        {locationId: 9, locationName: "长安立交"},
        {locationId: 10, locationName: "省体育场"},
        {locationId: 11, locationName: "长乐坊"},
        {locationId: 12, locationName: "南院门"},
        {locationId: 13, locationName: "朱雀门"},
        {locationId: 14, locationName: "钟楼"},
        {locationId: 15, locationName: "鼓楼"},
        {locationId: 16, locationName: "西北大"},
        {locationId: 17, locationName: "和平门"},
        {locationId: 18, locationName: "交大东郊校区"},
        {locationId: 19, locationName: "广济街"},
        {locationId: 20, locationName: "东大街"},
        {locationId: 21, locationName: "南大街"},
        {locationId: 22, locationName: "南稍门"},
        {locationId: 23, locationName: "东关正街"},]
      },

      {
      area: "莲湖区",
      locations:[
        {locationName: "土门", locationId: 68},
        {locationName: "劳动南路", locationId: 69},
        {locationName: "北关", locationId: 70},
        {locationName: "安定门", locationId: 71},
        {locationName: "甜水井", locationId: 72},
        {locationName: "莲湖公园", locationId: 73},
        {locationName: "北大街", locationId: 74},
        {locationName: "大兴新区", locationId: 75},
        {locationName: "红庙坡", locationId: 76},
        {locationName: "桥梓口", locationId: 77},
        {locationName: "西稍门", locationId: 78},
        {locationName: "西羊市", locationId: 79},
        {locationName: "桃园路", locationId: 80},]
      },

      {
      area: "长安区",
      locations:[
        {locationName: "韦曲西街", locationId: 88},
        {locationName: "韦曲南站", locationId: 89},
        {locationName: "秦岭沿线", locationId: 90},
        {locationName: "长安广场", locationId: 91},
        {locationName: "郭杜", locationId: 92},
        {locationName: "南大学城", locationId: 93},]
      },

      {
      area: "雁塔区",
      locations:[
        {locationName: "会展中心", locationId: 24},
        {locationName: "南二环西段", locationId: 25},
        {locationName: "明德门", locationId: 26},
        {locationName: "含光路南段", locationId: 27},
        {locationName: "雁翔路", locationId: 28},
        {locationName: "杨家村", locationId: 29},
        {locationName: "吉祥村", locationId: 30},
        {locationName: "三森", locationId: 31},
        {locationName: "小寨", locationId: 32},
        {locationName: "长安路", locationId: 33},
        {locationName: "曲江新区", locationId: 34},
        {locationName: "大雁塔", locationId: 35},
        {locationName: "朱雀大街", locationId: 36},]
      },

      {
      area: "高新区",
      locations:[
        {locationName: "唐延路北段", locationId: 56},
        {locationName: "绿地世纪城", locationId: 57},
        {locationName: "枫林绿洲", locationId: 58},
        {locationName: "科技路西口", locationId: 59},
        {locationName: "紫薇田园都市", locationId: 60},
        {locationName: "玫瑰大楼", locationId: 61},
        {locationName: "科技路沿线", locationId: 62},
        {locationName: "唐延路沿线", locationId: 63},
        {locationName: "电子城", locationId: 64},
        {locationName: "丈八", locationId: 65},
        {locationName: "高新路沿线", locationId: 66},
        {locationName: "太白南路沿线", locationId: 67},]
      }


    
    
    ],
    area:'',
  },

//被点击的左侧菜单
  choose1: function (e) {
    
	  this.setData({
      key1:e.currentTarget.dataset.index,
      key2:-1,
      area:e.currentTarget.dataset.name,
    });
  },
  choose2: function (e) {
    app.globalData.locationName = e.currentTarget.dataset.name,
    app.globalData.areaName = this.data.area,
    app.globalData.placeId = e.currentTarget.dataset.id,
    //console.log(app.globalData.placeId),
    this.setData({
      key2:e.currentTarget.dataset.index,
    });
    if(!app.globalData.areaName){
      app.globalData.areaName = '新城区'
    }
    wx.navigateBack();
  },

  onLoad: function(options) {
  },
 
})