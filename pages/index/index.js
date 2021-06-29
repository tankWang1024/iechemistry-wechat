// index.js
// 获取应用实例
const app = getApp()
const {$ajax} = require("../../utils/util")
var {
  uploadImg
} = require("../../utils/util")
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.login({
      success:(res)=> {
        console.log(res)
        // this.getUserImg()
        if (res.code) {
          $ajax("/login","POST",{
            code:res.code
          },{
            'content-type': 'application/x-www-form-urlencoded'
          })
          .then(res=>{
            console.log(res)
            wx.setStorageSync("token",res.token)
          })
          .then(()=>{
            $ajax("/user","GET").then(userinfo=>{
              console.log(userinfo)
            })
          })
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        console.log(app.data.baseUrl)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  getUserImg: function (e) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserProfile({
            lang:"en",
            success: function (res) {
              console.log(res)
              var userInfo = res.userInfo
              var avatarUrl = userInfo.avatarUrl; //获取微信用户头像存放的Url 
              wx.setStorageSync('avatar', userInfo.avatarUrl)
              app.data.avatar = userInfo.avatarUrl
              app.data.nickname = userInfo.nickName
            }
          })
        }
      }
    })
  },
  click() {
    wx.navigateTo({
      url: '/pages/index/takePhoto/takePhoto',
    })
  },
  onShow() {
    // this.getTabBar().init();
  },
  imgupload(e) {
    uploadImg()
  }
})