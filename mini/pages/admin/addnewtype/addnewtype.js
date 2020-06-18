// pages/admin/addnewtype/addnewtype.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    des: '',
    addModel: true
  },
  showModal(e) {
    this.setData({
      addModel: false
    })
  },
  hideModal(e) {
    this.setData({
      addModel: true
    })
  },
  //标题输入
  titleInput(e) {
    this.data.title = e.detail.value
  },
  //描述输入
  desInput(e) {
    this.data.des = e.detail.value
  },
  //保存校检
  add() {
    if (this.data.title == "") {
      wx.showToast({
        title: '标题不能空',
        icon:'none'
      })
    } else if(this.data.des == ""){
      wx.showToast({
        title: '标题不能空',
        icon:'none'
      })
    }
    else {
      this.addDb();
    }
  },
  // 上传数据库
  addDb() {
    db.collection('news_kind').add({
      data: {
        title: this.data.title,
        des: this.data.des,
        createTime: (new Date()).getTime(),
      },
      success: (res) => {
        this.setData({
          addModel: true,
          title: "",
          des: '',
          poster: ''
        })
        wx.hideLoading();
        this.getList();
      },
    })
  },
  //获取分类列表
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('news_kind').where({}).get({
      success: (res) => {
        this.setData({
          list: res.data
        })
        wx.hideLoading();
      }
    })
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  //删除
  del(e) {
    // 先检查该类别下有没有数据 有数据不可删除
    db.collection('news').where({
      kind: e.currentTarget.dataset.kind
    }).get({
      success: (res) => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '该类型下面有数据,不可删除',
            icon:'none'
          })
        } else {

          wx.showModal({
            content: '确定要删除吗？删除不可恢复',
            cancelText: '点错了',
            confirmText: '再见',
            success: res => {
              if (res.confirm) {
                var id = e.currentTarget.dataset.id;
                db.collection('news_kind').doc(id).remove({
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