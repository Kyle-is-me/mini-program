// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //传递给tab的数据
    tabList:[
      {id:1,text:'商品收藏'},
      {id:1,text:'品牌收藏'},
      {id:1,text:'店铺收藏'},
      {id:1,text:'浏览足迹'}
    ],
    //传递给子组件的当前索引
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取tab组件传递的数据
  getIndex(obj){
    const {index}=obj.detail
    console.log(2)
    this.setData({
      currentIndex:index
    })
  }

 
})