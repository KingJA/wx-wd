// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onRegister: function (e) {
    console.log(e.detail.value);

    wx.request({
      url: app.globalData.BaseApiUrl+'/user/register', 
      method: 'post',
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res.data)
      }
    })

  },
  goLogin:function(e){
    wx.navigateTo({
      url: '../login/login',
    })
  }

})