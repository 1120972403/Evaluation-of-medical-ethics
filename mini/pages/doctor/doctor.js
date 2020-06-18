// pages/doctor/doctor.js
const db = wx.cloud.database();
 const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_width: app.globalData.Width
  },
  // 查看详情
  showDoctorDetail(e){
    // console.log(e)
    let _id= e.currentTarget.dataset.id;
    // 传递ID进行跳转
    wx.navigateTo({
      url: './doctorDetail/doctorDetail?_id='+_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  //获取分类列表
  getList() {

    wx.showLoading({
      title: '加载中...',
    })
    db.collection('doctor').where({
    })
      .limit(10) // 限制返回数量为 10 条
      .orderBy('viewNum', 'desc')
      .get({
        success: (e) =>{
          console.log(e)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
  },

  onReachBottom() {
    this.bottom();
  },
   //触底加载
   bottom() {
   
    wx.showLoading({
      title: '加载中',
    })
    var page = this.data.page + 10;
    db.collection('doctor').where({
    })
      .skip(page) // 跳过结果集中的前(page)条，从第(page+1) 条开始返回
      .limit(10) // 限制返回数量为 10 条
      .orderBy('viewNum', 'desc')
      .get({
        success:(e)=> {
          wx.hideLoading();
          if (e.data == "") {
            wx.showToast({
              title: '已加载到底',
            });
            return false;
          }
          this.setData({
            page: page,
            ["list[" + page + "]"]: e.data
          })
        }
      })
  },
})