// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      username: '游客',
      faceUrl: '/images/avatar/ic_face.png'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  loginOrQuit: function (e) {
    if(this.data.hasUserInfo){
      wx.removeStorageSync('userInfo');
      app.globalData.userInfo=null;
      this.setData({
        userInfo: {
          username: '游客',
          faceUrl: '/images/avatar/ic_face.png'
        },
        hasUserInfo: false
      });
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshLoginStatus();
  },
  refreshLoginStatus: function (e) {
    var userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
  },

  changeFace: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.uploadFile({
          url: app.globalData.BaseApiUrl + '/user/changeFace?userId=' + app.globalData.UserInfo.userId,
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            const url = JSON.parse(res.data).data;
            console.log(url);
            this.setData({
              userInfo: {
                username: app.globalData.userInfo.username,
                faceUrl: app.globalData.BaseResUrl + url
              }
            })

          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('user onShow');
    this.refreshLoginStatus();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },
})