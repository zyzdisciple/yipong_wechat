<template>
  <div class="studio-related-video-list"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="allLoaded"
       infinite-scroll-immediate-check="immediateCheck"
  >
    <div class="video-item"
         @click="clickVideoDetail(item.VideoId, item.VideoName)"
         :key="item.VideoId"
         v-for="(item, index) in VideoList"
    >
      <div class="video-item-img" :style="{backgroundImage:'url(' + item.VideoImageUrl + ')'}">

      </div>
      <div class="video-item-content">
        <div class="video-title text-over-ellipsis">{{item.VideoName}}</div>
        <div class="video-content">
          <pre class="show-three-lines">{{item.VideoText}}</pre>
        </div>
      </div>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
  import VideoElement from '../video/VideoElement';
  export default {
    components: {
      VideoElement,
    },
    data() {
      return {
        VideoList: [],
        PageIndex: 1,
        PageSize: 10,
        allLoaded: false,
        loading: false,
        immediateCheck: true,
      }
    },
    mounted() {
    },
    methods: {
      loadMore() {
        this.allLoaded = true;
        this.loading = true;
        this.immediateCheck = false;
        setTimeout(() => {
          this.loadData();
        }, 800);
      },
      loadData() {
        //工作室相关视频
        let videoParams = {
          "WorkRoomId": this.$route.params.StudioID,
          "PageIndex": this.PageIndex,
          "PageSize": this.PageSize,
        }
        this.api.getWorkRoomVideos(videoParams).then(res => {
          res.Data.forEach((item) => {
            this.VideoList.push(item);
          })
          this.loading = false;
          if (res.Data.length == 0) {
            this.allLoaded = true;
          } else {
            this.allLoaded = false;
            this.immediateCheck = true;
            this.PageIndex++;
          }
        });
      },
      // 进入视频详情
      clickVideoDetail(VideoID, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '视频详情';
        this.$router.push({path: '/VideoDetail/' + VideoID + '/' + shareTitle})
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../../common/style.css';

  .studio-related-video-list {
    padding: 10px;
    .video-item {
      height: 80px;
      width: 100%;
      margin-bottom: 10px;
      .video-item-img {
        width: 120px;
        height: 100%;
        float: left;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .video-item-content {
        width: calc(100% - 130px);
        float: left;
        margin-left: 10px;
        text-align: left;
        .video-title {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }
        .video-content {
          color: #888;
          font-size: 1.3rem;
          line-height: 16px;
          width: 100%;
        }
      }
    }
  }
</style>
