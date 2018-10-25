<template>
  <div class="weHealthDetail">
    <div class="page-wrap tabb">
      <div class="wjklist2 brw bb">
        <div v-if="WeHealthData.workRoomDynamicModeId == 1">
          <div v-html="html"></div>
        </div>
        <div class="type2" v-if="WeHealthData.workRoomDynamicModeId == 0">
          <div class="wjklist2-title">
            <div class="title-r">
              <img :src="WeHealthData.WorkRoom.Picture.Url">
            </div>
            <div class="wjklist2-title-l">
              <div class="t1">{{WeHealthData.WorkRoom.Name}}</div>
              <div class="t2">{{WeHealthData.createTime}}
                <div class="gzs-tabxq">
                  {{WeHealthData.customerCommentCounts}}评论
                </div>
              </div>
            </div>
          </div>
          <div class="wjklist2-contect">
            <div class="t1">{{WeHealthData.title}}</div>
            <div class="t2" v-html="WeHealthData.content"></div>
            <p v-if="WeHealthData.fileList.length > 0">
            <div class="content-main">
              <div :key="videoIndex" v-for="(videoItem,videoIndex) in WeHealthData.fileList">
                <video class="videoBackground" :src="videoItem.Url"
                       :poster="videoItem.ThumbUrl"
                       preload="preload" controls="controls" width=100%     height="200px"
                       v-if="WeHealthData.resourceTypeId == 2">
                </video>
                <img :src="videoItem.Url" style="width: 60%;margin-right: 2%" v-else/>
              </div>
            </div>
            </p>
          </div>
        </div>
        <div class="wjklist2-zx">
          <button class="button-danger mint-button--normal" style="padding: 6px 15px;" @click="weThank">
              <span class="mint-button-icon">
                <img src="../../images/wjkzx.png" height="20" width="20">
              </span>
            <label class="mint-button-text" style="font-size: 1.6rem;">
              致谢
            </label>
          </button>
        </div>
      </div>
      <!-- 微健康评论列表-->
      <div class="mint-content" style="text-align: left;padding:5px 10px;font-size: 1.3rem;background-color: #eee">评论
      </div>
      <div class="wjklist-pl" v-if="noteList.length > 0">
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" ref="loadMore" :bottom-all-loaded="allLoaded">
          <div class="pl" :key="Index" v-for="(Item,Index) in noteList" style="text-align:left">
            <div class="pinglun-tx" style="height:42px">
              <img :src="Item.commenterHeaderImgUrl" v-if="Item.commenterHeaderImgUrl != ''"
                   style="width:42px;height:42px;border-radius:42px">
              <img src="../../assets/default_avatar.png" v-else>
            </div>

            <div class="pinglun-tab">
              <div class="pl-title">{{Item.commenter}}</div>
              <div class="pinglun-dz">
                <img @click="cancelPraise(Item.Id, Index)" src="../../images/dz-1.png" v-if="Item.isPraise">
                <img @click="enterPraise(Item.Id, Index)" src="../../images/dz-2.png" v-else>
                <span class="pl-dz-num">{{Item.customerPraiseCount}}</span>
              </div>
            </div>
            <div class="pinglun-zw" @click="replayComment(Item.Id)">
              <div class="mb5" style="width:100%;word-break: break-all; word-wrap:break-word;">{{Item.commentContent}}
              </div>
              <div class="hftime">{{Item.commentDateTime}}· </div>
              <div class="hfcs">{{Item.replyCount}}回复</div>
            </div>
          </div>
        </mt-loadmore>
      </div>
      <div v-else>
        <div class="no-comment-div" style="padding: 20px 0px;background-color: white;">
          <img style="width: 85px;" src="../../images/no-comment.png">
          <div style="font-size: 1.3rem;color: #757575;">等待你的评论, 快来抢沙发!</div>
        </div>
      </div>
      <!-- 微健康评论-->
      <div class="mint-tabbar is-fixed">
        <div class="plbar-1" style="width: 80%">
          <div class="pl-input">
            <form @submit.prevent="submit">
              <input v-model="comments" class="pl-input1">
              <img src="../../images/pl-bj.png" class="pl-bj" style="margin-left: 8px">
              <input type="submit" class="pl-input2"/>
            </form>
          </div>
        </div>
        <div class="plbar-2" style="width: 15%">
          <img class="mr20" @click="cancelCollection" src="../../images/pl-sc-1.png" v-if="collect">
          <img class="mr20" @click="enterCollection" src="../../images/pl-sc-0.png" v-else>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import * as constant from '../../configs/constant';
  import Modal from '@/components/modal/Modal';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  import {Toast} from 'mint-ui';
  import {getWXPayInfo} from '../../utils/WXPay';
  export default {
    components: {
      Modal
    },
    data() {
      return {
        WeHealthData: Object,
        fileList: [],
        noteList: [],
        comments: "",
        collect: false,
        pageIndex: 1,
        hasNextPage: true,
        allLoaded: false,
        html: null,
      }
    },
    methods: {
      //评论下拉加载更多
      loadBottom() {
        if (!this.hasNextPage) {
          this.allLoaded = true;
        } else {
          this.allLoaded = false;
          this.loadComments(10);
        }
        this.$refs.loadMore.onBottomLoaded();
      },
      //加载评论
      loadComments(size) {
        if (!this.hasNextPage) {
          return;
        }

        size = size < 5 ? 5 : size;

        let params = {
          "CommentsID": this.$route.params.WeHealthID,
          "CommentsType": 9,
          "PageIndex": this.pageIndex,
          "PageSize": size
        }
        //评论
        this.api.getVideoNoteList(params).then(res => {
          var tempList = res.Data.Data;
          this.hasNextPage = res.Data.HasNextPage;
          tempList.forEach(item => {
            if (!("commenterHeaderImgUrl" in item)) {
              item.commenterHeaderImgUrl = '';
            }
            this.noteList.push(item);
          })
          this.pageIndex++;
        });
      },
      replayComment(commentId) {
        this.$router.push({path: '/ReplayComment/weHealth/' + commentId + '/' + this.WeHealthData.studioStatusId});
      },
      // 评论点赞、取消点赞
      enterPraise(PraiseID, index) {
        let params = {
          "PraiseID": PraiseID,
          "PraiseType": 12,
          "IsPraise": true,
        }
        this.api.PariseVideo(params).then(res => {
          let item = this.noteList[index];
          // 点赞成功
          if (res.Result == 1) {
            item.isPraise = true;
            item.customerPraiseCount = res.Data.praiseCount;
            this.noteList.splice(index, 1, item);
          } else {
            Toast(res.ResultMessage);
          }
        });
      },
      cancelPraise(PraiseID, index) {
        let params = {
          "PraiseID": PraiseID,
          "PraiseType": 12,
          "IsPraise": false,
        }
        this.api.PariseVideo(params).then(res => {
          // 取消点赞
          let item = this.noteList[index];
          if (res.Result == 1) {
            item.isPraise = false;
            item.customerPraiseCount = res.Data.praiseCount;
            this.noteList.splice(index, 1, item);
          } else {
            Toast(res.ResultMessage);
          }
        });
      },
      // 致谢
      weThank() {
        this.$router.push({path: '/pay/CustomerAdmire/' + this.$route.params.WeHealthID + "/2104"});
      },
      // 收藏微健康
      enterCollection() {
        let params = {
          "CollectID": this.$route.params.WeHealthID,
          "CollectType": 9,
          "IsCollect": true,
        }
        this.api.CollectVideo(params).then(res => {
          // 收藏成功
          if (res.Result == 1) {
            Toast("收藏成功！");
            this.collect = true;
          } else {
            Toast("收藏失败，请稍后再试！");
          }
        });
      },
      cancelCollection() {
        let params = {
          "CollectID": this.$route.params.WeHealthID,
          "CollectType": 9,
          "IsCollect": false,
        }
        this.api.CollectVideo(params).then(res => {
          // 收藏成功
          if (res.Result == 1) {
            Toast("取消收藏！");
            this.collect = false;
          } else {
            Toast("取消收藏失败，请稍后再试！");
          }
        });
      },
      // 评论微健康
      submit: function (event) {
        if (this.comments.trim() == '') {
          Toast("内容不能为空");
          this.comments = '';
          return false;
        }
        let userInfo = window.localStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        let commonParams = {
          "studioStatusId": this.$route.params.WeHealthID,
          "userId": userInfo.UserId,
          "replyerTo": 0,
          "content": this.comments,
        }
        this.api.createWorkRoomDynamicReply(commonParams).then(res => {
          if (res.Result == 1) {
            Toast("发表评论成功！");
            this.pageIndex = 1;
            this.hasNextPage = true;
            this.allLoaded = false;
            this.noteList = [];
            this.loadComments(10);
            this.comments = '';
          } else {
            Toast("评论失败，请稍后再试");
          }
        });
      },
    },
    props: {
      teamInfo: Object,
      index: Number,
      type: Number,
    },
    mounted() {
      let params = {
        "Id": this.$route.params.WeHealthID,
      }
      this.api.getWorkRoomDynamicById(params).then(res => {
          if (res.Data.workRoomDynamicModeId == 1) {
              params = Object.assign({
                FlagLabel: true,
              }, params);
              this.api.getWorkRoomDynamicById(params).then(res2 => {
                this.WeHealthData = res2.Data;
                this.html = res2.Data.content;
              })
          }
          this.collect = res2.Data.isCollection;
          this.$store.state.shareData.title = res2.Data.title;
          this.$store.state.shareData.description = res2.Data.content;
          this.$store.state.shareData.imgUrl = res2.Data.ThumbUrl;

      });
      this.loadComments(10);
    },
    destroyed() {
      this.$store.state.shareData.title = "";
      this.$store.state.shareData.description = "";
      this.$store.state.shareData.imgUrl = "";
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .type2 {
    .wjklist2-title {
      height: 50px;
      position: relative;
      .title-r {
        position: absolute;
        top: 5px;
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
        top: 5px;
        position: absolute;
        .t1 {
          margin: 0px;
        }
      }
    }
    .wjklist2-contect {
      padding: 0 2% 2%;
      text-align: left;
      .t1 {
        font-size: 1.5rem;
      }
      .t2 {
        font-size: 1.3rem;
        color: #888;
        margin-top: 5px;
      }
      .content-main {
        margin-top: 5px;
      }
    }
  }
</style>
