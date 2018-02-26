# A plugin for integrating axios to Vue
我只是axios的搬运工

## 用法
### ES6:
安装依赖
```
npm i -S vue axios qf-vue-axios
或
cnpm i -S vue axios qf-vue-axios
yarn add vue axios qf-vue-axios -S
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
const config = {
  baseURL:'/api',
  timeout:5000,
  before(opts){
    someloading.start()
    if(token){
      opts.headers['Authorization'] = token
    }
    return opts
  },
  after({
    status,
    data
  }) {
    someloading.end()
    if (status >= 200 && status < 400) {
      // 如果http状态码正常，则直接返回数据
      return data
    }else{
      // 异常状态
      return {
        code:-404,
        success:false,
        msg:'网络错误'
      }
    }
  }
}
Vue.use(httpPlugin, axios, config)
```
调用
``` javascript
methods:{
  async TryGet() {
    const id = 1
    const result = await this.$http.get(url, id)
  },
  async TryPost() {
    const params = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    const result = await this.$http.post(url, params)
  },
  async TryPut() {
    const id = 2,
      params = {
        title: 'boo',
        body: 'car'
      }
    const result = await this.$http.put(url, id, params)
  },
  async TryPatch() {
    const id = 1,
      params = {
        body: 'just modify body'
      }
    const result = await this.$http.patch(url, id, params)
  },
  async TryDelete() {
    const id = 1
    const result = await this.$http.delete(url, id)
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


