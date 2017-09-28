// 封装axios插件
const install = (Vue, axios, opts = {}) => {

  if (!axios) {
    console.error('You have to install axios')
    return
  }

  // 加上api前缀供代理转发
  // axios.defaults.baseURL = '/api'

  const CheckStatus = ({
    status,
    data
  }) => {
    // 正常情况
    if (status >= 200 || status < 400) {
      return data
    }
    // 异常情况
    return {
      code: -400,
      success: false,
      msg: 'fatal error'
    }
  }


  Vue.prototype.$http = {
    get(url, data) {
      return axios({
        method: 'get',
        url,
        data
      }).then(res => {
        return CheckStatus(res)
      })
    },
    post(url, params) {
      return axios({
        method: 'post',
        url,
        params
      }).then(res => {
        return CheckStatus(res)
      })
    }
  }

}


if (typeof window !== 'undefined' && window.Vue && window.axios) {
  Vue.use({
    install
  }, window.axios)
}
module.exports = {
  install
}