<template>
  <div>

    <scroller style="top: 44px;"
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">

      <div v-for="(item, index) in items" @click="onItemClick(index, item)"
          class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller>
  </div>
</template>

<script>

  export default {
    components: {

    },

    data () {
      return {
        items: []
      }
    },

    mounted() {

      for (let i = 1; i <= 20; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.top = 1
      this.bottom = 20

    },

    methods: {
      refresh(done) {
        setTimeout(() => {
          let start = this.top - 1

          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }

          this.top = this.top - 10;

          done()
        }, 1500)
      },

      infinite(done) {
         done(false)
      },

      onItemClick(index, item) {
      }
    }
  }
</script>
