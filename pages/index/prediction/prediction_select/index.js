// pages/index/prediction/prediction_select/index.js
const {
  $ajax
} = require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formula: [],
    picUrl:"",
    rotate:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      picUrl:options.picUrl,
      rotate:options.rotate
    })
    this.getData()
  },
  getData() {
    $ajax("/formula", "GET").then(res => {
      res.data.map(item => {
        //   xy变换了，需要改a,b
        item.b = -1 * item.b / item.a
        item.b = item.b.toFixed(4)
        item.a = 1 / item.a
        item.a = item.a.toFixed(4)
        //   +b
        if(item.b>=0){
            return item.format = `${item.a}x+${item.b},R^2=${item.r2}`
        }else{
            return item.format = `${item.a}x${item.b},R^2=${item.r2}`
        }
      })

      console.log(res)
      this.setData({
        formula: res.data
      })
    })
    // let res = {
    //   "code": 1,
    //   "data": [{
    //     "a": 0.110764,
    //     "b": -17.1733,
    //     "c": null,
    //     "create_time": "Wed, 09 Jun 2021 21:41:53 GMT",
    //     "d": null,
    //     "id": 3,
    //     "imageid": 126,
    //     "modify_time": "Wed, 09 Jun 2021 21:41:53 GMT",
    //     "power": 1,
    //     "r2": 0.741781,
    //     "remark": "dsjkjvcnskj",
    //     "userid": 2,
    //     "x":"R",
    //     "y":"C"
    //   }]
    // }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selectOne(e){
    console.log(e)
    let that = this
    let formulaid = e.currentTarget.dataset.formulaid
    wx.navigateTo({
      url: '/pages/index/prediction/prediction_params/prediction_params?formulaid='+formulaid+"&picUrl="+that.data.picUrl+"&rotate="+that.data.rotate,
    })
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