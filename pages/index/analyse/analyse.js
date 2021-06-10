// pages/index/analyse/analyse.js
import Notify from '/@vant/weapp/notify/notify';
import Toast from '/@vant/weapp/toast/toast';
const {
  $ajax
} = require("../../../utils/util")
const double = {
  浓度: ['R', 'G', 'B','(G+R)/B', 'H', 'S', 'V'],
  // 福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
const doubleMap = {
  "浓度": "C"
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageid: 0,
    columns: ['SVM'],
    method: "",
    axiosx: "",
    axiosy: "",
    params_msg: "请选择",
    method_show: false,
    params_show: false,
    resultData: [],
    two_columns: [{
        values: Object.keys(double),
        className: 'column1',
      },
      {
        values: double['浓度'],
        className: 'column2',
        defaultIndex: 0,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageid: options.imageid
    })
    this.getData()
  },
  getData() {

    $ajax("/processresult", "GET", {
      imageid: parseInt(this.data.imageid)
    }).then(res => {
      console.log(res)
      this.setData({
        resultData: res.datas
      })
    })
  },
  toShow() {
    let data = this.data
    if (!this.data.method) {
      Notify({
        type: 'warning',
        message: '拟合方法不能为空'
      });
    } else if (!this.data.axiosx) {
      Notify({
        type: 'warning',
        message: '拟合参数不能为空'
      });
    } else {
      Toast.loading({
        message: '解析中...',
        forbidClick: true,
        duration:0
      });
      
      $ajax("/fit","GET",{
        method:data.method,
        imageid:data.imageid,
        axiosx:data.axiosx,
        axiosy:data.axiosy
      }).then(res=>{
        console.log(res)
        Toast.clear()
        if(res.code==1){
          Notify({ type: 'success', message: '解析成功，即将跳转' });
          setTimeout(()=>{
            wx.navigateTo({
              url: `/pages/index/details/details?linear=${res.linear.url}&scatter=${res.scatter.url}`,
            })
          },1000)
        }else{
          Notify({ type: 'danger', message: res.message });
        }
      })
      
    }

  },
  onConfirmMethod(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      method: value,
      method_show: false
    })
  },
  onConfirmParams(event) {
    console.log(event)
    const {
      value,
      index
    } = event.detail;
    let y = doubleMap[value[0]]
    let x = value[1]
    console.log("x=" + x + " y=" + y)
    this.setData({
      axiosx: x,
      axiosy: y,
      params_msg: value[0] + " " + value[1],
      params_show: false
    })
  },
  onCloseMethod() {
    this.setData({
      method_show: false
    })
  },
  onCloseParams() {
    this.setData({
      params_show: false
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
  selectMethod() {
    this.setData({
      method_show: true
    })
  },
  selectParams() {
    this.setData({
      params_show: true
    })
  },
})