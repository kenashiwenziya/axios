import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {
    'content-Type': 'application/json;charset=UTF-8'
  }
})

axios.defaults.baseURL = 'https://xx.xx.com/api/'

axios.interceptors.request.use(config => {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  config.headers['Authorization'] = wx.getStorageSync('estoken')
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
}, error => { // 请求错误处理
  console.log('error======', error.message)
  wx.hideLoading()
  Promise.reject(error)
})

axios.interceptors.response.use(
  res => {
    wx.hideLoading()
    let result
    if (res.data.code !== 200) {
      result = res.data
      return Promise.reject(result)
    } else {
      result = res.data
      // 在这里对返回的数据进行处理
      return result
    }
  },
  error => {
    console.log('error', error.message)
    if (error.message === 'Network Error') {
      error.message = '网络异常，请稍后再试'
    } else if (error.message.indexOf('Request failed with status code 5') !== -1) {
      error.message = '服务器错误,请联系管理员'
    } else {
      error.message = '加载失败，请稍后再试'
    }
    wx.hideLoading()
    return Promise.reject(error)
  }
)

export default axios // 暴露axios实例
