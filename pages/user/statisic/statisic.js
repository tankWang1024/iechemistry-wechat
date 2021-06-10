// pages/user/statisic/statisic.js
import Notify from '/@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expNum: 0,
    first_time: "上个世纪",
    imageNum: 0,
    latestExp1: "未知",
    latestExp2: "未知",
    objectNum: 0,
    regionsNum: 0,
    latestExp1_time: "上个世纪",
    latestExp2_time: "上个世纪"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.data.baseUrl + "/statistic",
      method:"GET",
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        let data = res.data.data
        console.log(data)
        if(res.data.code == 1){
          that.setData({
            expNum: data.expNum,
            first_time: data.first_time,
            imageNum: data.imageNum,
            latestExp1: data.latestExp1,
            latestExp2: data.latestExp2,
            objectNum: data.objectNum,
            regionsNum: data.regionsNum,
            latestExp1_time: data.latestExp1_time,
            latestExp2_time: data.latestExp2_time
          })
        }else{
          Notify({ type: 'warning', message: data.message })
        }
        
      }
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

  }
})