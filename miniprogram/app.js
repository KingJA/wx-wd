//app.js
import api from './utils/api.js';
import base from './utils/base.js';

App({

  globalData: {
    BaseApiUrl: "http://localhost:8080",
    BaseResUrl: "http://localhost:8080/upload",
    userInfo: null,
    hasLogined: false
  },
  api,
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    var userInfo = this.getUserInfo();
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }




    //  // 登录
    //  wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log("登录");
    //     console.log(res);
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log("获取用户信息");
    //           console.log(res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });


  },
  getwholeUrl: function (url) {
    return base.baseResUrl + url;
  },
  setUserInfo: function (userInfo) {
    
    this.globalData.userInfo = {
      username: userInfo.username,
      faceUrl: userInfo.faceUrl,
      token: userInfo.token
    };
    wx.setStorageSync("userInfo", this.globalData.userInfo);
    console.log(this.globalData.userInfo);
  },
  getUserInfo: function () {
    try {
      var userInfo = wx.getStorageSync('userInfo')
    } catch (e) {
      console.log('读取userInfo发生错误')
    }
    console.log(userInfo);
    return userInfo;
  }
})