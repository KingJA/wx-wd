// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLogin: function (e) {
    wx.request({
      url: app.globalData.BaseApiUrl + '/user/login',
      method: 'post',
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.code == 0) {
          app.globalData.UserInfo = res.data.data;

          wx.navigateTo({
            url: '../user/user'
          });
   
          console.log(app.globalData.UserInfo);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },
  goRegister: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})