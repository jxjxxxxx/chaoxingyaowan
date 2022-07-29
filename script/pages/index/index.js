var app = getApp();
const util = require('../../utils/util.js');
var date1 = new Date(date)




var date = util.formatDate(new Date())
var date2
var date3
var date4
var date5
var date6
var date7

//Page Object

Page({

  

  data: {
    cardCur: 0,
    swiperList:[
      {
        src:'https://beyond-murder.oss-cn-chengdu.aliyuncs.com/circularBanner/9f287840-7136-45a7-b27b-cfeca1af6a16.png'
      },
      {
        src:'https://beyond-murder.oss-cn-chengdu.aliyuncs.com/circularBanner/b04ec343-02ce-4b96-9346-dab07a33a09c.png'
      }
    ],
    sift_ticai:"剧本题材",
    sift_time:"时间",
    sift_place:"地点",
    sift_person:"加入人数",
    key1:-1,
    key2:-1,
    key3:-1,
    key4:-1,

    rooms:[],
    date:[],
    page:1,
    isLastPage:false,
    tag:'',
    area:'',
    joinNum:'',
    timeStamps:'',

    list1:['欢乐','情感','恐怖','硬核','阵营',],

    list2:[
      {
        name:date,
      }
    ],
    
    list3:[
      {
      id:1,
      name:"1人",
      isactive:false,
      },
      {
      id:2,
      name:"2人",
      isactive:false,
      },
      {
      id:3,
      name:"3人",
      isactive:false,
      },
      {
      id:4,
      name:"4人",
      isactive:false,
      },
      {
      id:5,
      name:"5人",
      isactive:false,
      },
    ],
  
    list4:[
      {
        id:1,
        name:"新城区",
      },
      {
        id:2,
        name:"莲湖区",
      },
      {
        id:3,
        name:"雁塔区", 
      },
      {
        id:4,
        name:"灞桥区",
      },
      {
        id:5,
        name:"未央区",
      },
      {
        id:6,
        name:"长安区",
      },
      {
        id:7,
        name:"高新区",
        isactive:false,
      },
      {
        id:8,
        name:"碑林区",
        isactive:false,
      },
      
    ],

  isa_show:false,
  isb_show:false,
  isc_show:false,
  isd_show:false,
  shadeshow:false,
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  a_show: function () {
      this.setData({
        isa_show: !this.data.isa_show,
        isb_show: false,
        isc_show: false,
        isd_show: false,
        shadeshow:!this.data.isa_show,
      });
    },
  b_show: function () {
      this.setData({
        isb_show: !this.data.isb_show,
        isa_show: false,
        isc_show: false,
        isd_show: false,
        shadeshow:!this.data.isb_show,
      });
      
    },
  c_show: function () {
      this.setData({
        isc_show: !this.data.isc_show,
        isa_show: false,
        isb_show: false,
        isd_show: false,
        shadeshow:!this.data.isc_show,
      });
    },
  d_show: function () {
      this.setData({
        isd_show: !this.data.isd_show,
        isa_show: false,
        isb_show: false,
        isc_show: false,
        shadeshow:!this.data.isd_show,
      });
    },

  choose1: function (e) {
    if(this.data.key1 != e.currentTarget.dataset.index){
      var tag = e.currentTarget.dataset.name
	    this.setData({
      key1: e.currentTarget.dataset.index,
      sift_ticai:e.currentTarget.dataset.name,
      isa_show:false,
      shadeshow:false,
      date:[],
      rooms:[],
      page:1,
      tag:tag,
      isLastPage:false,
      });
      wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',},
      data:{
        tagName:tag,
        pageSize:5,
        area:this.data.area,
        joinNum:this.data.joinNum,
        pageNum:this.data.page,
        goDate:this.data.timeStamps,
      },
      success: (res) => {
        console.log(res.data.data.rooms)
        this.setData({
          rooms:res.data.data.rooms.list, 
          isLastPage:res.data.data.rooms.isLastPage,
        })
        
        for(var i = 0;i < res.data.data.rooms.list.length; i++) {
          var timeStamps = res.data.data.rooms.list[i].goDate;
          var timeString = util.formatString(timeStamps);
          this.setData({
            date:this.data.date.concat(timeString)
          })
        }
      },   
      });
    }else{
      this.setData({
      key1: -1,
      sift_ticai:'剧本题材',
      isa_show:false,
      shadeshow:false,
      date:[],
      rooms:[],
      page:1,
      tag:'',
      isLastPage:false,
      });
      wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',},
      data:{
        tagName:'',
        pageSize:5,
        area:this.data.area,
        joinNum:this.data.joinNum,
        pageNum:this.data.page,
        goDate:this.data.timeStamps,
      },
      success: (res) => {
        console.log(res.data.data.rooms)
        this.setData({
          rooms:res.data.data.rooms.list, 
          isLastPage:res.data.data.rooms.isLastPage,
        })
        
        for(var i = 0;i < res.data.data.rooms.list.length; i++) {
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

  choose2: function (e) {
    if(this.data.key2 != e.currentTarget.dataset.index){
      var dateString = e.currentTarget.dataset.name;
      var timeStamps = Date.parse(new Date(dateString +' ' + '00:00'));
      this.setData({
        key2: e.currentTarget.dataset.index,
        sift_time:e.currentTarget.dataset.name,
        isb_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        timeStamps:timeStamps,
        isLastPage:false,
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          tagName:this.data.tag,
          pageSize:5,
          area:this.data.area,
          joinNum:this.data.joinNum,
          pageNum:this.data.page,
          goDate:timeStamps,
        },
        success: (res) => {
          console.log(res.data.data.rooms)
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
    }else{
      this.setData({
        key2: -1,
        sift_time:'时间',
        isb_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        timeStamps:'',
        isLastPage:false,
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          tagName:this.data.tag,
          pageSize:5,
          area:this.data.area,
          joinNum:this.data.joinNum,
          pageNum:this.data.page,
          goDate:'',
        },
        success: (res) => {
          console.log(res.data.data.rooms)
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
    }

  },

  choose3: function (e) {
    if(this.data.key3 != e.currentTarget.dataset.index){
      var joinNum = e.currentTarget.dataset.name[0]
      this.setData({
        key3: e.currentTarget.dataset.index,
        sift_person:e.currentTarget.dataset.name,
        isc_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        isLastPage:false,
        joinNum:joinNum,
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          area:this.data.area,
          pageSize:5,
          tagName:this.data.tag,
          joinNum:this.data.joinNum,
          pageNum:this.data.page,
          goDate:this.data.timeStamps,
        },
        success: (res) => {
          this.setData({
            rooms:res.data.data.rooms.list, 
            isLastPage:res.data.data.rooms.isLastPage,
          })
          console.log(this.data.page)
          for(var i = 0;i < res.data.data.rooms.list.length;i++) {
            var timeStamps = res.data.data.rooms.list[i].goDate;
            var timeString = util.formatString(timeStamps);
            this.setData({
              date:this.data.date.concat(timeString)
            })
          }
        },   
      });
    }else{
      this.setData({
        key3: -1,
        sift_person:'待加入人数',
        isc_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        isLastPage:false,
        joinNum:'',
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          area:this.data.area,
          pageSize:5,
          tagName:this.data.tag,
          joinNum:'',
          pageNum:this.data.page,
          goDate:this.data.timeStamps,
        },
        success: (res) => {
          this.setData({
            rooms:res.data.data.rooms.list, 
            isLastPage:res.data.data.rooms.isLastPage,
          })
          console.log(this.data.page)
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

  choose4: function (e) {
    if(this.data.key4 != e.currentTarget.dataset.index){
      var area = e.currentTarget.dataset.name
      this.setData({
        key4: e.currentTarget.dataset.index,
        sift_place:e.currentTarget.dataset.name,
        isd_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        isLastPage:false,
        area:area,
        
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          area:area,
          pageSize:5,
          tagName:this.data.tag,
          joinNum:this.data.joinNum,
          goDate:this.data.timeStamps,
          pageNum:this.data.page,
        },
        success: (res) => {
          //console.log(res.data.data.rooms)
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
    }else{
      this.setData({
        key4: -1,
        sift_place:'地点',
        isd_show:false,
        shadeshow:false,
        date:[],
        rooms:[],
        page:1,
        isLastPage:false,
        area:'',
      });
      wx.request({
        url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded',},
        data:{
          area:'',
          pageSize:5,
          tagName:this.data.tag,
          joinNum:this.data.joinNum,
          goDate:this.data.timeStamps,
          pageNum:this.data.page,
        },
        success: (res) => {
          //console.log(res.data.data.rooms)
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
    }




  },

  cancel: function () {
    console.log("ok")
    this.setData({
      isd_show: false,
      isa_show: false,
      isb_show: false,
      isc_show: false,
      shadeshow:false,
    });
  },

  onLoad: function () {
    
    var todate = util.formatDate(new Date());
    var date = new Date(todate);
    date.setDate(date.getDate() + 1);
    var date2 = util.formatDate(date);
    date.setDate(date.getDate() + 1);
    var date3 = util.formatDate(date);
    date.setDate(date.getDate() + 1);
    var date4 = util.formatDate(date);
    date.setDate(date.getDate() + 1);
    var date5 = util.formatDate(date);
    date.setDate(date.getDate() + 1);
    var date6 = util.formatDate(date);
    date.setDate(date.getDate() + 1);
    var date7 = util.formatDate(date);
    this.setData({
      ['list2['+1+'].name']:date2,
      ['list2['+2+'].name']:date3,
      ['list2['+3+'].name']:date4,
      ['list2['+4+'].name']:date5,
      ['list2['+5+'].name']:date6,
      ['list2['+6+'].name']:date7,
    });  
    
  },

  onShow: function () {
    //获取房间列表
    this.setData({
      page:1,
      date:[],
      rooms:[],
    })
    wx.request({
      url: 'https://beyond-murder.be.wizzstudio.com/room/getByCondition',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded',},
      data:{
        pageSize:5,
        pageNum:this.data.page,
        tagName:this.data.tag,
        area:this.data.area,
        joinNum:this.data.joinNum,
        goDate:this.data.timeStamps,
      },
      success: (res) => {
        // console.log(res.data.data.rooms)
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
            pageSize:5,
            tagName:this.data.tag,
            area:this.data.area,
            joinNum:this.data.joinNum,
            goDate:this.data.timeStamps,
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

  search: function () {
    wx.navigateTo({
      url: '../search/search',
    });
  },
});
  