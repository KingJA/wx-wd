import base from './base.js';

//封装GET请求
function get(url,data) {
  //为了用户体验，加一个loading效果
  console.log('get 请求参数:>>>>>');
  console.log(data);
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise((resolved, rejected) => {
    const obj = {
      url: base.baseUrl + url,
      data,
      header: {
        'content-type': 'application/json',
        'token':  getToken()
      },
      method: 'GET',
      success: (res) => {
        if (res.data.code === 0) {
          resolved(res.data.data)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
          rejected(res.data)
        }
      },
      fail: (err) => rejected(err),
      complete: () => {
        wx.hideLoading();
      }
    }
    wx.request(obj)
  })

}

//封装POST请求
function post(url, data) {
  console.log('post 请求参数:>>>>>');
  console.log(data);
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  var token = getToken();
  return new Promise((resolved, rejected) => {
    const obj = {
      url: base.baseUrl + url,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code === 0) {
          resolved(res.data.data)
        } else {
          showToast(res.data.msg);
          rejected(res.data);
        }
        console.log("success");
      },
      fail: (err) => {
        showToast(res.data.msg);
        rejected(err)
        console.log("fail");
      },
      complete: () => {
        wx.hideLoading();
        console.log("complete");
      }
    }
    wx.request(obj)
  })

}

function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'none'
  });
}

function getToken() {
  var app = getApp();
  var userInfo = app.globalData.userInfo;
  var result = userInfo ? userInfo.token : "";
  console.log('result');
  console.log(result);
  return result;
}



//导出封装的_post方法
export default {
  post,
  get
}