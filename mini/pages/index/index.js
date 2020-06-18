//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    goodDoctor: [{
      image: '',
      name: '王医师',
      post: '副主任医师',
      hospitalPost: '三甲',
      hospitalName: '四川省中医医院',
      department: '妇产科',
      consult: '366'
    }]
  },

  // 医生评价
  goSayWords(e) {
    // console.log(e.currentTarget.dataset.id)
    let _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/doctor/doctorDetail/doctorDetail?_id=' + _id,

    })
  },

  // 医院简介
  showDes() {
    wx.navigateTo({
      url: '../hospitalDetail/hospitalDetail',
    })
  },

  // 院内新闻
  goNews(e){
    let id = e.currentTarget.id;
    // console.log(id);
    // console.log(this.data.newsType[id].title)
    // return
    wx.navigateTo({
      url: '../news/news?type=' + this.data.newsType[id].title,
    })
  },

  //获取新闻分类列表
  newList() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('news_kind').where({}).get({
      success: (res) => {
        // console.log(res)
        this.setData({
          newsType: res.data
        })
        wx.hideLoading();
      }
    })
    
    wx.hideLoading();
  },

  // 请求热度前三
  getViewNum() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('doctor').where({

      }).limit(3) // 限制返回数量为3 条
      .orderBy('viewNum', 'desc').get({
        success: (res) => {
          // console.log("返回", res.data)
          this.setData({
            viewList: res.data
          })
          wx.hideLoading();
        }
      })
  },


  // 获取医院介绍等信息
  //获取内容
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('hospital_intro').get({
      success: (res) => {
        // console.log(res.data)
        this.setData({
          hislist: res.data
        })
        wx.hideLoading();
      }
    })
  },

  onLoad: function () {
    this.getList();
    this.newList();
    this.login();
    this.getViewNum()
  },

  onShow: function(){
    this.onLoad();
  },

  login() {
    // 获取用的openid，并存入数据库
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log(res.result.openid)

        db.collection('user').where({
            _openid: res.result.openid
          })
          .get({
            success: (res) => {
              // console.log(res)
              if (res.data.length > 0) {
                //这里查的是数据信息 需要存一条就行
                var userInfo = res.data[0]
                wx.setStorageSync('userInfo', userInfo);
                app.globalData.userInfo = userInfo;
              } else {
                db.collection('user').add({
                  data: {
                    userInfo: {},
                    admin: false,
                    creatTime: (new Date()).getTime(),
                  },
                  success: (res) => {
                    // console.log("存入成功")
                    this.login()
                  },
                })
              }
            }
          })
      }
    })

  }
})