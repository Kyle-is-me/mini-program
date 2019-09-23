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
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                account--
                if(account=== 0){
                    wx.hideLoading()
                }
            }
        })
    })
}