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
  before(config){
    someloading.start()
    if(token){
      config.headers['Authorization'] = token
    }
    return config
  },
  after(res){
    someloading.end()
    if(res.status>=200&&res.status<400){
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
  async TryGet() {
    const params = {
      _page: 1,
      _limit: 10
    }
    const result = await this.$http.get(testUrl, params)
  },
  async TryPost() {
    const params = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    const result = await this.$http.post(testUrl, params)
  },
  async TryPut() {
    const id = 2,
      params = {
        title: 'boo',
        body: 'car'
      }
    const result = await this.$http.put(testUrl, id, params)
  },
  async TryPatch() {
    const id = 1,
      params = {
        body: 'just modify body'
      }
    const result = await this.$http.patch(testUrl, id, params)
  },
  async TryDelete() {
    const id = 1
    const result = await this.$http.delete(testUrl, id)
  }
}

```
### 普通script引用
只需跟在vue和axios后面引用就行了
``` html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/axios"></script>
<script src="../dist/vue-axios.min.js"></script>
```


