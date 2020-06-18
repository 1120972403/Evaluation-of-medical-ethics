// pages/doctor/doctorDetail/allcomments/allcomments.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 获取评论列表
    // console.log(options)
  db.collection("evaluate").where({
    openView:true,
    doctorInfo:{
      _id:options._id
    }
  })
  .get({
    success: (res)=> {
      // console.log("ssss",res.data)
      for(var i=0;i<res.data.length;i++){
        res.data[i].userInfo.name=res.data[i].userInfo.name.substr(0, 1)
      }
      this.setData({
        commList: res.data
      })
      wx.hideLoading();
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