// mini/pages/news/newsDetail/newsDetail.js
const app=getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_collect: false
  },
  //获取文章详情
  details(id) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    db.collection('news').doc(id).get({
      success: function (res) {
        // console.log(res)
        that.setData({
          details: res.data
        });
        wx.setNavigationBarTitle({
          title: res.data.title,
        });
        wx.hideLoading();
      }
    })
  },
  // 是否收藏
  isCollect(){
    if(!app.globalData.userInfo.userInfo.name){
      wx.showToast({
        title: '请完善个人信息',
        icon:"none"
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/user/userInfo/userInfo',
        })
      }, 1000);

      return
    }
    this.setData({
      is_collect: !this.data.is_collect
    })
    if(this.data.is_collect){
 
      db.collection('stores').add({
        data: {
          content: this.data.details,
          createTime: (new Date()).getTime(),
        },
        success: (res) => {
          this.setData({
           pub_id: res._id
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            mask: true,
            duration: 500
          })
        },
      })
 
    }else{
      if(this.data.pub_id!=0){
        db.collection('stores').doc(this.data.pub_id).remove({
          success: function(res) {
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              mask: true,
              duration: 500
            })
          }
        })
      }
   
   
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    


      this.details( options._id)
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
