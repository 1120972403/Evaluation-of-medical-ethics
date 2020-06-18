// mini/pages/user/collect/collect.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_flag: true,
    have_collect: false
  },
go(e){
  let _id= e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/newsdetail/newsdetail?_id='+_id,
  
  })
},
  // 是否取消收藏
  isColloct(e){
    this.setData({
      collect_flag: false
    })
    let _id= e.currentTarget.dataset.id;
    db.collection('stores').doc(_id).remove({
      success: (res)=> {
        wx.showToast({
          title: '取消收藏成功',
        })
        this.onLoad()
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList()
  },
getList(){
  db.collection("stores").where({
    _openid:app.globalData.userInfo._openid
  }).get({
    success:(res) =>{
      // res.data 是包含以上定义的两条记录的数组
      // console.log(res.data)
      if(res.data.length != 0){
        this.setData({
          have_collect: true,
          storelist: res.data
        })
      }

      
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
