(function () {
  let httpPlugin = {}

  httpPlugin.install = (Vue, axios, opts = {}) => {

    if (!axios) {
      console.error('You have to install axios')
      return
    }

    let instance = axios.create()

    // 基础域名和前缀
    if (opts.baseURL) {
      instance.defaults.baseURL = opts.baseURL
    }

    // 超时时间
    if (opts.timeout) {
      instance.defaults.timeout = opts.timeout
    }

    // 请求时拦截
    if (opts.before) {
      instance.interceptors.request.use(config => {
        return opts.before(config)
      }, error => {
        return Promise.reject(error)
      })
    }

    // 响应时的拦截
    if (opts.after) {
      instance.interceptors.response.use(res => {
        return opts.after(res)
      }, error => {
        return Promise.reject(error)
      })
    }

    // 添加实例
    Vue.prototype.$http = {
      post(url, data) {
        return instance({
          method: 'post',
          url,
          data
        })
      },
      get(url, params) {
        return instance({
          method: 'get',
          url,
          params
        })
      }
    }
  }

  if (typeof exports == "object") {
    // commonjs
    module.exports = httpPlugin
  } else if (typeof define == "function" && define.amd) {
    // amd
    define([], function () {
      return httpPlugin
    })
  } else if (window.Vue && window.axios) {
    // script
    window.httpPlugin = httpPlugin
    Vue.use(httpPlugin, window.axios)
  }

})()