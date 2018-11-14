<template>
    <div class="videolist">
        <div style="height: 80px;position:fixed;width: 100%;z-index:999">
            <div class="videoSearch">
                <div class="mint-searchbar searchBG1">
                    <div style="width:100%">
                    <div class="mint-searchbar-inner searchBG2">
                        <i class="mintui mintui-search" style="margin-top:3px;color: #42b3ff;"></i>
                        <form action="" style="width: 100%">
                          <input type="search"
                                 v-model="searchContent"
                                 placeholder="请输入关键字搜索视频"
                                 class="mint-searchbar-core"
                                 @keyup.enter="searchVideoList"
                                 style="margin-left:2px;font-size: 1.4rem;">
                          <input class="just-for-no-refresh" type="text" style="display:none" />
                        </form>
                    </div>
                    <a class="mint-searchbar-cancel" style="display: none;">取消</a>
                  </div>
                </div>
            </div>
            <div class="Type video-list">
                <div class="mint-tab" style="width:100%">
                    <div style="width:100%">
                      <div :style="[baseStyle, touch.slideEffect]" >
                        <a :key="Index" v-for="(Item, Index) in subjectList"
                           :name="Item.Id" :index="Index" :class='{active: Index == iscur}'
                           style="padding: 5px 5px;float: left;"
                           @touchstart.stop.prevent='touchStart($event)' @touchmove.stop.prevent='touchMove' @touchend.stop.prevent='touchEnd'
                           ref="innerLabel"
                        >{{Item.SubjectName}}</a>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="video-scroll-space"></div>
        <div @scroll="handleScroll($event)" ref="videoList" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="allLoaded"  class="scroll-div" :style="scrollStyle">
          <ul>
              <li  style="padding: 0"
                   :key="index"
                   v-for="(item,index) in list"
              >
                  <video-item
                    ref="videoItem"
                    :scrollTop="scrollTop"
                    :dataInfo="item"
                    :index="index"
                    :isEnded="true"
                    @video-play = "videoPlay"
                  ></video-item>
              </li>
          </ul>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
          </p>
        </div>
    </div>
</template>

<script>
import VideoItem from '@/components/video/VideoItem';
import LiveItem from '@/components/livelist/LiveItem';
import {setStore, getStore} from '../store/mlocalstorge';

var maxLength = 0;
var timeOut;
var startTouchedTime;
var endTouchedTime;

