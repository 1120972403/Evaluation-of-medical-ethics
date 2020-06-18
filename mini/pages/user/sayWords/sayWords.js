var app = getApp();
const db = wx.cloud.database();
const util = require("../../../utils/util.js");
Page({

  data: {
    replyContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.add()
    this.getList();
    this.setData({
      userInfo: app.globalData.userInfo.detail
    });
  },
  //获取列表
  getList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('evaluate').where({
      _openid:app.globalData.userInfo._openid
    })
      .limit(10) // 限制返回数量为 10 条
      .orderBy('createTime', 'desc')
      .get({
        success: function (e) {
          // console.log(e)
          that.setData({
            page: 0,
            ["list[0]"]: e.data
          })
          // console.log(e.data)
          wx.hideLoading()
        }
      })
  },
  //设置状态
  verify(e) {
    let _id= e.currentTarget.dataset.id
    var set= e.currentTarget.dataset.set
    var reg = RegExp(/true/);
    var set = reg.test(set);//将字符串转boolean
    db.collection('evaluate').doc(_id).update({
      data: {
        openView: set
      },
      success:(res)=>{
        this.getList();
      }
   })
   
  },

    //删除列表
    delCard(e) {
      wx.showModal({
        content: '确定要删除这条评论吗？',
        cancelText: '点错了',
        confirmText: '再见',
        success: res => {
          if (res.confirm) {
            var id = e.currentTarget.dataset.id;
            db.collection('evaluate').doc(id).remove({
              success: (res) => {
                wx.showToast({
                  title: '删除成功',
                })
                this.getList();
              }
            })
          }
        }
      })
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
    db.collection('evaluate').where({ 
      _openid:app.globalData.userInfo._openid
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
})