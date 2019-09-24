// pages/goods_list/index.js

import {request} from '../../request/index'


Page({
   /**
   * 页面的初始数据
   */
  data: {
    //没有更多数据
    noMore:false,
    //当前索引
    index:0,
    tabList:[
      {id:1,text:'综合'},
      {id:2,text:'销量'},
      {id:3,text:'综价格合'}
    ],
    //商品数据
    goodsList:[]
  },
  //全局的请求的参数对象
  QueryParams:{
    query:'',  //关键字，可以为空
    cid:'',   //商品分类页传过来的商品ID
    pagenum:1,  //页码  第几页
    pagesize:10 //每页显示条数
  },
  //全局的总条数
  Total:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {cid} = options;
    this.QueryParams.cid=cid;
    this.getGoodsList()
  },
 
  //获取商品列表
  getGoodsList(){
    // 请求数据
    request({
      url:'/goods/search',
      data:this.QueryParams
    }).then((res)=>{
      // console.log(res.data)
      const {goods,total} = res.data.message
      // 获取新数据
      const newGoodsList = goods
      //获取旧数据
      const oldGoodsList = this.data.goodsList
      //总条数
      this.Total = total
      this.setData({
        goodsList:[...oldGoodsList,...newGoodsList]
      })
      //请求成功之后，要停止当前页面的下拉刷新
      wx.stopPullDownRefresh()
    })
  },

  //接收tab栏子组件的参数
  getIndex(obj){
    // console.log(obj)
    const {index} = obj.detail
    this.setData({
      index 
    })
  },
  //监听上拉加载下一页事件
  onReachBottom(){
    //1判断下一页是否有数据--当前页是否大于或等于总页数--公式 总页数=总条数除以页码量
    const totalPage = Math.ceil(this.Total / this.QueryParams.pagesize)
    //判断
    if(this.QueryParams.pagenum >= totalPage){
     
      //没有--弹窗提示
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
      });
      this.setData({
        noMore:true
      })        
    }else{
      this.QueryParams.pagenum++
      //如果有
      this.getGoodsList()
    }

  },
  //监听下拉刷新事件
  onPullDownRefresh(){
    
    //下拉后刷新需要重置一些数据
    //重置第几页
    this.QueryParams.pagenum = 1;
    // 重置商品数据
    this.setData({
      goodsList:[]
    });
    // 发送请求
    this.getGoodsList()
  }

})