
import { request } from '../../request/index.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //右侧滚动条的位置
    scrollTop:0,
    //当前索引
    currentIndex: 0,
    // categoriesList:[]
    //左侧菜单栏的数据
    menuList: [],
    //右侧商品列表的数组
    goodsList: []
  },
  //接口返回数据
  Cates: [],

  //获取分类数据
  getCategories() {
    request({
      url: '/categories'
    }).then((res) => {
      this.Cates = res.data.message

      // wx.setStorageSync("key",123)
      //缓存数据
      wx.setStorageSync('cates', {
        data: this.Cates,
        time: Date.now()
      })

      //获得左侧菜单栏的数据
      const menuList = this.Cates.map(v => v.cat_name)
      //获取右边商品的数据
      const goodsList = this.Cates[0].children

      this.setData({
        menuList, goodsList
      })
    })
  },

  //点击切换
  handleMenuTap(event) {
    // console.log(event)
    // const {scrollTop} = this.data
    const { index } = event.target.dataset
    const goodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      goodsList,
      scrollTop:0
    })
  },
  //获取缓存或者接口的数据
  loadData() {
    //获取本地数据
    const localCate = wx.getStorageSync('cates')
    //判断是否有数据
    if (localCate) {
      //判断是否过期
      if (Date.now() - localCate.time > 1000 * 20) {
        // 已过期--发请求
        this.getCategories()
        
      } else {
        // 未过期
        console.log("没过期")
        this.Cates = localCate.data
        //因为获取本地数据，没有触发请求，所有并未出现数据赋值，所有要手动赋值

        //获得左侧菜单栏的数据
        const menuList = this.Cates.map(v => v.cat_name)
        //获取右边商品的数据
        const goodsList = this.Cates[0].children

        this.setData({
          menuList, goodsList
        })
      }
    } else {
      //不存在数据
      this.getCategories()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadData()
  }


})