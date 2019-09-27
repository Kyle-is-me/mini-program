// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import {login,request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取用户信息
   getUserInfo(e) {
    // console.log(e)
   this.WxLogin(e)    
  },

  //执行微信登录
  async WxLogin(e){
     //获取需要的参数
     const {encryptedData,rawData,iv,signature}=e.detail
     //小程序登录
     const {code} = await login()
     //拼接参数
     const data = {code,encryptedData,rawData,iv,signature}  
     //发送请求
     const res= await request({url:'/users/wxlogin',method:'post',data})
    //  console.log(res1)
     //获取token
     const {token}=res
     //将token存到本地存储
     wx.setStorageSync('token', {token});
     wx.navigateBack({
       //返回上几页
       delta: 1
     });
       

  }


})