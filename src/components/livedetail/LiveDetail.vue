<template>
  <div class="liveDetail" v-show="init">
    <div class="mint-content live-detail-no-scroll" style="position: fixed;z-index: 1;width: 100%">
      <div class="mint-content-videoxq">
        <video-element
          :videoUrl = "liveInfo.NetEaseUrl"
          :videoId = "liveInfo.Id"
          :listenPlayCount = "false"
          :posterImageUrl = "liveInfo.liveImg"
          :playControlsInOutside = "true"
          ref = "videoItem"
        ></video-element>
      </div>
    </div>
    <div>
      <div class="scroll-div"
           :style="scrollStyle"
           v-infinite-scroll="loadMore"
           infinite-scroll-immediate-check="true"
           infinite-scroll-disabled="allLoaded"
      >
        <div class="mint-content workroom-info">
          <div class="mint-videoxq-title">
            {{liveInfo.Title}}
          </div>
          <div class="mint-videoxq-content">
            <div class="leader">
              主讲人：{{liveInfo.Anchor}}
            </div>
            <button class="button-guanzhu" @click="subscribeRoom" v-if="!subscribe">关注</button>
          </div>
          <div class="mint-videoxq-content-describe m10">
            <pre>{{liveInfo.Description}}</pre>
          </div>
          <div class="mint-videoxq-share">
            <button class="button-danger" @click="videoLive" v-if="liveInfo.LiveStreamStateId == 1">
              观看直播
            </button>
            <button class="button-danger" @click="LiveReplay"
                    v-else-if="liveInfo.LiveStreamStateId == 2">观看历史直播
            </button>
            <button class="button-danger" v-else-if="liveInfo.LiveStreamStateId == 3">直播已被禁用</button>
            <button class="button-danger" @click="LiveReplay"
                    v-else-if="liveInfo.LiveStreamStateId == 4">观看历史直播
            </button>
          </div>
        </div>
        <!--评论-->
        <div class="mint-content" style="text-align: left;padding:5px 10px;font-size: 1.3rem;background-color: #eee">
          留言
        </div>
        <div class="mint-content" style="text-align:left;padding-left:10px;" v-if="noteList.length > 0">
          <ul>
            <li :key="noteItem.Id" v-for="(noteItem,noteIndex) in noteList">
              <div class="pl">
                <div class="pinglun-tx" style="height:42px">
                  <img :src="noteItem.commenterHeaderImgUrl" v-if="noteItem.commenterHeaderImgUrl != null">
                  <img src="../../assets/default_avatar.png" v-else>
                </div>
                <div class="pinglun-tab">
                  <div class="pl-title">{{noteItem.commenter}}</div>
                  <div class="pinglun-dz">
                    <img @click="cancelPraise(noteItem.Id, noteIndex)" src="../../images/dz-1.png"
                         v-if="noteItem.isPraise">
                    <img @click="enterPraise(noteItem.Id, noteIndex)" src="../../images/dz-2.png" v-else>
                    <span class="pl-dz-num">{{noteItem.customerPraiseCount}}</span>
                  </div>
                </div>
                <div class="pinglun-zw" @click="replayComment(noteItem.Id)">
                  <div class="mb5">{{noteItem.commentContent}}</div>
                  <div class="hftime">{{noteItem.commentDateTime}} </div>
                  <div class="hfcs">{{noteItem.replyCount}}回复</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <div class="no-comment-div">
            <img style="width: 85px;" src="../../images/no-comment.png">
            <div style="font-size: 1.3rem;color: #757575;">等待你的评论, 快来抢沙发!</div>
          </div>
        </div>
      </div>
      <div class="mint-tabbar is-fixed live-detail-no-scroll">
        <div class="plbar-1" style="width: 70%">
          <div class="pl-input">
            <form @submit.prevent="submit">
              <input v-model="comments" class="pl-input1">
              <img src="../../images/pl-bj.png" class="pl-bj">
              <input type="submit" class="pl-input2"/>
            </form>
          </div>
        </div>
        <div class="plbar-2" style="width: 30%">
          <img class="mr20" style="margin-right: 10px" @click="videoThank(liveInfo.Id)" src="../../images/pl-zx.png">
          <img class="mr20" style="margin-right: 10px" @click="cancelCollection" src="../../images/pl-sc-1.png"
               v-if="collect">
          <img class="mr20" style="margin-right: 10px" @click="enterCollection" src="../../images/pl-sc-0.png" v-else>
          <!--<img src="../../images/pl-fx.png">-->
        </div>
      </div>
    </div>
    <div class="mint-msgbox-wrapper apply" v-show="liveApply">
      <div class="mint-msgbox">
        <div class="mint-msgbox-header">
          <img src="../../images/zfimg.png" style="width: 50%;">
          <img class="close-img" @click="closeLiveApply" src="../../images/zfimgClose.png">
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message">报名需要{{liveInfo.TicketExpense}}元，确定报名吗？</div>
        </div>
        <div class="mint-msgbox-btns" style="width:100%">
          <button calss="mint-msgbox-btn mint-msgbox-confirm"
                  style="
                    margin-left: 30%;
                    width: 40%;
                    background-color: #FC6657;
                    border-radius: 25px;
                    color:white;
                    font-size: 1.6rem;
                    border:none;
                    margin-top: 5px;
                    margin-bottom: 5px;
                  "
                  @click="signUp(liveInfo.TicketExpense, liveInfo.Id, liveInfo.Title)">去支付
          </button>
        </div>
      </div>
    </div>
    <div class="mint-msgbox-wrapper apply" v-show="replayApply">
      <div class="mint-msgbox">
        <div class="mint-msgbox-header">
          <img src="../../images/zfimg.png" style="width: 50%;">
          <img class="close-img" @click="closeReplayApply" src="../../images/zfimgClose.png">
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message">回看需要支付{{liveInfo.LiveStreamVideoExpense}}元，确定观看吗？</div>
        </div>
        <div class="mint-msgbox-btns" style="width:100%">
          <button calss="mint-msgbox-btn mint-msgbox-confirm"
                  style="
                    margin-left: 30%;
                    width: 40%;
                    background-color: #FC6657;
                    border-radius: 25px;
                    color:white;
                    font-size: 1.6rem;
                    border:none;
                    margin-top: 5px;
                    margin-bottom: 5px;
                  "
                  @click="replay(liveInfo.LiveStreamVideoExpense, liveInfo.Id, liveInfo.Title)">确定
          </button>
        </div>
      </div>
    </div>
    <div  v-if="showSecretInput" class="mint-msgbox-wrapper secret">
      <div class="mint-msgbox" style=""><div class="mint-msgbox-header">
        <div class="mint-msgbox-title">请输入直播秘钥</div>
      </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message"> </div>
          <div class="mint-msgbox-input" style="">
            <input class="secret-message" v-model="secretMessage"/>
            <a class="secret-forget" @click="openCallWindowF()">忘记秘钥？</a>
            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="hideSecretWindow()">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="verifySecret()">确定</button>
        </div>
      </div>
    </div>
    <div  v-if="openCallWindow" class="mint-msgbox-wrapper secret">
      <div class="mint-msgbox" style=""><div class="mint-msgbox-header">
        <div class="mint-msgbox-title">4008867170</div>
      </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="openCallWindow = false">取消</button>
          <a href="tel://4008867170" class="mint-msgbox-btn mint-msgbox-confirm" @click="openCallWindow = false">呼叫</a>
        </div>
      </div>
    </div>
    <div class="v-modal" v-if="showSecretInput || openCallWindow" style="z-index: 3;"></div>
  </div>
