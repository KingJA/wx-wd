// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionDetail: {},
    comments:[],
    collected:false,
    questionId:'',
    content:'',
    showLoading:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var questionId = options.id;
    this.data.questionId=questionId;
    console.log("questionId:" + questionId);
    // this.getQuestionDetail('29080d07aa9d45be956e6b337c06eee6');
    this.getQuestionDetail(questionId);

  },

  getQuestionDetail: function (questionId) {
    app.api.getQuestionDetail({
      questionId
    }).then((data) => {
      console.log(data);
      this.setData({
        questionDetail: data,
        comments:data.comments,
        collected:data.collected
      });
    });

  },


  collect: function (e) {
   var collected= e.currentTarget.dataset.collected;
    console.log(collected);

    app.api.collectQuestion({
      questionId:this.data.questionId,collected
    }).then((data) => {
      console.log(data);
      this.setData({
        collected: data
      });
    });



  },
  saveContent: function (e) {
    var content = e.detail.value;
    console.log(content);
    this.setData({
      content
    });

  },
  comment: function (e) {
    console.log(this.data.content);
    app.api.comment({
      content:this.data.content,questionId:this.data.questionId
    }).then((data) => {
      console.log(data);
     
    });

  },
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