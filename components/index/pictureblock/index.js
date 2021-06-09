// components/index/pictureblock/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result:{
      type:Object,
      value:{},
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    rgb:"255,255,255",
    hsv:"125,125,125"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRgb(){
      return "255 255 255"
    },
    getHsv(){
      return "255 255 125"
    }
  },
  
})
