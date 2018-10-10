<template>
  <div class="Video">
    <div class="mint-content" v-if="dataInfo.AdType == 1">
      <div class="mint-content-video" v-if="dataInfo.AdType == 1">
        <a :href="dataInfo.Source"><img :src="dataInfo.ADImageUrl"></a>
      </div>
    </div>
    <div class="mint-content" v-if="dataInfo.AdType == 4">
      <div class="mint-content-video" @click="videoDetail(dataInfo.Source, dataInfo.Title)">
        <img :src="dataInfo.ADImageUrl">
      </div>
    </div>
    <div class="mint-content content-video-play" v-else>
      <div class="mint-content-video">
        <video-element
          ref="videoItem"
          :videoUrl="dataInfo.CloudUrl"
          :posterImageUrl="dataInfo.VideoImageUrl"
          :videoId="dataInfo.VideoID"
          :isList=true
          @video-play="videoPlay"
          :replay="true"
          :duration="dataInfo.Duration"
        ></video-element>
        <div class="mint-content-video-titlebg"
             style="background:-webkit-linear-gradient(top, rgba(35, 35 ,35, 0.8), rgba(180, 180, 180, 0))">
          <div class="mint-content-video-title"
               style="text-align:left;width:300px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
            {{dataInfo.VideoName}}
          </div>
        </div>
      </div>
      <div class="mint-content-video-banner">
        <div class="mint-content-video-share" @click="clickvideodetail(dataInfo.VideoName)">
          <div class="mint-content-video-share-view"><img src="../../images/view@1x.png">{{dataInfo.PreviewCount}}</div>
        </div>
        <div class="mint-content-video-share" @click="clickvideodetail(dataInfo.VideoName)">
          <div class="mint-content-video-share-view"><a><img src="../../images/chat@1x.png"></a>{{dataInfo.CommentCount}}
          </div>
        </div>
        <div class="mint-content-video-share">
          <div class="mint-content-video-share-view" v-if="dataInfo.IsCollect">
            <img src="../../images/pl-sc-1.png" @click="collection($event)">
          </div>
          <div class="mint-content-video-share-view" v-else>
            <img src="../../images/pl-sc-0.png" @click="collection($event)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import * as constant from '../../configs/constant';
  import VideoElement from './VideoElement';
  export default {
    components: {
      VideoElement,
    },
    data() {
      return {
        isStop: false,
      }
    },
    props: {
      index: Number,
      dataInfo: Object,
      scrollTop: {
        type: [String, Number],
        default() {
          return 0;
        }
      }
    },
    methods: {
      // 视频详情
      clickvideodetail(shareTitle) {
        shareTitle = shareTitle ? shareTitle : '视频详情';
        if (shareTitle == "" || shareTitle == null) {
          shareTitle = "视频详情";
        }
        this.$router.push({path: '/VideoDetail/' + this.dataInfo.VideoID + '/' + shareTitle})
      },
      // 广告视频详情
      videoDetail(VideoID, title) {
        if (title == "" || title == null) {
          title = "广告";
        }
        this.$router.push({path: '/VideoDetail/' + VideoID + '/' + title})
      },
      // 收藏，取消收藏
      collection(event) {
        let params = {
          "CollectID": this.dataInfo.VideoID,
          "CollectType": 2,
          "IsCollect": !this.dataInfo.IsCollect,
        }
        var top = event.clientY;
        this.api.CollectVideo(params).then(res => {
          if (res.ResultMessage == "Success") {
            if (this.dataInfo.IsCollect) {
              this.generateToastMessage("取消收藏成功!", top);
            } else {
              this.generateToastMessage("收藏成功!", top);
            }
            this.dataInfo.IsCollect = !this.dataInfo.IsCollect;
          } else {
            this.generateToastMessage("操作失败,请稍后再试!", top);
          }
        }, error => {
          this.generateToastMessage("网络连接失败,请稍后再试!", top);
        }).catch(error => {
          alert(error);
        });
      },
      handleScrollOut(isShow) {
        var item = this.$refs.videoItem;
        if (item) {
          item.videoScrollOut(isShow);
        }

      },
      generateToastMessage(message, height) {
        Toast({
          message: message,
          className: "toast-collect",
          duration: 1600,
        });
        setTimeout(() => {
          var dom = (Array.from(document.getElementsByClassName("toast-collect")))[0];
          dom.style.top = height + 'px';
          dom.style.display = 'block';
          setTimeout(() => {
            dom.style.display = 'none';
          }, 1500);
        }, 5)
      },
      handleScrollIn() {
        var item = this.$refs.videoItem;
        item.videoScrollIn();
      },
      videoPlay(videoId) {
        this.$emit("video-play", videoId)
      },
      pauseOtherVideo(videoId) {
        var item = this.$refs.videoItem;
        item.pausePlayedVideo(videoId);
      },
    },

    computed: {},
    mounted(){
    },
    data() {
      return {
        currentTime: 0,
        videoHeight: 0,
      };
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../common/style.css';

  .mint-content-video-title {
    float: left;
  }

  .mint-content-ended-show {
    position: absolute;
    top: 0px;
    z-index: 1;
  }
</style>
