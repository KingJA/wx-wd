// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasLogined: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasLogined: (app.globalData.UserInfo != null)
    })

    var faceUrl = "";
    var username = "";
    if (this.data.hasLogined) {
      faceUrl = "/images/avatar/ic_face.png"
      username = "游客";
    } else {
      faceUrl = app.globalData.BaseResUrl + app.globalData.UserInfo.faceUrl;
      username = app.globalData.UserInfo.username;
    }


    this.setData({
      userInfo: {
        username,
        faceUrl
      }
    })
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
                username: app.globalData.UserInfo.username,
                faceUrl: app.globalData.BaseResUrl + url
              }
            })

          }
        })
      }
    })
  }
})