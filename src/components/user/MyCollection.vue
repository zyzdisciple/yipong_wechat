<template>
  <div>
    <div class="my-collection">
      <div class="users-bg3-l">
        <div :class='activeVideo' @click="showVideoList">视频</div>
      </div>
      <div class="users-bg3-r">
        <div :class='activeLive' @click="showLiveList">直播</div>
      </div>
      <div class="users-bg3-r">
        <div :class='activeWeHealth' @click="showWeHealthList">微健康</div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" :infinite-scroll-immediate-check="!allLoaded"
         :infinite-scroll-disabled="allLoaded" class="live-talent" :style="scrollStyle">
      <my-collection-video @changeAllLoadStatus="changeLoad" ref="collectionVideo"
                           v-if="showVideo"></my-collection-video>
      <my-collection-live @changeAllLoadStatus="changeLoad" ref="collectionLive" v-if="showLive"></my-collection-live>
      <my-collection-we-health @changeAllLoadStatus="changeLoad" ref="collectionHealth"
                               v-if="showWeHealth"></my-collection-we-health>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>

</template>

<script>
  import MyCollectionVideo from '@/components/User/MyCollectionVideo';
  import MyCollectionLive from '@/components/User/MyCollectionLive';
  import MyCollectionWeHealth from '@/components/User/MyCollectionWeHealth';
  export default {
    components: {
      MyCollectionVideo, MyCollectionLive, MyCollectionWeHealth,
    },
    data() {
      return {
        showWeHealth: false,
        showLive: false,
        showVideo: true,
        activeVideo: "is-selected",
        activeLive: "",
        activeWeHealth: "",
        scrollStyle: {
          top: '50px',
          height: document.documentElement.clientHeight - 50 + 'px'
        },
        loading: false,
        allLoaded: false,
        preDate: '',
        newDate: ''
      };
    },
    methods: {
      // 收藏的视频
      showVideoList() {
        this.initData();
        this.showVideo = true;
        this.showLive = this.showWeHealth = false;
        this.activeVideo = "is-selected";
        this.activeLive = "";
        this.activeWeHealth = "";
        this.$refs.collectionVideo.loadData(true);
      },
      // 收藏的直播
      showLiveList() {
        this.initData();
        this.showLive = true;
        this.showVideo = this.showWeHealth = false;
        this.activeVideo = "";
        this.activeLive = "is-selected";
        this.activeWeHealth = "";
        this.$refs.collectionLive.loadData(true);
      },
      // 收藏的微健康
      showWeHealthList() {
        this.initData();
        this.showWeHealth = true;
        this.showVideo = this.showLive = false;
        this.activeVideo = "";
        this.activeLive = "";
        this.activeWeHealth = "is-selected";
        this.$refs.collectionHealth.loadData(true);
      },
      loadMore() {
        if (this.allLoaded) {
          return false;
        }
        this.newDate = new Date().getTime();
        if (this.preDate != '' && (this.newDate - this.preDate < 1500)) {
          return false;
        }
        this.preDate = new Date().getTime();

        this.loading = true;
        setTimeout(() => {
          this.loadBottom();
        }, 1500);
      },
      loadBottom() {
        this.loading = false;
        if (this.showVideo) {
          this.$refs.collectionVideo.loadData(false);
        } else if (this.showLive) {
          this.$refs.collectionLive.loadData(false);
        } else if (this.showWeHealth) {
          this.$refs.collectionHealth.loadData(false);
        }
      },
      changeLoad() {
        this.allLoaded = true;
      },
      initData() {
        this.loading = false;
        this.allLoaded = false;
        this.preDate = '';
        this.newDate = '';
      },
    },

    created() {
    },
    mounted() {
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../common/style.css';

  .my-collection {
    height: 50px;
    padding: 0;
    position: fixed;
    top: 0px;
    z-index: 2;
    width: 100%;
  }

  .users-bg3-l, .users-bg3-r, .users-bg3-f {
    height: calc(100% - 15px);
    text-align: -webkit-center;
    width: 33%;
  }

  .is-selected {
    height: 100%;
    width: 100%;
    color: #26a2ff;
    border-bottom: 2px solid #03a9f4;
  }

  .users-bg3-l {
    border-right: none;
  }

  .live-talent {
    text-align: left;
    position: fixed;
    width: 100%;
    overflow: scroll;
  }
</style>
