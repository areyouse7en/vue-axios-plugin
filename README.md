# A plugin for integrating axios to Vue
我只是axios的搬运工

## 用法
### ES6:
安装依赖
```
npm i -S vue axios qf-vue-axios
或
cnpm i -S vue axios qf-vue-axios
```
引用
``` javascript
import Vue from 'vue'
import axios from 'axios'
import httpPlugin from 'qf-vue-axios'

Vue.use(httpPlugin, axios)
```
设置
>也可直接通过[axios原始设置方法](https://github.com/axios/axios)进行设置
``` javascript
const opts = {
  baseURL:'/api',
  timeout:5000,
  <!-- 请求时拦截 -->
  before(config){
    someloading.start()
    if(token){
      config.headers['Authorization'] = token
    }
    <!-- 必须返回config -->
    return config
  },
  <!-- 响应时的拦截 -->
  after(res){
    someloading.end()
    if(res.status>=200&&res.status<400>){
      <!-- 必须返回json -->
      return res.data
    }else{
      return {
        code:-404,
        success:false,
        msg:'网络错误'
      }
    }
  }
}
Vue.use(httpPlugin, axios, opts)
```
调用
``` javascript
methods:{
  async getData(){
    const data = await this.$http.get(url)
    console.log(data)
  },
  async postData(){
    const params = {
      name:'qf'
    }
    const data = await this.$http.post(url,params)
    console.log(data)
  }
}

```

