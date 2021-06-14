// pages/user/formula/index.js
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
const { $ajax } = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  selectone(e) {
    let fid = e.currentTarget.dataset.fid

  },
  deleteone(e) {
    console.log(e.currentTarget.dataset.fid)
    let formulaid = e.currentTarget.dataset.fid
    Dialog.confirm({
        // title: '',
        message: '确认删除公式？',
      })
      .then(() => {
        // on confirm
        $ajax("/deleteformula?formulaid="+formulaid,"POST").then(res=>{
          console.log(res)
          if(res.code==1){
            Notify({ type: 'success', message: res.message });
            this.getData()
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  addformula(){
    wx.navigateTo({
      url: '/pages/user/formula/add/add',
    })
  },
  onClose(event) {

  },
  getData(){
    $ajax("/formula","GET").then(res=>{
      console.log(res)
      let data = res.data
      data.map(item=>{
        item.template = `${item.a}x+${item.b},R2=${item.r2}`
        return item
      })
      this.setData({
        list:data
      })
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
    this.getData()
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