// pages/index/result/result.js
const app = getApp()
const {
  $ajax
} = require("../../../../utils/util")
import Toast from '/@vant/weapp/toast/toast';
import Notify from '/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formulaid:0,
    picUrl: "",
    imageid: 0,
    number: "",
    top: 0.6,
    right: 0.6,
    left: 0.4,
    bottom: 0.8,
    concentration: "",
    uploadloading: false,
    rotate: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.picUrl)
    this.setData({
      rotate: options.rotate,
      picUrl: options.picUrl,
      formulaid:options.formulaid
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
  uploadPic() {
    console.log("上传")
    let validateArr = [
      {
        label: "tube number",
        prop: "number"
      },
      {
        label: "dividing params:top ",
        prop: "top"
      },
      {
        label: "dividing params:left ",
        prop: "left"
      },
      {
        label: "dividing params:bottom ",
        prop: "bottom"
      },
      {
        label: "dividing params:right ",
        prop: "right"
      },
    ]
    var requestData = {}
    if (this.validateNull(validateArr)) {
      var that = this
      Toast.loading({
        message: 'image uploading...',
        duration: 0,
        forbidClick: true,
      });
      wx.uploadFile({
        filePath: that.data.picUrl,
        name: 'image',
        header: {
          'content-type': 'application/x-www-form-urlencode',
          token: wx.getStorageSync('token')
        },
        url: app.data.baseUrl + "/image",
        formData: {
          rotate: that.data.rotate,
          remark: new Date().getTime()
        },
        success(res) {
          console.log(res)
          if(res.statusCode!=200){
            Notify({ type: 'danger', message: 'upload failed' });
            Toast.clear()
            return
          }
          Notify({ type: 'success', message: 'upload success' });
          let data = JSON.parse(res.data)
          let image = data.image
          that.setData({
            imageid: image.id
          })
          Toast.clear()
          requestData = that.varTransfer()
          console.log(requestData)
          Toast.loading({
            message: 'analysing...',
            duration: 0,
            forbidClick: true,
          });
          $ajax("/predict", "POST", requestData).then(res => {
            console.log(res)
            Toast.clear()
            if(res.code==1){
              Notify({ type: 'success', message: res.message+", jumping" });
              setTimeout(()=>{
                wx.navigateTo({
                  url: '/pages/index/prediction/prediction_details/index?obj='+JSON.stringify(res),
                })
              },1000)
            }else{
              Notify({ type: 'warning', message: res.message });
            }
          }).catch((e)=>{
              console.log(e)
            Toast.clear()
            Notify({ type: 'danger', message: "server error , retry later." });
          })
        },
        fail(err) {
          console.log(err)
          Toast.clear()
          Notify({ type: 'danger', message: 'upload failed' });
        }
      })
    }

    // this.setData({
    //   uploadloading: true
    // })

    // wx.navigateTo({
    //   url: '/pages/index/analyse/analyse',
    // })
  },
  previewImg(e) {
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
  varTransfer() {
    let that = this
    let data = that.data
    // var reg1 = new RegExp(",", "g")
    // let rep1 = this.data.concentration.replace(reg1, "，")
    // var reg2 = new RegExp("，", "g")
    // let concentration = rep1.replace(reg2, " ")
    return {
      imageid: data.imageid,
      // remark: data.remark,
      number: parseInt(data.number),
      top: data.top,
      left: data.left,
      bottom: data.bottom,
      right: data.right,
      formulaid:parseInt(data.formulaid)
      // concentration: concentration
    }

  },
  retake() {
    wx.navigateTo({
      url: '/pages/index/takePhoto/takePhoto',
    })
  },
  onRemark(e) {
    this.setData({
      remark: e.detail
    })
  },
  onNumber(e) {
    this.setData({
      number: e.detail
    })
  },
  onLeft(e) {
    this.setData({
      left: e.detail
    })
  },
  onTop(e) {
    this.setData({
      top: e.detail
    })
  },
  onRight(e) {
    this.setData({
      right: e.detail
    })
  },
  onBottom(e) {
    this.setData({
      bottom: e.detail
    })
  },
  onConcentration(e) {
    this.setData({
      concentration: e.detail
    })
  }
})