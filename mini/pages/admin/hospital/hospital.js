// pages/admin/hospital/hospital.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastCover: "",
    cover: '',
    des: '',
    list: ''
  },
  //选择医院logo
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths[0];
        this.setData({
          cover: tempFilePaths
        })
      }
    })
  },
  // 内容输入
  desInput(e) {
    this.data.des = e.detail.value
  },
  nameInput(e){
    this.data.name = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  // 提交数据
  check(e) {
    this.setData({
      _id: e.currentTarget.dataset.id
    })
    if (this.data.cover == '') {
      wx.showToast({
        title: '请输入医院logo',
        icon: 'none'
      })
    } else if (this.data.des == '') {
      wx.showToast({
        title: '请输入医院简介',
        icon: 'none'
      })
    } else {
      this.upload();
    }
  },

  //图上传云存储
  upload() {

    wx.showLoading({
      title: '保存中',
    });
    if (this.data.lastCover == this.data.cover) {
      this.addDb();
    } else {
      wx.cloud.uploadFile({
        cloudPath: 'hospital_logo' + (new Date().getTime()),
        filePath: this.data.cover,
        success: res => {
          this.setData({
            cover: res.fileID
          })
          this.addDb();
        },
        fail: res => {
          console.log(res)
        }
      })
    }

  },
  //保存到数据库
  addDb() {
    var _id = "f2a60d815ed0cb8800005e333eb944c8"
    db.collection('hospital_intro').doc(_id).update({
      // data 传入需要局部更新的数据
      data: {
        cover: this.data.cover,
        des: this.data.des,
        name: this.data.name,
      },
      success: () => {
        wx.showToast({
          title: '添加成功'
        })
        this.getList()
      },
      fail: console.error
    })


  },
  //获取内容
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('hospital_intro').get({
      success: (res) => {

        this.setData({
          list: res.data,

          des: res.data[0].des,
        })
        if (this.data.list != '') {
          this.setData({
            cover: res.data[0].cover,
            lastCover: res.data[0].cover,
            name:res.data[0].name,
          })
        }
        wx.hideLoading();
      }
    })
  },
})