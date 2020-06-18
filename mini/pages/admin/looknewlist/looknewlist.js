// pages/admin/looknewlist/looknewlist.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
    this.getList();
  },
  goList(e){
    let _id= e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail?_id='+_id,
    
    })
  },
  //获取分类列表
  getList() {

    wx.showLoading({
      title: '加载中...',
    })
    db.collection('news').where({
    }).get({
      success:  (res)=> {
        // console.log(res.data)
        this.setData({
          list: res.data
        })
        wx.hideLoading();
      }
    })
  },
  //删除
  del(e) {
    wx.showModal({
      content: '确定要删除这位医生吗？删除不可恢复',
      cancelText: '点错了',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id;
          db.collection('news').doc(id).remove({
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
})