// pages/publish/publish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  delete(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },
  beforeRead(event) {
    console.log('beforeRead');
    const {
      file,
      callback = () => {}
    } = event.detail;
    if (file.path.indexOf('jpeg') < 0) {
      wx.showToast({
        title: '请选择jpg图片上传',
        icon: 'none'
      });
      callback(false);
      return;
    }
    callback(true);
  },

  afterRead(event) {
    console.log('afterRead');
    const {
      file,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];

    this.setData({
      [`fileList${name}`]: fileList.concat(file)
    });
    console.log(event.detail.file.path);
    console.log(this.data.fileList[0].path);
  },

  onPublish: function (e) {
    var form = e.detail.value;
    console.log(form);
    var data = {
      title: form.title,
      content: form.content
    }
    if(this.data.fileList[0]){
      app.api.publishQuestion(this.data.fileList[0].path,data).then((data) => {
        console.log(data);
      });
    }else{
      app.api.publish(data).then((data) => {
        console.log(data);
      });
    }

   
  }
})