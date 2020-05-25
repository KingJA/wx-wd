import base from './base.js';
//封装GET请求
function get({
  url,
  data
}) {
  //为了用户体验，加一个loading效果

  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise((resolved, rejected) => {
    const obj = {
      url: base.baseUrl + url,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        if (res.data.code === 0) {
          resolved(res.data)
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
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise((resolved, rejected) => {
    const obj = {
      url: base.baseUrl + url,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
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




//导出封装的_post方法
export default {
  post,
  get
}