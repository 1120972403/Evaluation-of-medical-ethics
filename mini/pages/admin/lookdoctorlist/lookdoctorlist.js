// pages/admin/lookdoctorlist/lookdoctorlist.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goList(e) {
    let _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/doctor/doctorDetail/doctorDetail?_id=' + _id,

    })
  },
  onLoad: function (options) {
    this.getList();
  },
  //获取分类列表
  getList() {

    wx.showLoading({
      title: '加载中...',
    })
    db.collection('doctor').where({}).get({
      success: (res) => {
        console.log(res.data)
        this.setData({
          list: res.data
        })
        wx.hideLoading();
      }
    })
  },
  //删除
  del(e) {
    db.collection('evaluate').where({
      _openid: e.currentTarget.dataset.openid
    }).get({
      success: (res) => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '该类型下面有数据,不可删除',
            icon: 'none'
          })
        } else {

          //先判断是都有他的评论，没有的话就可以删除

          wx.showModal({
            content: '确定要删除这位医生吗？删除不可恢复',
            cancelText: '点错了',
            confirmText: '再见',
            success: res => {
              if (res.confirm) {
                var id = e.currentTarget.dataset.id;
                db.collection('doctor').doc(id).remove({
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
        }

      }
    })


  },
})