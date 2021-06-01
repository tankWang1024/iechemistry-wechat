// pages/index/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    username: "",
    password: "",
    uploadloading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.picUrl)
    this.setData({
      picUrl: options.picUrl
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
  uploadPic() {
    console.log("上传")
    this.setData({
      uploadloading: true
    })
    wx.navigateTo({
      url: '/pages/index/analyse/analyse',
    })
  },
  previewImg(e) {
    console.log(11111)
    let urls = []
    urls.push(this.data.picUrl)
    console.log(this.data.picUrl)
    wx.previewImage({ //在新页面中全屏预览图片 预览的过程中用户可以进行保存图片、发送给朋友等操作
      current: this.data.picUrl, //当前显示图片的链接 默认为第一张
      urls: urls, //需要预览的图片链接列表
      success: function (e) {
        console.log("成功")
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  retake(){
    wx.navigateTo({
      url: '/pages/index/takePhoto/takePhoto',
    })
  }
})