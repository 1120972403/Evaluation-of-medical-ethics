const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {
      openView: true,
      painting: {},
    },
    randNum: '',
    commentInput: '',
    inputfocus: true,
  },
  goComments(e) {
    // 去评论,并携带医生信息
    wx.navigateTo({
      url: '/pages/doctor/doctorDetail/allWords/allWords?mess=' + JSON.stringify(e.currentTarget.dataset.mess),
    })

  },
  all() {
    // console.log(this.data._id)
    wx.navigateTo({
      url: "/pages/doctor/doctorDetail/allcomments/allcomments?_id=" + this.data._id,
    })

  },
  // 获取评论列表
  getComments(id) {
    // console.log(id)
    db.collection("evaluate").where({
        openView: true,
        doctorInfo: {
          _id: id
        }
      }).limit(5)
      .get({
        success: (res) => {
          // console.log(res.data)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options",options)
    this.setData({
      _id: options._id
    })


  },
  //获取医生详细
  getDeatil(id) {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('doctor').where({
      _id: id
    }).get({
      success: (res) => {

        this.setData({
          detail: res.data
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
    // 查询医生详细 且每次查询之前对该医生viewNum+1  ------未完
    this.getDeatil(this.data._id);
    // 查询患者评价
    this.getComments(this.data._id)
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