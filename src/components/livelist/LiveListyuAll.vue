<template>
  <div class="liveyu-content">
    <div class="lis-tcontent" style="text-align:left">
      <ul>
        <li :key="index" v-for="(item, index) in yuList">
          <div class="zbyg-list">
            <div @click="LiveListyuDetail(item.Id, item.Title)" class="zbyg-list-l">
              <div :style="{backgroundImage:'url(' + item.Picture.Url + ')'}" class="background-img-cover" style="width: 100%;height: 100%;"></div>
            </div>
            <div @click="LiveListyuDetail(item.Id, item.Title)" class="zbyg-list-c">
              <span class="zbygbt text-over-ellipsis">{{item.Title}}</span>
              <span class="zbygsbt"><img src="../../images/zbyg-time.png">{{item.StartDateTime}}</span>
              <span class="zbygsbt live-workroom-item text-over-ellipsis"><img
                src="../../images/zbyg-user.png">{{item.WorkRoom.Name}}</span>
            </div>
            <div @click="LiveListyuDetail(item.Id, item.Title)" class="zbyg-list-r" style="width: 70px"
                 v-if="item.IsAppointed">
              <a><img src="../../images/ybm.png"></a><br>
              <span class="zbyg-list-rs">已报名：{{item.AppointCount}}人</span>
            </div>
            <div @click="showLiveApply(index)" class="zbyg-list-r" style="width: 70px" v-else>
              <a><img src="../../images/bm.png"></a><br>
              <span class="zbyg-list-rs">已报名：{{item.AppointCount}}人</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mint-msgbox-wrapper" v-if="liveApply">
      <div class="mint-msgbox">
        <div class="mint-msgbox-header">
          <img src="../../images/zfimg.png" style="width: 50%;">
          <img class="close-img" @click="closeLiveApply" src="../../images/zfimgClose.png">
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message" v-if="liveInfo.TicketExpense - 0 > 0">报名需要{{liveInfo.TicketExpense}}元，确定报名吗？</div>
          <div class="mint-msgbox-message" v-else >该场直播免费报名，确定报名吗？</div>
        </div>
        <div class="mint-msgbox-btns" style="width:100%">
          <button calss="mint-msgbox-btn mint-msgbox-confirm" v-if="liveInfo.TicketExpense - 0 > 0"
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
          <button calss="mint-msgbox-btn mint-msgbox-confirm mint-pay-btn" v-else
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
                  @click="signUp(liveInfo.TicketExpense, liveInfo.Id, liveInfo.Title)">免费报名
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LiveItem from '@/components/livelist/LiveItem';
  import * as constant from '../../configs/constant';
  import Modal from '@/components/modal/Modal';
  import ModalLogin from '@/components/modal/ModalLogin';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  import {Toast} from 'mint-ui';
  import {getWXPayInfo} from '../../utils/WXPay';
  export default {
    components: {
      LiveItem, Modal, ModalLogin
    },
    data() {
      return {
        list: Object,
        PageIndex: 1,
        PageSize: 20,
        type: constant.STATUS_LIVE_PRE,
        text: "",
        yuList: [],
        liveInfo: {}, //表示当前选中预直播信息.
        liveApply: false,
      }
    },
    props: {},
    mounted() {
      this.$store.state.shareData.title = "直播预告";
      this.$store.state.shareData.description = `专业的医学类在线直播，直播视频.`;
      let userInfo = getStore("userInfo");
      let params = {
        "PageIndex": this.PageIndex,
        "PageSize": this.PageSize,
        "StatusId": this.type,
        "UserId": parseInt(this.$route.params.hostId),
        "OrderMode": 1,
        "Keywords": ""
      }

      this.api.getLiveStreams(params).then(res => {
        this.yuList = res.Data.Data;
      });
    },
    methods: {
      LiveListyuDetail(event, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '预直播详情';
        this.$router.push({path: '/LiveListyuDetail/' + event + '/' + shareTitle})
      },
      showLiveApply(index) {
        this.liveInfo = this.yuList[index];
        this.liveApply = true;
      },
      closeLiveApply() {
        this.liveApply = false;
      },
      //去支付
      signUp(amount, liveID, title) {
        if (amount - 0 == 0) {
          this.api.appointmentLiveStream({"Id": liveID}).then(res => {
            this.liveApply = false;
            if (res.Data) {
              Toast("报名成功！");
              this.liveInfo.IsAppointed = 1;
            } else {
              Toast("报名失败，请稍后再试！");
            }
          })
        } else {
          //支付页面链接
          var pageParams = {
            LiveTitle: title,
            amount: amount,
            funcName: 'liveYuBM',
            referToId: liveID,
            changeTypeId: '2303',
            paymentTypeId: '902',
            reforToTypeId: '0'
          }
          this.$router.push({name: '直接支付', query: pageParams});
        }
      }
    },
    destroyed() {
      this.$store.state.shareData.title = "";
      this.$store.state.shareData.description = "";
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .live-workroom-item {
    width: 100%;
    line-height: 20px;
  }

  .liveyu-content {
    li {
      padding: 0px;
    }
  }

  .zbyg-list {
    margin-top: 6px;
    .zbyg-list-l {
      width: 100px;
      height: calc(100% - 25px);
      padding: 10px 5px 5px 10px;
    }
    .zbyg-list-c {
      width: calc(100% - 210px);
      .zbygbt {
        width:100%;
        font-size: 1.8rem;
      }
    }

  }

  .mint-msgbox-wrapper {
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
</style>
