<template>
  <div class="studio-related-video-list">
    <div class="video-item"
         @click="clickVideoDetail(item.Id, item.VideoName)"
         :key="item.Id"
         v-for="(item, index) in list"
    >
      <div class="video-item-img" :style="{backgroundImage:'url(' + item.VideoImageUrl + ')'}">

      </div>
      <div class="video-item-content">
        <div class="video-title text-over-ellipsis">{{item.VideoName}}</div>
        <div class="video-content">
          <pre class="show-three-lines">{{item.VideoText}}</pre>
        </div>
        <div class="collect-button">
          <button @click.stop="cancelCollection(item.Id)" class="button-primary-gz">取消收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            list: [],
            PageIndex: 0,
          PageSize: 10,
            init: false,
        };
    },
    methods: {
        //视频详情
        videoDetail(VideoID, shareTitle) {
            shareTitle = shareTitle ? shareTitle : '视频详情';
            this.$router.push({ path: '/VideoDetail/' + VideoID + '/' + shareTitle})
        },
        // 取消收藏
        cancelCollection(VideoID) {
            let params = {
                "CollectID": VideoID,
                "CollectType": 2,
                "IsCollect":  false,
            }
            this.api.CollectVideo(params).then( res=> {
                if(res.Result == 1) {
                    for(let i=0;i<this.list.length;i++) {
                        if(VideoID == this.list[i].Id) {
                            this.list.splice(i, 1);
                        }
                    }
                } else {
                    Toast("取消收藏失败，请稍后再试！");
                }
            });
        },
        loadData(initLoad) {
            this.PageIndex = initLoad ? 1 : this.PageIndex + 1;
            let params = {
              "PageIndex": this.PageIndex,
              "PageSize": this.PageSize,
            };
            if (initLoad) {
                Indicator.open();
            }
            this.api.getVedioCollectList(params).then(res => {
                if (initLoad) {
                    this.list = res.Data;
                    Indicator.close();
                } else if (res.Data && res.Data.length > 0) {
                    res.Data.forEach(item => {
                        this.list.push(item);
                    })
                } else {
                    this.$emit('changeAllLoadStatus');
                }
                this.init = true;
            });
        },
      // 进入视频详情
      clickVideoDetail(VideoID, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '视频详情';
        this.$router.push({path: '/VideoDetail/' + VideoID + '/' + shareTitle})
      },
    },
    mounted() {
        this.loadData(true);
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
        position: relative;
        .video-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
          width: calc(100% - 70px);
        }
        .video-content {
          color: #888;
          font-size: 1.3rem;
          line-height: 16px;
          width: 100%;
        }
        .collect-button {
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }
    }
  }
</style>
