axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com/'

new Vue({
  el: '#app',
  methods: {
    async GetUsers() {
      const params = {
        _page: 1,
        _limit: 10
      }
      const result = this.$http.get('users/', params)
      console.log(result)
    }
  },
  mounted() {
    this.GetUsers()
  }
})