</template>
<script>
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  import * as constant from '../../configs/constant';
  import {subscribe} from "../../utils/WXPay";
  import VideoElement from '../video/VideoElement'

  var timeInterval;
  export default {
    components: {
      VideoElement
    },
    data() {
      return {
        liveInfo: Object,
        noteList: [],
        comments: "",
        subscribe: false,
        WorkRoomID: null,
        collect: false,
        liveApply: false,
        replayApply: false,
        LiveStreamStateId: -1,
        userInfo: {},
        payInfo: Object,
        pageIndex: 1,
        hasNextPage: true,
        allLoaded: false,
        init: false,
        scrollStyle: {},
        noScrollDom: null,
        showSecretInput: false,
        secretMessage: "",
        openCallWindow: false,
      }
    },
    props: {
      Id: Number,
    },
    watch: {},
    computed: {
      heightStyle() {
        return document.documentElement.clientWidth * 9 / 16 + 'px';
      },
      widthStyle() {
        return document.documentElement.clientWidth + 'px';
      },
    },
    updated() {
      if (!this.noScrollDom) {
        this.changeFixTop();
      }
    },
    methods: {
      changeFixTop() {
        this.scrollStyle = {
          top: "",
          height: "",
        }
        let height = 0;
        this.noScrollDom = true;
        height += document.documentElement.clientWidth * 9 / 16;
        this.scrollStyle.top = height + 'px';
        height += 55;
        this.scrollStyle.height = document.documentElement.clientHeight - height + 'px';
      },
      loadMore() {
        this.allLoaded = true;
        this.loading = true;
        setTimeout(() => {
          if (this.hasNextPage) {
            this.loadComments(10);
          }
        }, 800);
      },
      //加载评论
      loadComments(size) {
        if (!this.hasNextPage) {
          return;
        }

        size = size < 5 ? 5 : size;
        let params = {
          "Id": this.$route.params.LiveID,
          "PageIndex": this.pageIndex,
          "PageSize": size
        }
        //评论
        this.api.getMessages(params).then(res => {
          var tempList = res.Data.Data;
          this.hasNextPage = res.Data.HasNextPage;
          tempList.forEach(item => {
            this.noteList.push(item);
          })
          this.pageIndex++;

          this.allLoaded = this.hasNextPage ? false : true;
        });
      },
      // 观看直播
      videoLive() {
        if (this.liveInfo.LivingStreamStateId != 3) {
          if (this.liveInfo.TicketExpense > 0 && !this.payInfo.IsPayAppointmentExpense) {
            this.liveApply = true;
          } else {
              //对直播中的医生, 不允许在微信观看直播
            if (this.userInfo && this.userInfo.UserId == this.liveInfo.WorkRoom.CreateCustomerId) {
              Toast("请在app端观看直播.");
              return;
            }
            //加密直播， 需要输入秘钥
            if (this.liveInfo.LiveStreamModeId == "1" || this.liveInfo.LiveStreamModeId == "2") {
              this.showSecretInput = true;
            } else {
              this.$router.push({path: '/live/' + this.$route.params.LiveID});
            }
          }
        } else {
          Toast("直播已禁用");
        }
      },
      // 回看播放
      LiveReplay() {
        if (this.liveInfo.LiveStreamStateId == 2 && !this.liveInfo.NetEaseUrl) {
          Toast("直播不存在");
        } else if (this.liveInfo.LiveStreamVideoExpense <= 0 || this.payInfo.IsPayLsVideoExpense) {
          this.utils.hasUserInfo().then(() => {
            this.api.AddCustomer({
              LiveStreamVideoId: this.$route.params.LiveID,
              IsFree: this.liveInfo.LiveStreamVideoExpense > 0,
              ClientTypeId: 3,
            });
          })
          this.$refs['videoItem'].videoPlay();
        } else {
          this.replayApply = true;
        }
      },
      verifySecret() {
        this.api.verifySecrectKey({LiveId: this.$route.params.LiveID, SecretKey:this.secretMessage.trim(),}).then(res => {
          if (res.Data.IsSucceed) {
            this.$router.push({path: '/live/' + this.$route.params.LiveID});
          }else {
            Toast("秘钥不匹配!");
          }
          this.hideSecretWindow();
        }, error => {
          Toast("秘钥不匹配!");
          this.hideSecretWindow();
        });
      },
      hideSecretWindow() {
        this.showSecretInput = false;
      },
      // 跳转到支付页面
      signUp(amount, liveID, title) {
        //支付页面链接
        var pageParams = {
          LiveTitle: title,
          amount: amount,
          funcName: 'liveDetail',
          referToId: liveID,
          changeTypeId: '2303',
          paymentTypeId: '902',
          reforToTypeId: '0'
        }
        this.$router.push({name: '直接支付', query: pageParams});
      },
      replay(amount, liveID, title) {
        var pageParams = {
          LiveTitle: title,
          amount: amount,
          funcName: 'liveDetail',
          referToId: liveID,
          changeTypeId: '2307',
          paymentTypeId: '902',
          reforToTypeId: '0'
        }
        this.$router.push({name: '直接支付', query: pageParams});
      },
      // 关闭支付提示
      closeLiveApply() {
        this.liveApply = false;
      },
      closeReplayApply() {
        this.replayApply = false;
      },
      // 取消关注工作室
      unsubscribe() {
        let userInfo = window.localStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        let unsubscribeParams = {
          "WorkRoomId": this.WorkRoomID,
          "IsFollow": false,
          "UserID": userInfo.UserId,
        };
        this.api.FollowWorkRoom(unsubscribeParams).then(res => {
          if (res.Result == 1) {
            Toast("取消关注！");
            this.subscribe = false;
          } else {
            Toast("取消关注失败，请稍后再试！");
          }
        });
      },
      // 关注工作室
      subscribeRoom() {
        let userInfo = window.localStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        let subscribeParams = {
          "WorkRoomId": this.WorkRoomID,
          "IsFollow": true,
          "UserID": userInfo.UserId,
        };
        this.api.FollowWorkRoom(subscribeParams).then(res => {
          if (res.Result == 1) {
            Toast("关注成功！");
            this.subscribe = true;
          } else {
            Toast("关注失败，请稍后再试！");
          }
        });
      },
      // 评论视频
      submit: function (event) {
        if (this.comments.trim() == '') {
          Toast("内容不能为空");
          this.comments = '';
          return false;
        }
        let userInfo = window.localStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        let commonParams = {
          "liveStreamId": this.$route.params.LiveID,
          "userId": userInfo.UserId,
          "msgContent": this.comments,
        }
        this.api.createMessage(commonParams).then(res => {
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
      // 评论回复评论
      replayComment(commentId) {
        this.$router.push({path: '/ReplayComment/live/' + commentId + '/' + this.liveInfo.Id});
      },
      // 评论点赞、取消点赞
      enterPraise(PraiseID, index) {
        let params = {
          "PraiseID": PraiseID,
          "PraiseType": 10,
          "IsPraise": true,
        };
        this.api.PariseVideo(params).then(res => {
          let item = this.noteList[index];
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
          "PraiseType": 10,
          "IsPraise": false,
        };
        this.api.PariseVideo(params).then(res => {
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
      // 收藏直播
      enterCollection() {
        let params = {
          "CollectID": this.$route.params.LiveID,
          "CollectType": 7,
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
          "CollectID": this.$route.params.LiveID,
          "CollectType": 7,
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
      // 直播致谢
      videoThank(videoID) {
        if (this.LiveStreamStateId == 1) {
          this.$router.push({path: '/pay/CustomerAdmire/' + videoID + "/2102"});
        } else {
          this.$router.push({path: '/pay/CustomerAdmire/' + videoID + "/2103"});
        }
      },
      //需要关注
      payAttention(data) {
        var userInfo = window.localStorage.getItem("userInfo");
        if (data.LiveStreamStateId == 1 || data.LiveStreamStateId == 2) {
            if (userInfo != null && userInfo != "null") {
              userInfo = JSON.parse(userInfo);
              if (userInfo.Subscribe) {
                return true;
              } else {
                //当关闭关注按钮时, 必须重新拉取用户信息, 关注状态.
                this.$store.state.reloadUserInfo = true;
                subscribe();
              }
            } else {
              this.$store.state.reloadUserInfo = true;
              subscribe();
            }
        }
        return false;
      },
      openCallWindowF() {
          this.showSecretInput = false;
          this.openCallWindow = true;
      }
    },
    mounted() {
      this.userInfo = getStore("userInfo");
      let paramsLive = {
        "Id": this.$route.params.LiveID,
      }
      this.api.getLiveStreamById(paramsLive).then(res => {
        res.Data.liveImg = res.Data.Picture.Url;
        if (res.Data.LivingStreamStateId == null || res.Data.LivingStreamStateId == "") {
          res.Data.FollowCount = 0;
        } else {
          res.Data.FollowCount = res.Data.WorkRoom.FollowCount;
        }
        this.liveInfo = res.Data;
        this.subscribe = res.Data.WorkRoom.IsFollowed;
        this.WorkRoomID = res.Data.WorkRoom.Id;
        this.collect = res.Data.IsCollection;
        this.LiveStreamStateId = res.Data.LiveStreamStateId;
        let liveName = this.liveInfo.Anchor;
        this.$store.state.shareData.description = res.Data.LiveStreamStateId == 1 ? `${liveName}的直播开始了` : `${liveName}的直播结束了,来看看录像吧`;
        this.$store.state.shareData.title = res.Data.Title;
        this.$store.state.shareData.imgUrl = res.Data.Picture.Url;
        this.init = true;
        //统计接口
        var params = {
          RefertoTypeId: 1,
          LiveStreamId: this.$route.params.LiveID,
          ClientTypeId: 3,
        }
        if (this.liveInfo.LiveStreamStateId == 2 || this.liveInfo.LiveStreamStateId == 4) {
          params.RefertoTypeId = 2;
        }
        this.api.liveStreamVideoPlayReport(params);
      });
      this.loadComments(10);
      if (this.userInfo.UserId) {
        this.api.getCustomerPayInfo({UserId: this.userInfo.UserId, LiveId: this.$route.params.LiveID}).then(res => {
          this.payInfo = res.Data;
        })
      }
    },
    destroyed() {
      this.$store.state.shareData.title = "";
      this.$store.state.shareData.description = "";
      this.$store.state.shareData.imgUrl = "";
      this.$store.state.reloadUserInfo = false;
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .liveDetail {
    width: 100%;
    height: 100%;
  }

  .mint-indicator-wrapper {
    z-index: 2;
  }

  .scroll-div {
    position: fixed;
    width: 100%;
    overflow: scroll;
    background-color: white;
    .workroom-info {
      text-align: left;
      .mint-videoxq-title {
        padding-top: 10px;
        margin: 0 0 0 10px;
        width: 93%;
        word-break: break-all;
        font-size: 1.8rem;
      }
      .mint-videoxq-content {
        height: 26px;
        .leader {
          width: 70%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          float: left;
          line-height: 26px;
          margin-left: 10px;
        }
      }
      .mint-videoxq-content-describe {
        font-size: 1.4rem;
        color: #757575;
        font-weight: 400;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .mint-videoxq-share {
        .button-danger {
          width: 60%;
          height: 35px;
          border-radius: 35px;
          font-size: 1.5rem;
        }
      }
    }
    .no-comment-div {
      padding: 20px 0px;
    }
  }

  .mint-msgbox-wrapper.apply{
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    z-index: 3;
    .mint-msgbox {
      z-index: 4;
      border-radius: 25px;
      width: 70%;
      .mint-msgbox-header {
        background-color: #ff2826;
        position: relative;
        min-height: 160px;
        .close-img {
          position: absolute;
          right: 5px;
          top: 5px;
          width: 7%;
        }
      }
    }
    .mint-msgbox-content {
      border: none;
    }
  }

.mint-msgbox-wrapper.secret {
  position: absolute; z-index: 4;
  .secret-message {
    width: 100%;
    height: 25px;
    border: gray 1px solid;
    border-radius: 5px;
  }
  .secret-forget {
    font-size: 1.5rem;
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: dodgerblue;
  }
}

</style>
