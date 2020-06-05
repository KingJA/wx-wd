// pages/search/search.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasWord:false,
    keyword:'',
    pageIndex: 0,
    pageSize: 10,
    questionList: []

  },
  inputKeyword: function (e) {
    var keyword=e.detail.value;
    this.setData({
      hasWord:keyword.length>0,keyword
    });
    console.log(keyword);
    

  },
  search: function (e) {
    if(this.data.keyword.length==0){
      wx.showToast({
        title: '请输入关键字',
        icon:'none'
      });
      return;
    }
    this.getQuestions(this.data.keyword,this.data.pageIndex, this.data.pageSize);

  },
  getQuestions: function (keyword,pageIndex, pageSize) {
    var data = {
      keyword,
      pageIndex,
      pageSize
    };
    app.api.searchQuestions(data).then((data) => {
      console.log(data);
      var newQuestionList = this.data.questionList.concat(data);
      this.setData({
        questionList: newQuestionList
      });

    });

  },
  clearKeyword: function (e) {

    this.setData({
      hasWord:false,
      keyword:'',
      pageIndex: 0,
      questionList: []
    });
 
  },
  onQuestionDetail: function (event) {
    var questionId = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: "../detail/detail?id=" + questionId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})