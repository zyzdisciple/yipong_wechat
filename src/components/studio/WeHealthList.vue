<template>
  <div class="weHealthList" v-show="init">
    <div v-if="hasInited">
      <div v-if="weiList.length > 0">
        <div class="zbyg-list" :key="Index" v-for="(Item,Index) in weiList">
          <div class="type1" @click="weiDetail(Item.studioStatusId, Item.title)"
               v-if="Item.workRoomDynamicModeId == 1">
            <div class="wjklist2-title">
              <img :src="Item.fileList[0].Url" v-if="Item.fileList.length > 0"/>
            </div>
            <div class="wjklist2-contect">
              <span class="zbygbt text-over-ellipsis">{{Item.title}}</span>
              <span class="zbygsbt show-three-lines" v-html="Item.content"></span>
            </div>
          </div>
          <div class="type2" @click="weiDetail(Item.studioStatusId, Item.title)"
               v-if="Item.workRoomDynamicModeId == 0">
            <div class="wjklist2-title">
              <div class="title-r">
                <img :src="Item.WorkRoom.Picture.Url">
              </div>
              <div class="wjklist2-title-l">
                <div class="t1">{{Item.WorkRoom.Name}}</div>
                <div class="t2">{{Item.createTime}}
                  <div class="gzs-tabxq">
                    {{Item.customerCommentCounts}}评论
                  </div>
                </div>
              </div>
            </div>
            <div class="wjklist2-contect">
              <div class="content-title text-over-ellipsis">{{Item.title}}</div>
              <div class="content-text-content show-three-lines" v-html="Item.content"></div>
              <div class="mt5" v-if="Item.fileList.length > 0">
                <div v-if="Item.resourceTypeId == 2">
                  <img :src="imgItem.ThumbUrl" style="width: 60%;margin-right: 2%" :key="imgIndex"
                       v-for="(imgItem,imgIndex) in Item.fileList">
                </div>
                <div v-else>
                  <img :src="imgItem.Url" style="width: 30%;margin-right: 2%" :key="imgIndex"
                       v-for="(imgItem,imgIndex) in Item.fileList">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import * as constant from '../../configs/constant';
  import Modal from '@/components/modal/Modal';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  import {Toast, Indicator} from 'mint-ui';
  import {getWXPayInfo} from '../../utils/WXPay';
  export default {
    components: {
      Modal
    },
    data() {
      return {
        weiList: [],
        hasInited: false,
        init: false,
      }
    },
    methods: {
      //进入微健康详情
      weiDetail(id, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '微健康';
        this.$router.push({path: '/WeHealthDetail/' + id + '/' + shareTitle})
      },
    },
    props: {
      teamInfo: Object,
      index: Number,
      type: Number,
    },
    mounted() {
      this.$store.state.shareData.title = "微健康";
      this.$store.state.shareData.description = "医生分享专业的医学知识";
      let workRoomID = -1;
      if (this.$route.params.StudioID > 0) {
        workRoomID = this.$route.params.StudioID;
      }
      let params = {
        "WorkRoomId": workRoomID,
        "WorkRoomDynamicTypeId": -1,
        "PageIndex": 1,
        "PageSize": 100,
      };
      this.api.getWorkRoomDynamics(params).then(res => {
        this.weiList = res.Data.Data;
        this.hasInited = true;
        this.init = true;
      });
    },
    destroyed() {
      this.$store.state.shareData.title = "";
      this.$store.state.shareData.description = "";
    },
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .weHealthList {
    .zbyg-list {
      margin-bottom: 6px;
      height: auto;
      .type1 {
        height: 100px;
        .wjklist2-title {
          width: 100px;
          float: left;
          overflow: hidden;
          height: 80px;
          padding: 2% 0;
          img {
            width: inherit;
          }
        }
        .wjklist2-contect {
          width: 60%;
          text-align: left;
          float: left;
          .zbygbt {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }
          .zbygsbt {
            color: #888;
            font-size: 1.2rem;
          }
        }
      }
      .type2 {
        width: 100%;
        .wjklist2-title {
          height: 60px;
          position: relative;
          .title-r {
            position: absolute;
            top: 10px;
            left: 2%;
            img {
              height: 40px;
              width: 40px;
              border-radius: 40px;
            }
          }
          .wjklist2-title-l {
            height: 55px;
            margin: 0;
            text-align: left;
            left: calc(50px + 2%);
            position: absolute;
          }
        }
        .wjklist2-contect {
          padding: 0 2% 2%;
          text-align: left;
          .content-title {
            font-size: 1.4rem;
          }
          .content-text-content {
            word-break: break-all;
            word-wrap: break-word;
            color: #888;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
