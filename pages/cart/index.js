
import { getSetting, openSetting, chooseAddress, showModal, showToast } from '../../request/index.js'
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
    //全选状态
    allChecked: false,
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
    const cartList = wx.getStorageSync('carts') || []
    //赋值给data中的address
    this.setData({ address, cartList })

    //计算总价和数量
    this.handleComputed(cartList)
  },

  //添加地址事件
  handleAddAddress() {
    this.getUserAddress()
  },

  //获取收货地址
  async getUserAddress() {
    try {
      // //获取授权状态
      const res = await getSetting()
      const auth = res.authSetting["scope.address"]
      // 判断授权状态
      if (auth === false) {
        //引导用户打开授权页面
        await openSetting()
        // //直接获取用户收货地址
      }
      // auth =ture || undefind
      const res2 = await chooseAddress()
      console.log(res2)
      res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
      //将收货地址存到缓存和data中
      wx.setStorageSync('address', res2);
      this.setData({
        address: res2
      })
    } catch (error) {
      console.log(error)
    }

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

  //复选框事件
  handleChange(e) {
    // console.log(e)
    //获取需要修改的元素的索引
    const { index } = e.target.dataset
    //修改data和缓存中的cartlist
    //2获取购物车数组
    const { cartList } = this.data
    cartList[index].checked = !cartList[index].checked
    //将购物车重新赋值给data和缓存
    this.setData({
      cartList
    })
    //加到缓存中
    wx.setStorageSync('carts', cartList)
    // //重新计算
    this.handleComputed(cartList)
  },

  //加减数量点击事件
  async accountNum(e) {
    const { operation, index } = e.target.dataset
    const { cartList } = this.data
    // 判断，如果用户点击 - 并且 num为1 ,提示用户删除
    if (operation === -1 && cartList[index].num === 1) {
      const res = await showModal({
        title: '提示',
        content: '你要删除该商品吗？'
      })
      // console.log(res)
      if (res.confirm) {
        // 将商品重数组中删除
        cartList.splice(index, 1)
      } else {
        return
      }
    } else {
      //修改购物车中物品的数量
      cartList[index].num += operation
    }

    //重新赋值给个data和缓存
    this.setData({ cartList })
    //加到缓存
    wx.setStorageSync('carts', cartList)

    //重新计算
    this.handleComputed(cartList)
  },

  //结算
  async acountPay() {
    const { address, totalNum } = this.data
    //地址不能为空
    if (!address.userName) {
      await showToast({ title: '请添加收货地址', icon: 'none', mask: true })
      return
    }
    //商品数量不为空
    if (totalNum === 0) {
      await showToast({ title: '你还没选购商品', icon: 'none', mask: true })
      return
    }
    //可以跳转页面
    wx.navigateTo({
      url: '../../pages/pay/index'
    });
  }


})