//index.js
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
    getSwiperData(){
        request({
            url:'/home/swiperdata',
        }).then((res)=>{
           this.setData({
               swiperdata:res.data.message
           })
        }) 
    },
    //获取导航栏数据
    getCatitems(){
        request({
            url:'/home/catitems'
        }).then((res)=>{
            this.setData({
                catitemsList:res.data.message
            })
        })
    },
    //获取楼层数据
    getFloorData(){
        request({
            url:"/home/floordata"
        }).then((res)=>{
            this.setData({
                floordata:res.data.message
            })
        })
    }
})
