// app.js
App({
  data:{
    // baseUrl:"https://ruankun.natappvip.cc",
    // baseUrl:"https://holepredict.sicau.edu.cn/iechemistry",
    baseUrl:"http://10.137.0.11:9876",
    avatar:"",
    nickname:""
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})
