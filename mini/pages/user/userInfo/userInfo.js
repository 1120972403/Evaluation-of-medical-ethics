// mini/pages/user/userInfo/userInfo.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1589182247&di=3b4c2bda90daec2c0ff73b594e3d9f14&src=http://bpic.588ku.com/element_origin_min_pic/17/01/04/af1981649b3cf7e40b3694573b1afba4.jpg',
    name: "",
    age: "",
    address: "",
    phone: "",
    flag:false
  },
  nameInput(e) {
    this.data.name = e.detail.value
  },
  ageInput(e) {
    this.data.age = e.detail.value
  },
  addressInput(e) {
    this.data.address = e.detail.value
  },
  phoneInput(e) {
    this.data.phone = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的资料',
    })
  },
  update(){
      wx.showToast({
        title: '请开始你的修改',
      })
      this.setData({
        flag:false
      })
  },
  // 检查数据
  check() {
    if (this.data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
    } else if (this.data.age == "") {
      wx.showToast({
        title: '年龄不能为空',
        icon: "none"
      })
    } else if (this.data.address == "") {
      wx.showToast({
        title: '地址不能为空',
        icon: "none"
      })
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '电话不能为空',
        icon: "none"
      })
    } 
    else if ( !(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号码有误',
        icon: "none"
      })
    } 
    else {
      this.updateInfo()
    }
  },
  updateInfo() {
    let _id = app.globalData.userInfo._id
    // console.log(_id)
    db.collection('user').doc(_id).update({
      data: {
        userInfo: {
          name: this.data.name,
          age: this.data.age,
          address: this.data.address,
          phone: this.data.phone
        }
      },
      success: (res) => {
        // 查询一下并记录下来
        db.collection("user").doc(_id).get({
          success: (res) => {
            // res.data 包含该记录的数据
            // console.log(res.data)
            var userInfo = res.data
            wx.setStorageSync('userInfo', userInfo);
            app.globalData.userInfo = userInfo;
          }
        })
        // console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: "none"
        });
        setTimeout(()=>{
          wx.navigateBack({
            delta:1
          })
        },1000)
       

      },
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
  // 查询一下有没有这个人的信息
    if(app.globalData.userInfo.userInfo.name){
      var userInfo = app.globalData.userInfo.userInfo
      this.setData({
        name:userInfo.name,
        age:userInfo.age,
        address:userInfo.address,
        phone:userInfo.phone,
        flag:true
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