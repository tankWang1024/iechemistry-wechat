const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const uploadImg = ()=>{
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
      wx.navigateTo({
        url: '/pages/index/result/result?picUrl='+tempFilePaths[0],
      })
    },
  })
}
module.exports = {
  formatTime,
  uploadImg
}
