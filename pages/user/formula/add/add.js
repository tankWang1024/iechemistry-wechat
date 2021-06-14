// pages/user/formula/add/add.js
import Notify from '/@vant/weapp/notify/notify';
const { $ajax } = require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: "",
    y:"",
    x_method_show: false,
    method_show: false,
    t_method_show: false,
    ycolumns: ['C'],
    xcolumns: ['R', 'G', 'B','(G+R)/B', 'G/B','R/B', 'R/G', 'S/V', 'H/S' , 'H', 'S', 'V'],
    tcolumns: [1],
    a: "",
    b: "",
    c: "",
    d: "",
    r2: "",
    remark: "manual",
    power: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onCloseMethod() {
    this.setData({
      method_show: false
    })
  },
  onClosetMethod() {
    this.setData({
      t_method_show: false
    })
  },
  onCloseXMethod() {
    this.setData({
      x_method_show: false
    })
  },
  onConfirmMethod(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      y: value,
      method_show: false
    })
  },
  onConfirmtMethod(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      power: value,
      t_method_show: false
    })
  },
  onConfirmXMethod(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      x: value,
      x_method_show: false
    })
  },
  selectMethod() {
    this.setData({
      method_show: true
    })
  },
  selecttMethod() {
    this.setData({
      t_method_show: true
    })
  },
  selectXMethod() {
    this.setData({
      x_method_show: true
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
  onAinput(e){
    this.setData({
      a:e.detail
    })
  },
  onBinput(e){
    this.setData({
      b:e.detail
    })
  },
  onCinput(e){
    this.setData({
      c:e.detail
    })
  },
  onDinput(e){
    this.setData({
      d:e.detail
    })
  },
  onR2input(e){
    this.setData({
      r2:e.detail
    })
  },
  validateNull(fields) {
    let flag = true
    for (let i = 0; i < fields.length; i++) {
      let name = fields[i].label
      let prop = fields[i].prop
      let validate = fields[i].validate
      let msg = fields[i].msg
      if (!this.data[prop]) {
        flag = false
        Notify({
          type: 'warning',
          message: `${name}不能为空！`
        });
        break
      }
      if (validate) {
        if (!validate(this.data[prop])) {
          flag = false
          Notify({
            type: 'warning',
            message: msg
          });
          break
        }
      }
    }
    return flag
  },
  addform(){
    let validateArr = [{
      label: "函数次数",
      prop: "power"
    },
    {
      label: "a值",
      prop: "a"
    },
    {
      label: "b值",
      prop: "b"
    },
    {
      label: "R^2值",
      prop: "r2"
    },
    {
      label: "x值",
      prop: "x"
    },
    {
      label: "y值",
      prop: "y"
    },
  ]
  if(this.validateNull(validateArr)){
    let data = this.data
    console.log(data)
    let requestData = {
      power:data.power,
      a:data.a,
      b:data.b,
      c:data.c,
      d:data.d,
      r2:data.r2,
      remark:data.remark,
      x:data.x,
      y:data.y
    }
    console.log(requestData)
    let str = "?"
    let keyarr = Object.keys(requestData)
    for(let i = 0;i<keyarr.length;i++){
      let templateStr = ""
      let key = keyarr[i]
      let value = requestData[key]
      if(!value){
        value = '""'
      }
      templateStr = key+"="+value
      if(i!=keyarr.length-1){
        templateStr+="&"
      }
      str+=templateStr
    }
    $ajax("/addformula"+str,"POST",requestData).then(res=>{
      console.log(res)
      if(res.code==1){
        Notify({
          type: 'success',
          message: `${res.message}`
        });
        wx.navigateBack({
          delta: 0,
        })
      }
    })
  }
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