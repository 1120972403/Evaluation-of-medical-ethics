const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    dept:'',
    major:'',
    hospital:'',
    office:'',
    des:'',
    cover:'',
  },
  //姓名输入
  titleName(e) {
    this.data.name = e.detail.value
  },
   //职称输入
   titleDept(e) {
    this.data.dept = e.detail.value
  },
   //专业擅长输入
   titleMajor(e) {
    this.data.major = e.detail.value
  },
   //医院输入
   titleHospital(e) {
    this.data.hospital = e.detail.value
  },
  // 科室输入
  titleOffice(e) {
    this.data.office = e.detail.value
  },
  //医生描述
  desInput(e) {
    this.data.des = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function (options) {
    // 生成随机数
    let viewNum = this.random(500, 2000)
    this.setData({
      viewNum: viewNum
    })
  },
 //内容校检
 check() {

  if (this.data.name=='') {
    wx.showToast({
      title: '姓名不得为空',
      icon:'loading'
    })
  } else if (this.data.dept=='') {
    wx.showToast({
      title: '职称不得为空',
      icon:'loading'
    })
  }  else if (this.data.major=='') {
    wx.showToast({
      title: '专业擅长不能为空',
      icon:'loading'
    })
  } else if (this.data.des == '') {
    wx.showToast({
      title: '描述不得为空',
      icon:'loading'
    })
  }   else if (this.data.hospital=='') {
    wx.showToast({
      title: '医院名称不能为空',
      icon:'loading'
    })
  }
  else if (this.data.office=='') {
    wx.showToast({
      title: '科室不能为空',
      icon:'loading'
    })
  }else if (this.data.cover=='') {
    wx.showToast({
      title: '医生照片不能为空',
      icon:'loading'
    })    
  } 
   else {
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
//医生头像上传云存储
upload() {
  wx.showLoading({
    title: '保存中',
  });
  wx.cloud.uploadFile({
    cloudPath: 'doctor/' + (new Date().getTime()),
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
// 生成随机数

random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},

//保存到数据库
addDb() {
  db.collection('doctor').add({
    data: {
      name: this.data.name,
      dept: this.data.dept,
      major: this.data.major,
      hospital: this.data.hospital,
      office: this.data.office,
      des: this.data.des,
      viewNum:this.data.viewNum,
      doctorImg: this.data.coverUrl,
      createTime: (new Date()).getTime(),
    },
    success: res => {
      this.setData({
        name:"",
        dept:"",
        major:"",
        hospital:"",
        office:"",
        des:"",
        cover:""
      })
      var published_id = res._id;
      wx.hideLoading();
      wx.showModal({
        title: '保存成功',
        content: '是否跳转到详情页？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/doctor/doctorDetail/doctorDetail?_id=' + published_id,
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