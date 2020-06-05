// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    questionList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.totalCount += subjects.length;
    this.getQuestions(this.data.pageIndex, this.data.pageSize);
  },
  getQuestions: function (pageIndex, pageSize) {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    app.api.getQuestions(data).then((data) => {
      console.log(data);
      if (pageIndex == 0) {
        wx.stopPullDownRefresh();
      }
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
    console.log('下拉刷新');
    this.data.pageIndex = 0;
    this.data.questionList = [];
    this.getQuestions(this.data.pageIndex, this.data.pageSize);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载');
    this.data.pageIndex++;
    this.getQuestions(this.data.pageIndex, this.data.pageSize);
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
  },
  onQuestionDetail: function (event) {
    var questionId = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: "../detail/detail?id=" + questionId
    })
  },
  goSearchPage: function (event) {
    wx.navigateTo({
      url: "../search/search"
    })
  }
})