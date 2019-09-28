// pages/search/index.js


import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //包含关键字的商品数组
    goodsList: [],
    //是否显示
    isShow: false,
    //输入框的值
    inpValue: ''
  },
  timeId: -1,

  //输入框输入事件
  handleInputVal(e) {
    //获取输入框的值
    const { value } = e.detail
    //简单非空判断
    if (value.trim()) {
      //显示取消按钮
      this.setData({
        isShow: true
      })
      //清除定时器---不影响正常运行---清除上一次的定时器
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        //如果输入框
        this.getGoodsData(value)
      }, 1000)
    }else{
      this.setData({
        isShow:false,
        goodsList:[]
      })
    }
  },

  //发送请求
  async getGoodsData(value) {
    //获取包含关键字的商品
    const res = await request({ url: '/goods/qsearch', data: { query: value } })
    // console.log(res)
    this.setData({
      goodsList: res
    })
  },

  //点击取消
  handleCancel(){

    this.setData({
      inpValue:'',  //清空输入框
      isShow:false, //隐藏按钮
      goodsList:[] //清空数组
    })
    
  }

})