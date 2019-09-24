// pages/goods_detail/index.js

import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //总数据
    goodsDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情数据
  getGoodsDetail(goods_id){
    request({
      url:'/goods/detail',
      data:{goods_id}
    }).then((res)=>{
      console.log(res.data)
      //总数据
      this.setData({
        goodsDetail:res.data.message
      })
    })
  }
 
})