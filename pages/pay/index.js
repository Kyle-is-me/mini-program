
import { request, requestPayment,showToast } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
/*
1.获取授权状态
*/



// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //用户收货地址
    address: {},
    //购物车信息
    cartList: [],
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //1.获取本地存储地址数据
    const address = wx.getStorageSync('address');

    //获取本地存储中的购物车数据
    let cartList = wx.getStorageSync('carts') || []
    //筛选出没有被勾选的商品
    cartList = cartList.filter(v => v.checked === true)
    //赋值给data中的address
    this.setData({ address, cartList })

    //计算总价和数量
    this.handleComputed(cartList)
  },





  // 计算总价和总数量
  handleComputed(cartList) {
    //全选状态
    let allChecked = true
    //总价格
    let totalPrice = 0
    //总数量
    let totalNum = 0

    //循环数组
    cartList.forEach((v, i) => {
      //判断
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    });

    allChecked = cartList.length === 0 ? false : allChecked
    //将数据存到data
    this.setData({
      allChecked,
      totalPrice,
      totalNum
    })
  },




  //结算
  handlePay() {
    this.createBil()
  },


  //创建订单
  async createBil() {
    //获取本地存储的token值，进行判断
    const  token  = wx.getStorageSync('token');
    if (!token) {
      //跳到授权页
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    //继续执行
    //创建订单
    //获取缓存中的数组
    const localCart = wx.getStorageSync('carts');
    const { totalPrice, address } = this.data
    const goods = localCart.map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }
    })
    // 发送请求 创建订单
    const {order_number} = await request({ url: '/my/orders/create', method: 'post',
     data: { goods, order_price: totalPrice, consignee_addr: address.detailAddress }})
    
    //获取支付参数
    const { pay } = await request({ url: '/my/orders/req_unifiedorder', method: 'post', data: { order_number }})

    //使用微信自带的支付API
    await requestPayment(pay)


    //查看订单支付状态
    const res = await request({ url: '/my/orders/chkOrder', method: 'post', data: { order_number }})

    
      //支付成功之后跳转到购物车页面,并弹窗提示
      await showToast({title:res,mask:true})
      wx.navigateTo({
        url: '/pages/order/index',
      })
    
      //提示支付失败
      await showToast({title:"支付失败",mask:true})
      //支付成功之后，删除对应的商品===保留未选中的
      wx.setStorageSync('carts', localCart.filter(v=>!v.checked));
        


  }


})