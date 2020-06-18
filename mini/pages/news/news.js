// mini/pages/news/news.js
const db = wx.cloud.database();
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_width: app.globalData.Width,
    newsType: [
    ],
    doctorList: [
          ],
    flag: '全部',

  },
  //获取新闻分类列表
  newsType() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('news_kind').where({}).get({
      success: (res) => {      
        let newsType=[]
        for(var i=0;i<res.data.length;i++){
          newsType[0]="全部";
          newsType[i+1]=res.data[i].title
        }
        this.setData({
          newsType: newsType
        })
        wx.hideLoading();
      }
    })
 
  },

// 新闻详情
showNewsDetail(e){
  // console.log(e)
  let id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/newsdetail/newsdetail?_id='+id,
  })
},

// 默认选择类型
defaultSelect(e){
  this.setData({
    flag: e.type
  })
},
  // 选择分类
  selectType(e) {
    let id = e.currentTarget.id;
    console.log(this.data.newsType[id])
    this.setData({
      flag: this.data.newsType[id]
    })

    this.getType(this.data.newsType[id])
  },

  // 获取简单的
  getType(kind) {
    if (kind == "全部") {
      this.getALL();
      return
    }
    db.collection("news").where({
      kind: kind
    })
      .orderBy('createTime', 'desc')
      .limit(10) // 限制返回数量为 10 条
      .get({
        success: (e) => {

          this.setData({
            page: 0,
            ["list[0]"]: e.data
          })
          console.log(e.data)
          wx.hideLoading()
        }
      })
  },

getALL(){
  db.collection("news").limit(10) // 限制返回数量为 10 条
  .orderBy('createTime', 'desc')
  .get({
    success:  (e)=> {
      this.setData({
        page: 0,
        ["list[0]"]: e.data
      })
      // console.log(e.data)
      wx.hideLoading()
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)

    this.newsType()
    this.defaultSelect(options);
    this.getType(options.type)
    
  },
  onReachBottom() {
    this.bottom();
  },
  //触底加载
  bottom() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var page = that.data.page + 10;
    db.collection('news').where({
    })
      .skip(page) // 跳过结果集中的前(page)条，从第(page+1) 条开始返回
      .limit(10) // 限制返回数量为 10 条
      .orderBy('createTime', 'desc')
      .get({
        success(e) {
          wx.hideLoading();
          if (e.data == "") {
            wx.showToast({
              title: '已加载到底',
            });
            return false;
          }
          that.setData({
            page: page,
            ["list[" + page + "]"]: e.data
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})