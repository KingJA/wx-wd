// pages/login/login.js
var app = getApp();
Page({

  data: {

  },
  onLogin: function (e) {
    var data = {
      username: e.detail.value.username,
      password: e.detail.value.password
    }
    app.api.login(data).then((data) => {
      console.log(data);
     
      app.setUserInfo(data);
      wx.navigateBack({
        delta: 1 //返回上1级
      });
    });
  

  },
  goRegister: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})