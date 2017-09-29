const install = (Vue, axios, opts = {}) => {

  if (!axios) {
    console.error('You have to install axios')
    return
  }

  // 基础域名和前缀
  if (opts.baseURL) {
    axios.defaults.baseURL = opts.baseURL
  }

  // 超时时间
  if (opts.timeout) {
    axios.defaults.timeout = opts.timeout
  }

  // 请求时拦截
  if (opts.before) {
    axios.interceptors.request.use(config => {
      return opts.before(config)
    }, error => {
      return Promise.reject(error)
    })
  }

  // 响应时的拦截
  if (opts.after) {
    axios.interceptors.response.use(res => {
      return opts.after(res)
    }, error => {
      return Promise.reject(error)
    })
  }

  // 添加实例
  Vue.prototype.$http = {
    get(url, data) {
      return axios({
        method: 'get',
        url,
        data
      })
    },
    post(url, params) {
      return axios({
        method: 'post',
        url,
        params
      })
    }
  }
}

if (typeof window !== 'undefined' && window.Vue && window.axios) {
  Vue.use({
    install
  }, window.axios)
} else if (typeof define == "function" && define.amd) {
  define([], function () {
    return plugin
  })
} else {
  module.exports = {
    install
  }
}