
//封装成promise的异步请求

export const request = (params) => {
    let account = 0

    //一发请求就触发loading
    wx.showLoading({
        title: '加载中',
        mask: true
    })

    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        account++
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res) => {
                // console.log(res.data.message)
                resolve(res.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                account--
                if (account === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}


//封装成promise的getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

//封装成promise的openSetting
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                //直接获取用户的收货地址
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
}

//封装成promise的chooseAddress
export const chooseAddress = () => {
    return new Promise((resolve, rejcet) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail:(err)=>{
                rejcet(err)
            }
        });
    })
}


export const showModal=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            ...params,
            success(res) {
              if (res.confirm) {
                resolve(res)
              } 
            }
          })    
    })
}

//封装成Promise的提示框
export const showToast=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
          ...params,
            
            success: (result) => {
              resolve(result)
            },
            fail: () => {},
            complete: () => {}
          });
    })
}

//封装的wx.login
export const login=()=>{    
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}

//封装的微信支付 Promise
export const requestPayment=(pay)=>{    
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
          
    })
}