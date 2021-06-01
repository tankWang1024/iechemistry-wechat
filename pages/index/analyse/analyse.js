// pages/index/analyse/analyse.js
const citys = {
  浓度: ['R', 'G', 'B', 'H', 'S','V'],
  // 福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    columns: ['SVM'],
    method_show:false,
    params_show:false,
    two_columns:[
      {
        values: Object.keys(citys),
        className: 'column1',
      },
      {
        values: citys['浓度'],
        className: 'column2',
        defaultIndex: 0,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toShow(){
    wx.navigateTo({
      url: '/pages/index/details/details',
    })
  },
  onChangeMethod(event) {
    const { picker, value, index } = event.detail;
  },
  onChangeParams(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
  onCloseMethod(){
    this.setData({
      method_show:false
    })
  },
  onCloseParams(){
    this.setData({
      params_show:false
    })
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

  },
  selectMethod(){
    this.setData({
      method_show:true
    })
  },
  selectParams(){
    this.setData({
      params_show:true
    })
  },
})