// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_admin:false,
    column: [
      { icon: 'cuIcon-comment text-blue', text: '我的信息', url: './userInfo/userInfo'},
      { icon: 'cuIcon-evaluate text-olive', text: '我的评价', url: './sayWords/sayWords' },
      { icon: 'cuIcon-form text-gray', text: '我的收藏', url: './collect/collect' },
      { icon: 'cuIcon-question text-green', text: '问题反馈', url: './feedback/feedback' },
    ]
  },

  //切换页面
  go(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url:  this.data.column[id].url,
    })
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
      if(app.globalData.userInfo&&app.globalData.userInfo.admin){
        this.setData({
          is_admin:app.globalData.userInfo.admin
        })
      }
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