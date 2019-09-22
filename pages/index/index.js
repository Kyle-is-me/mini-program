//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
        swiperdata:[],
        catitemsList:[],
        floordata:[]
    },
    
    onLoad:function(){
       this.getSwiperData(),
       this.getCatitems(),
       this.getFloorData()
    },
    // 获取轮播图数据
    getSwiperData(){
        wx.request({
            url:'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            success:(res)=>{
                // console.log(res.data.message)
                this.setData({
                    swiperdata:res.data.message
                })
            }
        })
    },
    //获取导航栏数据
    getCatitems(){
        wx.request({
            url:'https://api.zbztb.cn/api/public/v1/home/catitems',
            success:(res)=>{
               
                this.setData({
                    catitemsList:res.data.message
                })
            }
        })
    },
    //获取楼层数据
    getFloorData(){
        wx.request({
            url:"https://api.zbztb.cn/api/public/v1/home/floordata",
            success:(res)=>{
                console.log(res.data)
                this.setData({
                    floordata:res.data.message
                })
            }
        })
    }
})
