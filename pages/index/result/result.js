// pages/index/result/result.js
const app = getApp()
const {
  $ajax
} = require("../../../utils/util")
import Toast from '/@vant/weapp/toast/toast';
import Notify from '/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    imageid: 0,
    remark: "",
    number: "",
    top: 0.8333,
    right: 0.8,
    left: 0.2,
    bottom: 0.5,
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
    let validateArr = [{
        label: "实验名",
        prop: "remark"
      },
      {
        label: "试管个数",
        prop: "number"
      },
      {
        label: "分割参数：上 ",
        prop: "top"
      },
      {
        label: "分割参数：左 ",
        prop: "left"
      },
      {
        label: "分割参数：下 ",
        prop: "bottom"
      },
      {
        label: "分割参数：右 ",
        prop: "right"
      },
      {
        label: "试管浓度",
        prop: "concentration",
        validate(data) {
          console.log(data)
          return true
        },
        msg: "试管浓度填写不符合规定"
      },
    ]
    var requestData = {}
    if (this.validateNull(validateArr)) {
      var that = this
      Toast.loading({
        message: '图片上传中...',
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
          remark: that.data.remark
        },
        success(res) {
          console.log(res)
          Notify({ type: 'success', message: '图片上传成功' });
          let data = JSON.parse(res.data)
          let image = data.image
          that.setData({
            imageid: image.id
          })
          Toast.clear()
          requestData = that.varTransfer()
          console.log(requestData)
          Toast.loading({
            message: '结果解析中...',
            duration: 0,
            forbidClick: true,
          });
          $ajax("/process", "POST", requestData).then(res => {
            Toast.clear()
            if(res.code==1){
              Notify({ type: 'success', message: res.message+"，即将跳转" });
              setTimeout(()=>{
                wx.navigateTo({
                  url: '/pages/index/analyse/analyse?imageid='+that.data.imageid,
                })
              },1000)
            }else{
              Notify({ type: 'warning', message: res.message });
            }
          })
        },
        fail(err) {
          console.log(err)
          Toast.clear()
          Notify({ type: 'danger', message: '图片上传失败，请重试' });
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
    var reg1 = new RegExp(",", "g")
    let rep1 = this.data.concentration.replace(reg1, "，")
    var reg2 = new RegExp("，", "g")
    let concentration = rep1.replace(reg2, " ")
    return {
      imageid: data.imageid,
      remark: data.remark,
      number: data.number,
      top: data.top,
      left: data.left,
      bottom: data.bottom,
      right: data.right,
      concentration: concentration
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