// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    questionList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.totalCount += subjects.length;
    this.getQuestions(this.data.pageIndex,this.data.pageSize);


  },

  getQuestions: function (pageIndex, pageSize) {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    app.api.getQuestions(data).then((data) => {
      console.log(data);
      var newQuestionList = this.data.questionList.concat(data);
      this.setData({
        questionList: newQuestionList
      });

    });

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉触底事件');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPublish: function (e) {

    wx.navigateTo({
      url: '../publish/publish',
    })
  }
})