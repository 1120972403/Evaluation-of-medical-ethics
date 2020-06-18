// mini/pages/user/feedback/feedback.js
const db = wx.cloud.database();
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:""
  },
  contentInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 新增信息
  add(){
    
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
    else if(this.data.content==""){
      wx.showToast({
        title: '你尚未输入内容',
        icon:"none"
      })
    }
    else{
      // console.log(1111)
        // 上传数据库
        db.collection('commets').add({
          data: {
            content: this.data.content,
            createTime: (new Date()).getTime(),
          },
          success: (res) => {
            wx.showToast({
              title: '提交成功',
            })
            this.setData({
             content:""
            })
            
          },
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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