export default {
    components: {
        VideoItem, LiveItem
    },
    data() {
        return {
            list: [],
            bottomStatus: '',
            topStatus: '',
            wrapperHeight: 0,
            translate: 0,
            moveTranslate: 0,
            PageIndex: 1,
            PageSize: 10,
            subjectList: [],
            subjectId: -1,
            SortType: 1,
            VideoTagId: -1,
            searchContent: "",
            iscur: 0,
            touch: {
                startX:0,//开始触摸的位置
                moveX:0,//滑动时的位置
                endX:0,//结束触摸的位置
                disX:0,//移动距离
                slideEffect: {
                  transform: "translateX(0px)"
                },//滑动时的效果,使用v-bind:style="deleteSlider"
                moveDistance: 0 //偏移总量
            },
            baseStyle: {
              width:"2000px",
              height: "30px"
            },
            scrollStyle: {},
            loading: false,
            scrollTop: 0,
            allLoaded: false,
            preDate: '',
            newDate: '',
        };
    },

    methods: {
        touchStart:function(ev) {
            ev = ev || event;
            timeOut = setTimeout(() => {
                this.chooseSubject(ev);
            },200);
            startTouchedTime = new Date().getTime();
            if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                this.touch.startX = ev.touches[0].clientX; // 记录开始位置
            }
            if (maxLength == 0) {
              this.$refs.innerLabel.forEach((item, index, array) => {
                  maxLength += item.offsetWidth
              })
              if (maxLength == 0) {
                  maxLength = 0.001;
              }
            }
        },
        touchMove:function(ev) {
            ev = ev || event;
            endTouchedTime = new Date().getTime();

            if (ev.touches.length == 1) {
                //滑动时距离浏览器左侧的距离
                this.touch.moveX = ev.touches[0].clientX;
                //实时的滑动的距离-起始位置=实时移动的位置
                this.touch.disX = this.touch.moveX - this.touch.startX;
                var time = endTouchedTime - startTouchedTime;
                if ((Math.abs(this.touch.disX) > 60 && (time < 200)) || time >= 200) {
                    clearTimeout(timeOut);
                    startTouchedTime = 0;
                }

                if ((this.touch.moveDistance + this.touch.disX) >= 0) {
                    this.touch.slideEffect.transform = 'translateX(0px)';
                } else if ((this.touch.moveDistance + this.touch.disX - document.documentElement.clientWidth + maxLength) <= 0) {
                    this.touch.slideEffect.transform = 'translateX('+ (document.documentElement.clientWidth - maxLength - 10) + 'px)';
                } else {
                    this.touch.slideEffect.transform = 'translateX('+ (this.touch.moveDistance + this.touch.disX) + 'px)';
                }
            }
        },
        touchEnd:function(ev){
            endTouchedTime = new Date().getTime();
            if((endTouchedTime - startTouchedTime) < 200 && startTouchedTime != 0){
                return false;
            }

            ev = ev || event;
            if(ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                this.touch.disX = endX - this.touch.startX;
                this.touch.moveDistance += this.touch.disX;

                if (this.touch.moveDistance >= 0) {
                    this.touch.moveDistance = 0;
                } else if (this.touch.moveDistance - document.documentElement.clientWidth + maxLength <= 0) {
                  this.touch.moveDistance = document.documentElement.clientWidth - maxLength;
                }
                if(this.touch.moveDistance >= 0) {
                    this.touch.slideEffect.transform = 'translateX(0px)';
                } else if ((this.touch.moveDistance - document.documentElement.clientWidth + maxLength) <= 0) {
                    this.touch.slideEffect.transform = 'translateX('+ (document.documentElement.clientWidth - maxLength - 10) + 'px)';
                } else {
                    this.touch.slideEffect.transform = 'translateX('+ (this.touch.moveDistance) + 'px)';
                }
            }
        },
        // 搜索框搜索
        searchVideoList() {
            this.PageIndex = 1;
            let params = {
                "Keyword": this.searchContent,
                "SortType": this.SortType,
                "VideoTagId": this.VideoTagId,
                "SubjectId": this.subjectId,
                "PageIndex": this.PageIndex,
                "PageSize": this.PageSize,
            }
            this.api.getSearchVideos(params).then(res => {
                this.list = [];
                setTimeout(() => {
                  this.list = res.Data.videos;
                  if(res.Data.videoAdvertisement != null && res.Data.videoAdvertisement != '') {
                    this.list.push(res.Data.videoAdvertisement);
                  }
                }, 100)
            });
        },

        // 点击类别搜索
        chooseSubject(event) {
            this.iscur = event.target.getAttribute('Index');
            // 过滤数据
            this.subjectId = event.target.getAttribute('name');
            this.PageIndex = 1;
            let params = {
                "Keyword": this.searchContent,
                "SortType": this.SortType,
                "VideoTagId": this.VideoTagId,
                "SubjectId": this.subjectId,
                "PageIndex": this.PageIndex,
                "PageSize": this.PageSize,
            }

            this.api.getSearchVideos(params).then(res => {

                this.list = [];
                setTimeout(() => {
                    this.list = res.Data.videos;
                    if(res.Data.videoAdvertisement != null && res.Data.videoAdvertisement != '') {
                        this.list.push(res.Data.videoAdvertisement);
                    }
                }, 100)

            });
            this.$emit('videolistfinish');
        },
        loadMore() {
            this.allLoaded = true;
            this.loading = true;
            setTimeout(() => {
                this.loadBottom();
            }, 800);
        },
        loadBottom() {
            this.PageIndex++;
            let params = {
                "Keyword": this.searchContent,
                "SortType": this.SortType,
                "VideoTagId": this.VideoTagId,
                "SubjectId": this.subjectId,
                "PageIndex": this.PageIndex,
                "PageSize": this.PageSize,
            }

            this.api.getSearchVideos(params).then(res => {
                for (let i = 0; i < res.Data.videos.length; i++) {
                    this.list.push(res.Data.videos[i]);
                }
                if(res.Data.videoAdvertisement != null && res.Data.videoAdvertisement != '') {
                    this.list.push(res.Data.videoAdvertisement);
                }
                this.loading = false;
                if (res.Data.videos.length > 0 || res.Data.videoAdvertisement.length > 0) {
                    this.allLoaded = false;
                }
            });

        },
        handleScroll (event) {
            var distance = event.target.scrollTop;
            var countHeight = 0, tempHeight;
            //判断当前元素是否处于视频的中间区域.
            this.$refs.videoItem.forEach(item => {
                tempHeight = countHeight + item.$el.offsetHeight;
                if (distance - 2 >= countHeight) {
                    //表征视频向上超出可见范围, 此时隐藏加停止.
                    item.handleScrollOut();
                } else if (countHeight > (distance + this.scrollStyle.height.replace("px", "") / 1.0 - 2)) {
                    //表征视频上边缘向下超出可见范围, 此时停止 不隐藏.
                    item.handleScrollOut();
                } else if (countHeight > distance - 2 && (distance + this.scrollStyle.height.replace("px", "") / 1.0 - 2) > tempHeight) {
                    item.handleScrollIn();
                }
                countHeight += item.$el.offsetHeight;
            })
        },
        videoPlay(videoId) {
            this.$refs.videoItem.forEach(item => {
                item.pauseOtherVideo(videoId);
            })
        },
    },
    created() {

    },
    mounted() {
        let params = {
            "Keyword": "",
            "SortType": this.SortType,
            "VideoTagId": this.VideoTagId,
            "SubjectId": this.subjectId,
            "PageIndex": this.PageIndex,
            "PageSize": this.PageSize,
        }
        this.api.getSearchVideos(params).then(res => {
            this.list = res.Data.videos;
            if(res.Data.videoAdvertisement != null && res.Data.videoAdvertisement != '') {
                this.list.push(res.Data.videoAdvertisement);
            }
        });

        params.PageSize = 1000;
        this.api.getSubjects(params).then(res => {
            let allSubject = {
                "Id": -1,
                "SubjectName": "全部",
            }
            this.subjectList.push(allSubject);
            for(let i=0;i<res.Data.Data.length;i++) {
                this.subjectList.push(res.Data.Data[i]);
            }
        });
        this.scrollStyle.height = document.documentElement.clientHeight - 80 - 2 - 55 + 'px';
        this.$store.state.shareData.title = "医邦视频";
        this.$store.state.shareData.description = "专业的医学健康视频";
    },
    beforeDestroy() {
        this.$store.state.shareData.title = "";
        this.$store.state.shareData.description = "";
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../common/style.css';
.scroll-div{
    position: fixed;
    width: 100%;
    overflow: scroll;
    top: 82px;
}
.searchBG1 {
    padding: 4px 6px 0px 6px;
    background-color: #FFF;
}
.searchBG2 {
    background-color: #f3f3f3;
}
.video-scroll-space {
  position: fixed;
  top: 78px;
  width:100%;
  height: 2px;
  background-color: white;
}
</style>
