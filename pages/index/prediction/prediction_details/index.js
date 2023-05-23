// pages/index/prediction/prediction_details/index.js
const {$ajax} = require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    formula: {},
    iecExpPredict: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.obj
    let that=  this
    let res = JSON.parse(data)
    console.log(res)
    // a b变换
    res.formula.b = -1 * res.formula.b / res.formula.a
    res.formula.b = res.formula.b.toFixed(4)
    res.formula.a = 1 / res.formula.a
    res.formula.a = res.formula.a.toFixed(4)
    this.setData({
      formula:res.formula,
      iecExpPredict:res.iecExpPredict
    })
    let imageid = this.data.iecExpPredict.imageid

    $ajax("/image","GET",{
      imageid:imageid
    }).then(img=>{
      console.log(img)
      that.setData({
        url:img.image.url
      })
    })

    // else
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