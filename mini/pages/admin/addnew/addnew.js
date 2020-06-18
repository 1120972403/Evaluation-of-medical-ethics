const app = getApp();
const db = wx.cloud.database();
const util = require("../../../utils/util.js");
Page({

  data: {
   
    preContent: false,
    cover:'',
    content:'',
    des:'',
    title:''
  },

  onLoad: function (options) {
    this.getKind();
  },

  //获取分类。
  getKind() {
    db.collection('news_kind').get({
      success:  (res) =>{
        // console.log(res.data)
        this.setData({
          kindList: res.data,
          kind: res.data[0].title//设置默认类别
        })
      }
    })
  },
  //选择分类
  kindChange: function (e) {
    
    this.setData({
      kind: this.data.kindList[e.detail.value].title
    });
  },

  //获取剪切板
  stick() {
    wx.getClipboardData({
      success:(res)=> {
        this.setData({
          content: res.data
        })
      }
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
  //内容输入
  contentInput(e) {
    this.data.content = e.detail.value;
  },
  //内容校检
  check() {
    if (this.data.title=='') {
      wx.showToast({
        title: '标题不得为空',
      })
    } else if (this.data.des == '') {
      wx.showToast({
        title: '描述不得为空',
      })
    } else if (this.data.cover=='') {
      wx.showToast({
        title: '请选择封面',
      })
    } else {
      this.upload();
    }
  },
  //选择封面图
  chooseImg() {
   
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success:(res)=> {
        var tempFilePaths = res.tempFilePaths[0];
        this.setData({
          cover: tempFilePaths
        })
      }
    })
  },
  //预览图
  previewImg(e) {
    var e = e.currentTarget.dataset.img;
    wx.previewImage({
      urls: e.split(",")
    });
  },
  //封面图上传云存储
  upload() {
  
    wx.showLoading({
      title: '保存中',
    });
    wx.cloud.uploadFile({
      cloudPath: 'cover/' + (new Date().getTime()),
      filePath: this.data.cover,
      success: res => {
      this.setData({
          coverUrl: res.fileID
        })
        this.addDb();
      },
      fail:res=>{
        // console.log(res)
      }
    })
  },
  //保存到数据库
  addDb() {
    db.collection('news').add({
      data: {
        title: this.data.title,
        kind: this.data.kind,
        des: this.data.des,
        cover: this.data.coverUrl,
        content: this.data.content,
        createTime: (new Date()).getTime(),
        date:util.nowTime()
      },
      success: res => {
        this.setData({
          title:"",
          kind:"",
          des:"",
          cover:"",
          content:""
        })
        var published_id = res._id;
        wx.hideLoading();
        wx.showModal({
          title: '保存成功',
          content: '是否跳转到详情页？',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/newsdetail/newsdetail?_id=' + published_id,
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
    })
  },
})