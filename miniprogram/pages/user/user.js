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
    if (this.data.hasUserInfo) {
      wx.removeStorageSync('userInfo');
      app.globalData.userInfo = null;
      this.setData({
        userInfo: {
          username: '游客',
          faceUrl: '/images/avatar/ic_face.png'
        },
        hasUserInfo: false
      });
    } else {
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

        app.api.changeFace(tempFilePaths[0]).then((data) => {
          console.log(data);
          this.setData({
            userInfo: {
              username: app.globalData.userInfo.username,
              faceUrl: data
            }
          })

        });

      }
    })
  },

  onShow: function () {
    this.refreshLoginStatus();
  },

  goCollectedQuestionsPage: function () {
    wx.navigateTo({
      url: '../collectedQuestions/collectedQuestions',
    })
  },

})