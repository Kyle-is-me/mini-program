//index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js';


Page({
    data:{
        swiperdata:[],
        catitemsList:[],
        floordata:[]
    },
    
    onLoad:function(){
       this.getSwiperData()
       this.getCatitems(),
       this.getFloorData()
    
    },
    // 获取轮播图数据
    async getSwiperData(){
        const res = await request({ url:'/home/swiperdata'})
        this.setData({
            swiperdata:res
        })
    },
    //获取导航栏数据
    async getCatitems(){
        const res = await request({url:'/home/catitems'})
        this.setData({
            catitemsList:res
        })      
    },
    //获取楼层数据
    async getFloorData(){
        const res = await request({ url:"/home/floordata"})
        this.setData({
            floordata:res
        })
    }
})
