// pages/goods_detail/index.js

import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //总数据
    goodsDetail: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情数据
  getGoodsDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: { goods_id }
    }).then((res) => {
      console.log(res.data)
      //总数据
      this.setData({
        goodsDetail: res.data.message
      })
    })
  },
  //图片预览事件
  handlePreview(e) {
    const urls = this.data.goodsDetail.pics.map(v => v.pics_mid)
    const { current } = e.currentTarget.dataset

    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //加入购物车事件--将数据存到本地存储
  // 分析得，需要的数据有 商品名称 商品图片  商品价格 商品id 商品数量
  /* 以数组对象的形式存储 [{
                          goods_name,
                          goods_price,
                          goods_pic,
                          goods_id,
                          num,  
                         }]
     获取本地数据，判断是否有数据
     如果有,数量加1
     否则添加数据,   
     {goods_name,goods_price,goods_id,goods_small_logo}                 
  */
  handleAddGoods() {
    const goodsObj = this.data.goodsDetail
    //获取本地数据--添加默认数组，这样做无论如何都会获得一个对象。
    const goodsList = wx.getStorageSync('carts') || [];
    //判断是否有本地数据
    const index = goodsList.findIndex(v => v.goods_id === goodsObj.goods_id)
    if (index === -1) {
      // //没有此数据,添加到数组
      goodsList.push({
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_id: goodsObj.goods_id,
        goods_small_logo: goodsObj.goods_small_logo,
        num: 1
      })

    } else {
      // 如果有数据    
      goodsList[index].num++
    }
    //存到本地数据
    wx.setStorageSync('carts', goodsList);
    //提醒用户添加成功
    wx.showToast({
      title: '添加购物车成功',
      icon: 'none',      
      mask: true,
    });
      
  }

})