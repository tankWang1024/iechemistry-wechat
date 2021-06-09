const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const uploadImg = (type) => {
  if(!type){
    type = "navigateTo"
  }
  wx.chooseImage({ //从本地相册选择图片或使用相机拍照
    count: 1, //最多选择多少张图片 默认为9
    sizeType: ['original', 'compressed'], //所选照片的尺寸 original为原图compressed为缩略图
    sourceType: ['album'], //album为从手机中选择 camera为相机
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      // _this.setData({
      //   imgs: res.tempFilePaths
      // });
      console.log(tempFilePaths[0])
      wx[type]({
        url: "/pages/index/menu/menu" + '?picUrl=' + tempFilePaths[0] + "&rotate=0",
      })
    },
  })
}
const $ajax = (url, method, data, header) => {
  if (!method) {
    method = "GET"
  }
  if (!header) {
    header = {}
  }
  header.token = wx.getStorageSync("token")
  header['content-type'] = 'application/x-www-form-urlencoded'

  let requestUrl = app.data.baseUrl + url
  return new Promise((resolve, rej) => {
    wx.request({
      url: requestUrl,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        if (res.statusCode == 200) {
          let data = res.data
          if (typeof data == "string") {
            console.log("此data数据未json化：" + data)
            data = JSON.parse(data)
          }
          resolve(data)
        }
      },
      fail: (err) => {
        rej(err)
      }
    })
  })
}
module.exports = {
  formatTime,
  uploadImg,
  $ajax
}