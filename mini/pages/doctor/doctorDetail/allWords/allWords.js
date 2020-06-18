// mini/pages/doctor/doctorDetail/goSayWords/goSayWords.js
const db = wx.cloud.database();
const app = getApp()
const util = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1: 0,
    flag2: 0,
    flag3: 0,
    flag4: 0,
    flag5: 0,
    flag6: 0,
    content: ""
  },

  // 星星选中
  changeColor1: function (e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      flag1: e.currentTarget.dataset.index
    });

  },
  changeColor2: function (e) {
    this.setData({
      flag2: e.currentTarget.dataset.index
    });
  },
  changeColor3: function (e) {
    this.setData({
      flag3: e.currentTarget.dataset.index
    });

  },
  changeColor4: function (e) {
    this.setData({
      flag4: e.currentTarget.dataset.index
    });

  },
  changeColor5: function (e) {
    this.setData({
      flag5: e.currentTarget.dataset.index
    });

  },
  changeColor6: function (e) {
    this.setData({
      flag6: e.currentTarget.dataset.index
    });

  },
  contentInput(e) {
    this.data.content = e.detail.value
  },
  check() {
    if (this.data.flag1 == 0) {
      wx.showToast({
        title: '隐私保护未评',
        icon: "none"
      })
    } else if (this.data.flag2 == 0) {
      wx.showToast({
        title: '医师尽则未评',
        icon: "none"
      })
    } else if (this.data.flag3 == 0) {
      wx.showToast({
        title: '专业能力未评',
        icon: "none"
      })
    } else if (this.data.flag4 == 0) {
      wx.showToast({
        title: '医师态度未评',
        icon: "none"
      })
    } else if (this.data.flag5 == 0) {
      wx.showToast({
        title: '医师疗效未评',
        icon: "none"
      })
    } else if (this.data.flag6 == 0) {
      wx.showToast({
        title: '医师用药未评',
        icon: "none"
      })
    } else if (this.data.content == "") {
      wx.showToast({
        title: '描述内容不能为空',
        icon: "none"
      })
    } else {    
      // console.log()
      this.addDb()
    }
    
  },
  // 医生信息加评论内容 取id ,头像 与 昵称 与dept
  addDb() {
    // 计算平均星星
    let endstar = (parseInt(this.data.flag1) + parseInt(this.data.flag2) + parseInt(this.data.flag3) +parseInt(this.data.flag4) + parseInt(this.data.flag5) + parseInt(this.data.flag6))/6
    endstar = endstar.toFixed(2)
    db.collection('evaluate').add({
      data: {
        doctorInfo: {
          _id:this.data.doctorInfo._id,
          name:this.data.doctorInfo.name,
          doctorImg:this.data.doctorInfo.doctorImg
        },
        content: this.data.content,
        createTime: util.nowTime(),
        userInfo: app.globalData.userInfo.userInfo,
        star: {
          flag1: this.data.flag1,
          flag2: this.data.flag2,
          flag3: this.data.flag3,
          flag4: this.data.flag4,
          flag5: this.data.flag5,
          flag6: this.data.flag6,
        },
        endstar: endstar,
        openView: false,
      },
      success:  (res)=> {
        this.setData({
          flag1: 0,
          flag2: 0,
          flag3: 0,
          flag4: 0,
          flag5: 0,
          flag6: 0,
          content: ""
        })
        wx.showToast({
          title: '等审核',
          icon:"success"
        });
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1000)
        

      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doctorInfo = JSON.parse(options.mess)
    // console.log(doctorInfo)
    this.setData({
      doctorInfo: doctorInfo
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

    
    if(!app.globalData.userInfo.userInfo.name){
      wx.showToast({
        title: '请完善个人信息',
        icon:"none"
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/user/userInfo/userInfo',
        })
      }, 1000);
    }
    else{
      this.setData({
        userInfo:app.globalData.userInfo.userInfo
      })
    }
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