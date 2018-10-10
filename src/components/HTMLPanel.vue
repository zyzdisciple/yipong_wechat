<template>
  <div v-html="html"></div>
</template>
<script>
  export default {
    props: {
      url: {
        required: true
      }
    },
    data () {
      return {
        loading: false,
        html: ''
      }
    },
    mounted () {
      console.log(decodeURIComponent(this.url));
      this.load(decodeURIComponent(this.url));
    },
    watch: {
      url (value) {
        this.load(value);
      }
    },
    methods: {
      load (url) {
        if (url && url.length > 0) {
          // 加载中

          this.loading = true
          let param = {
            accept: 'text/html, text/plain'
          }
          this.$http.get(url, param).then((response) => {
            this.loading = false
            // 处理HTML显示
            this.html = response.data
          }).catch(() => {
            this.loading = false
            this.html = '加载失败'
          })
        }
      }
    }
  }
</script>
