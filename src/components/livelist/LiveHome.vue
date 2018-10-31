<template>
  <div class="liveHome" v-if="init">
    <!-- 关键字搜索   -->
    <div class="live-home-no-scroll-div" :class="live">
      <div class="zb-searchbar" style="position: relative;background: none">
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search" style="margin-top:3px"></i>
          <input readonly="readonly" @click="searchLive" placeholder="请输入关键字搜索直播" class="mint-searchbar-core"
                 style="margin-left:2px;font-size: 1.4rem;">
        </div>
        <a class="mint-searchbar-cancel" style="display: none;">取消</a>

        <!-- 直播预告 -->
        <div class="zbyg" v-if="liveYuList.length > 0">
          <div class="zbyg-ts">即将<br>直播</div>
          <div class="zbyg-ts-js">{{currentYuIndex + 1}}/{{liveYuList.length}}</div>
          <div class="zbyg-nr-c">
            <div class="zbyg-nr-scroll" :style="bannerStyle">
              <div class="zbyg-item" :key="item.Id" :style="{top: 74 * index + 'px'}"
                   v-for="(item, index) in liveYuList">
                <div @click="LiveYuDetail(item.Id, item.Title)" class="zbyg2">
                  <div class="zbyg2-1">{{item.Title}}</div>
                  <div class="zbyg2-2">{{item.StartDateTime}}</div>
                  <div class="zbyg2-2 zbyg2-2-1">{{item.WorkRoom.Name}}</div>
                </div>
                <div class="zbyg3">
                  <button @click="LiveYuDetail(item.Id, item.Title)" class="zbyg-b" v-if="item.IsAppointed">
                    <span class="ui-time" style="color: #FFF;">已报名</span>
                  </button>
                  <button @click="showLiveApply()" class="zbyg-b" v-else>
                    <img class="ui-time" @click="showLiveApply()" src="../../images/yy-time.png">
                    <span class="zbyg-bf">报名</span>
                  </button>
                  <div style="font-size: 1.0rem;margin-top: 1px;">已报名：{{item.AppointCount}}人</div>
                </div>
              </div>
              <!-- 做轮播使用 -->
              <div class="zbyg-item" :style="{top: 74 * liveYuList.length + 'px'}">
                <div @click="LiveYuDetail(liveYuList[0].Id, liveYuList[0].Title)" class="zbyg2">
                  <div class="zbyg2-1">{{liveYuList[0].Title}}</div>
                  <div class="zbyg2-2">{{liveYuList[0].StartDateTime}}</div>
                  <div class="zbyg2-2 zbyg2-2-1">{{liveYuList[0].WorkRoom.Name}}</div>
                </div>
                <div class="zbyg3">
                  <button @click="LiveYuDetail(liveYuList[0].Id, liveYuList[0].Title)" class="zbyg-b"
                          v-if="liveYuList[0].IsAppointed">
                    <span class="ui-time" style="color: #FFF;">已报名</span>
                  </button>
                  <button @click="showLiveApply()" class="zbyg-b" v-else>
                    <img class="ui-time" @click="showLiveApply()" src="../../images/yy-time.png">
                    <span class="zbyg-bf">报名</span>
                  </button>
                  <div style="font-size: 1.0rem">已报名：{{liveYuList[0].AppointCount}}人</div>
                </div>
              </div>
            </div>
          </div>
          <div @click="LiveListyuAll" class="zbyg-dx-img"><img src="../../images/zbygjt.png"></div>
          <div class="yu-gao-empty-div" v-if="liveYuList.length > 0"></div>
        </div>
      </div>
      <div class="scroll-div" :style="scrollStyle" :class="content">
        <div class="page-wrap tabb">
          <div class="live-content">
            <!-- 直播优选 -->
            <div class="titlebg" style="margin-top:0;height: 50px;line-height: 50px;">
              <div class="titlebg-1">
                <img class="titlebg-img" src="../../images/zbyx.png" style="float:left;margin: 17px 5px 0px 3%;">
                <span class="titlebg-f" style="float:left;">直播优选</span></div>
              <div class="titlebg-2"><span @click="LiveList" class="titlebg-f b2 ">更多</span></div>
            </div>
            <div class="mint-content">
              <div class="mint-content-banner">
                <div @click="liveDetail(newLive.Id, newLive.Title)"><img :src="newLive.ImgUrl"
                                                                         :style="{width: widthStyle, height: heightStyle}">
                  <div class="zbicon" v-if="newLive.LiveStreamStateId == 1">
                    <div v-if="newLive.TicketExpense > 0">付费直播</div>
                    <div v-else>直播</div>
                  </div>
                  <div class="hkicon" v-else>
                    <div v-if="newLive.LiveStreamVideoExpense > 0">付费回看</div>
                    <div v-else>回看</div>
                  </div>
                  <div class="zb-titlebg" style="z-index:0">
                    <div class="zbgz" style="left: 15px;bottom: 50px">{{newLive.FollowCount}}人关注</div>
                    <div class="zb-titletx"
                         :style="{backgroundImage:'url(' + newLive.CreateCustomerAvatarUrl + ')'}"
                    >
                    </div>
                    <div class="zb-titles">
                      {{newLive.Title}}
                    </div>
                  </div>
                  <div class="live-big-workroom-name">
                    {{newLive.Name}}
                  </div>
                </div>
              </div>
            </div>

            <div class="mint-content-banner mt32">
              <!--直播广告上-->
            </div>
            <!-- 直播 -->
            <div class="mint-content mt20">
              <div v-if="liveList.length > 0">
                <div class="zb-list" :key="liveIndex" v-for="(liveItem,liveIndex) in liveList">
                  <img :src="liveItem.ImgUrl" :style="{width: halfWidthStyle, height: halfHeightStyle}"
                       @click="liveDetail(liveItem.Id, liveItem.Title)">
                  <div class="zblist-titlebg" style="background: none" @click="liveDetail(liveItem.Id, liveItem.Title)">
                    <div class="zblist-title">
                      <div class="title-content">
                        {{liveItem.Title}}
                      </div>
                    </div>
                    <div class="live-bottom-main">
                      <div class="zblist-titletx"
                           :style="{backgroundImage:'url(' + liveItem.CreateCustomerAvatarUrl + ')'}">
                      </div>
                    </div>
                  </div>
                  <div class="zbicon-list" v-if="liveItem.LiveStreamStateId == 1">
                    <div v-if="liveItem.TicketExpense > 0" style="">付费直播</div>
                    <div v-else>直播</div>
                  </div>
                  <div class="hkicon-small" v-else>
                    <div v-if="liveItem.LiveStreamVideoExpense > 0">付费回看</div>
                    <div v-else>回看</div>
                  </div>
                  <div class="workroom-title">
                    {{liveItem.CreateCustomerName}}
                  </div>
                </div>
              </div>
            </div>

            <div class="mint-content-banner">
              <div :style="{marginTop: upAdHeight}"></div>
            </div>

            <!-- 直播达人列表-->
            <div class="titlebg" style="margin-top: 0">
              <div class="titlebg-1"><img class="titlebg-img" src="../../images/zbyx.png"
                                          style="float:left;margin: 17px 5px 0px 3%;">
                <span class="titlebg-f" name="weibin" style="float: left;">直播达人</span>
              </div>
              <div class="titlebg-2" @click="moreTalent"><span class="titlebg-f b2 ">更多</span></div>
            </div>
            <div class="zbdr" v-if="workRoomsList.length > 0" style="width: 100%;overflow-x: hidden;height: 190px;">
              <div :style="[baseStyle, touch.slideEffect]">
                <div @click="StudioDetail(item.Id, item.Name)"
                     style="margin: 5px 3px 0px 3px;width:7.0%;height:auto"
                     class="zbdr-card"
                     :key="index"
                     v-for="(item,index) in workRoomsList"
                     @touchstart.stop.prevent='touchStart($event, item.Id, item.Name)'
                     @touchmove.stop.prevent='touchMove'
                     @touchend.stop.prevent='touchEnd'
                     ref="innerLabel"
                >
                  <a target="_blank"><img :src="item.Picture.Url" @click="StudioDetail(item.Id, item.Name)"
                                          style="width:100px;height:100px;border-radius:100px"></a>
                  <div>
                    <div class="zbdr-js"
                         style="margin-top:0;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                      {{item.Name}}
                    </div>
                    <div class="zbdr-fs" style="margin: 10px 0">{{item.FollowCount}}人关注</div>
                  </div>
                </div>
              </div>
            </div>

            <div style="height: 10px;width: 100%;"></div>
          </div>
        </div>
      </div>
      <div class="mint-tabbar is-fixed live-home-no-scroll-div">
        <a class="mint-tab-item" @click="videoHome()">
          <div class="mint-tab-item-icon"><img src="../../images/main-nav-1-0.png"></div>
          <div class="mint-tab-item-label">
            视频
          </div>
        </a>
        <a class="mint-tab-item is-selected" @click="liveHome">
          <div class="mint-tab-item-icon"><img src="../../images/main-nav-2-1.png"></div>
          <div class="mint-tab-item-label">
            直播
          </div>
        </a>
        <a class="mint-tab-item" @click="findHome(1)" v-if="IsCertificate">
          <div class="mint-tab-item-icon"><img src="../../images/main-nav-3-0.png"></div>
          <div class="mint-tab-item-label">
            工作室
          </div>
        </a>
        <a class="mint-tab-item" @click="findHome(0)" v-else>
          <div class="mint-tab-item-icon"><img src="../../images/main-nav-3-0.png"></div>
          <div class="mint-tab-item-label">
            找医生
          </div>
        </a>
        <a class="mint-tab-item" @click="myHome">
          <div class="mint-tab-item-icon"><img src="../../images/main-nav-4-0.png"></div>
          <div class="mint-tab-item-label">
            我的
          </div>
        </a>
      </div>
      <div class="mint-msgbox-wrapper" v-show="liveApply">
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
                    @click="signUp(liveInfo.TicketExpense, liveInfo.Id, liveInfo.Title)">
              去支付
            </button>
            <button calss="mint-msgbox-btn mint-msgbox-confirm" v-else
                    @click="signUp(0, liveInfo.Id, liveInfo.Title)"
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
            >
              免费报名
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LiveItem from '@/components/livelist/LiveItem';
  import Modal from '@/components/modal/Modal';
  import ModalLogin from '@/components/modal/ModalLogin';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  import {Toast} from 'mint-ui';
  import * as constant from '../../configs/constant';
  import {getWXPayInfo, subscribe} from '../../utils/WXPay';

  var maxLength = 0;
  var timeOut;
  var startTouchedTime;
  var endTouchedTime;
  export default {
    components: {
      LiveItem, Modal, ModalLogin
    },
    data() {
      return {
        init: false,
        list: Object,
        IsCertificate: false,
        title: "",
        PageIndex: 1,
        PageSize: 6,
        text: "",
        userInfo: {},
        ScoreSetting: 0,
        newLive: Object,
        liveList: [],
        liveYuList: [],
        currentYuIndex: 0,
        workRoomsList: [],
        live: "",
        content: "",
        upAD: 0,
        advertisementUpInfo: Object,
        advertisementDownInfo: Object,
        touch: {
          startX: 0,//开始触摸的位置
          moveX: 0,//滑动时的位置
          endX: 0,//结束触摸的位置
          disX: 0,//移动距离
          disY: 0,//Y轴移动
          startY: 0,//Y轴开始触摸位置
          slideEffect: {
            transform: "translateX(0px)"
          },//滑动时的效果,使用v-bind:style="deleteSlider"
          moveDistance: 0 //偏移总量
        },
        baseStyle: {
          width: "500%",
          height: "190px",
          paddingLeft: "5px",
        },
        scrollStyle: '',
        bannerStyle: {
          height: 0,
          transform: '',
          transition: '',
        },
        bannerInterval: '',
        noScrollDom: null,
        noScrollDom2: null,
        liveApply: false, //显示报名窗口
        liveInfo: {},
        currentLiveInfo: {},
      }
    },
    props: {
      type: Number,
      isSelf: Boolean,
      UserId: Number,
    },
    computed: {
      heightStyle() {
        return document.documentElement.clientWidth * 9 / 16 + 'px';
      },
      widthStyle() {
        return document.documentElement.clientWidth + 'px';
      },
      halfHeightStyle() {
        return document.documentElement.clientWidth * 4.14 / 16 + 'px';
      },
      halfWidthStyle() {
        return document.documentElement.clientWidth * 0.48 + 'px';
      },
      upAdHeight() {
        var replayHeight = this.halfHeightStyle;
        replayHeight = this.upAD * (Math.ceil(replayHeight.substr(0, replayHeight.length - 2)) + 23) + 32;
        return replayHeight + "px";
      },
    },
    mounted() {
      this.$store.state.shareData.title = "医邦直播";
      this.$store.state.shareData.description = "专业的医学类在线直播，直播视频 ";
      // 判断当前进入人员的类型
      this.utils.hasUserInfo().then(() => {
        this.api.myStatus({}).then( res => {
          this.IsCertificate = res.Data.IsCertificate;
        });
      }, () => {
        this.IsCertificate = false;
      })

      let LiveyuList = {
        "UserId": -1,
        "StatusId": 0,
        "PageIndex": 0,
        "PageSize": 100,
        "OrderMode": 1
      }
      let liveListParams = {
        "UserId": -1,
        "StatusId": 4,
        "PageIndex": this.PageIndex,
        "PageSize": 9,
        "OrderMode": 1
      }
      // 预直播内容
      var bannerHeight = 0;
      var executeFlag = true;
      var bannerCount = 0;
      var loadYuList = setInterval(() => {
        if (executeFlag) {
          executeFlag = false;
          LiveyuList.PageIndex += 1;
          this.api.getLiveStreams(LiveyuList).then(res => {
            if (res.Data.Data.length > 0) {
              if (LiveyuList.PageIndex == 1) {
                this.liveInfo = res.Data.Data[0];
              }
              res.Data.Data.forEach((item) => {
                this.liveYuList.push(item);
                bannerHeight += 74;
                bannerCount++;
              })
              this.live = "yu-live";
              this.content = "yu-content";
            } else {
              if (LiveyuList.PageIndex == 1) {
                this.live = "no-yu-live";
                this.content = "no-yu-content";
              }
              this.bannerStyle.height = bannerHeight + 'px';
              clearInterval(loadYuList);
              if (bannerCount > 1) {
                this.bannerInterval = setInterval(() => {
                  if (this.currentYuIndex == 0) {
                    this.bannerStyle.transition = 'transform 0.5s';
                  }
                  this.currentYuIndex++;
                  this.bannerStyle.transform = "translateY" + "(" + (-this.currentYuIndex * 74) + "px" + ")";
                  if (this.currentYuIndex >= bannerCount) {
                    //banner指针指向第一个元素.
                    this.currentYuIndex = 0;
                    setTimeout(() => {
                      //当目前已经到达最后一个元素, 且轮播结束时, 需要在动画结束后, 需要无缝跳转至第一个元素.
                      //删除过渡效果
                      this.bannerStyle.transition = '';
                      //同时跳转至第一个元素.
                      this.bannerStyle.transform = "translateY" + "(" + 0 + "px" + ")";
                    }, 510)
                  }
                  //报名弹出框相关信息更替.
                  this.currentLiveInfo = this.liveYuList[this.currentYuIndex];
                }, 4500)
              }
            }
            executeFlag = true;
          });
        }
      }, 20);

      // 最近一条直播
      // 直播和回看信息
      this.api.getLiveStreams(liveListParams).then(res => {
        this.newLive = {
          "Id": res.Data.Data[0].Id,
          "Title": res.Data.Data[0].Title,
          "ImgUrl": res.Data.Data[0].Picture.Url,
          "FollowCount": res.Data.Data[0].WorkRoom.FollowCount,
          "CreateCustomerAvatarUrl": res.Data.Data[0].WorkRoom.Picture.Url,
          "Name": res.Data.Data[0].WorkRoom.Name,
          "LiveStreamStateId": res.Data.Data[0].LiveStreamStateId,
          "TicketExpense": res.Data.Data[0].TicketExpense,
          "LiveStreamVideoExpense": res.Data.Data[0].LiveStreamVideoExpense,
        }
        for (let i = 1; i < res.Data.Data.length; i++) {
          let listData = {};
          listData = {
            "Id": res.Data.Data[i].Id,
            "Title": res.Data.Data[i].Title,
            "ImgUrl": res.Data.Data[i].Picture.Url,
            "CreateCustomerName": res.Data.Data[i].WorkRoom.Name,
            "CreateCustomerAvatarUrl": res.Data.Data[i].WorkRoom.Picture.Url,
            "LiveStreamStateId": res.Data.Data[i].LiveStreamStateId,
            "TicketExpense": res.Data.Data[i].TicketExpense,
            "LiveStreamVideoExpense": res.Data.Data[i].LiveStreamVideoExpense,
          };
          this.liveList.push(listData);
        }
        //直播广告
        if (res.Data.Data.length <= 1) {
          this.upAD = 0;
        } else if (res.Data.Data.length == 2 || res.Data.Data.length == 3) {
          this.upAD = 1;
        } else if (res.Data.Data.length == 4 || res.Data.Data.length == 5) {
          this.upAD = 2;
        } else if (res.Data.Data.length == 6 || res.Data.Data.length == 7) {
          this.upAD = 3;
        } else if (res.Data.Data.length == 8 || res.Data.Data.length == 9) {
          this.upAD = 4;
        }
      });

      // 直播达人列表
      let workRoom = {
        "CustomerTypeId": 0,
        "PageIndex": 1,
        "PageSize": 10
      }
      this.api.getWorkRooms(workRoom).then(res => {
        this.workRoomsList = res.Data.Data;
        this.init = true;
      });

      // old function
      switch (this.type) {
        case constant.STATUS_LIVE_PRE:
          this.title = "预告";
          break;
        case constant.STATUS_LIVE_HISTORY:
          this.title = "回看";
          break;
      }
    },
    updated() {
      if (!this.noScrollDom || (this.liveYuList.length > 0 && !this.noScrollDom2)) {
        this.changeFixTop();
      }
    },
    methods: {
      changeFixTop() {
        if (this.liveYuList.length > 0) {
          this.noScrollDom2 = true;
        }
        this.scrollStyle = {
          top: "",
          height: "",
        }
        let height = 0;
        let tempDom = Array.from(document.getElementsByClassName("live-home-no-scroll-div"));
        this.noScrollDom = tempDom;
        let item = tempDom[0];
        height += item.offsetHeight + item.style.marginTop.replace("px", "") / 1 + item.style.marginBottom.replace("px", "") / 1;
        height = height <= 50 ? 50 : height;
        this.scrollStyle.top = height + 'px';
        item = tempDom[1];
        height += item.offsetHeight + item.style.marginTop.replace("px", "") / 1 + item.style.marginBottom.replace("px", "") / 1;
        this.scrollStyle.height = document.documentElement.clientHeight - height + 'px';
      },
      touchStart: function (ev, itemId, itemName) {
        ev = ev || event;
        timeOut = setTimeout(() => {
          this.StudioDetail(itemId, itemName);
        }, 500);
        startTouchedTime = new Date().getTime();
        if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.touch.startX = ev.touches[0].clientX; // 记录开始位置
          this.touch.startY = ev.touches[0].clientY; // 记录开始位置
        }
        if (maxLength == 0) {
          this.$refs.innerLabel.forEach((item, index, array) => {
            maxLength += (item.offsetWidth + item.style.marginLeft.replace("px", "") / 1 + item.style.marginRight.replace("px", "") / 1);
          })
          if (maxLength == 0) {
            maxLength = 0.001;
          }
        }
      },
      touchMove: function (ev) {
        ev = ev || event;
        endTouchedTime = new Date().getTime();

        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.touch.moveX = ev.touches[0].clientX;
          //实时的滑动的距离-起始位置=实时移动的位置
          this.touch.disX = this.touch.moveX - this.touch.startX;
          this.touch.disY = ev.touches[0].clientY - this.touch.startY;
          var time = endTouchedTime - startTouchedTime;
          //          if ((Math.abs(this.touch.disX) > 60 && (time < 500)) || time >= 500 || (Math.abs(this.touch.disX) < 40 && time < 500)) {
          if ((Math.abs(this.touch.disX) > 60 && (time < 500)) || time >= 500 || (Math.abs(this.touch.disY) > 60 && time < 500)) {
            clearTimeout(timeOut);
            startTouchedTime = 0;
          }

          if ((this.touch.moveDistance + this.touch.disX) >= 0) {
            this.touch.slideEffect.transform = 'translateX(0px)';
          } else if ((this.touch.moveDistance + this.touch.disX - document.documentElement.clientWidth + maxLength) <= 0) {
            this.touch.slideEffect.transform = 'translateX(' + (document.documentElement.clientWidth - maxLength - 10) + 'px)';
          } else {
            this.touch.slideEffect.transform = 'translateX(' + (this.touch.moveDistance + this.touch.disX) + 'px)';
          }
        }
      },
      touchEnd: function (ev) {
        endTouchedTime = new Date().getTime();
        if ((endTouchedTime - startTouchedTime) < 500 && startTouchedTime != 0) {
          return false;
        }

        ev = ev || event;
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.touch.disX = endX - this.touch.startX;
          this.touch.moveDistance += this.touch.disX;

          if (this.touch.moveDistance >= 0) {
            this.touch.moveDistance = 0;
          } else if (this.touch.moveDistance - document.documentElement.clientWidth + maxLength <= 0) {
            this.touch.moveDistance = document.documentElement.clientWidth - maxLength;
          }

          if (this.touch.moveDistance >= 0) {
            this.touch.slideEffect.transform = 'translateX(0px)';
          } else if ((this.touch.moveDistance - document.documentElement.clientWidth + maxLength) <= 0) {
            this.touch.slideEffect.transform = 'translateX(' + (document.documentElement.clientWidth - maxLength - 10) + 'px)';
          } else {
            this.touch.slideEffect.transform = 'translateX(' + (this.touch.moveDistance) + 'px)';
          }
        }
      },
      //视频主页
      videoHome() {
        this.$router.push({name: '主页'})
      },
      // 直播主页
      liveHome() {
        // 点击直播主页不刷新
      },
      // 找医生主页
      findHome(flag) {
        // 判断医生或者患者
        if (flag == 1) {
          window.location.href = 'http://weixin.yipong.com/DownLoad/index.html';
        } else {
          this.$router.push({name: '找医生'});
        }
      },
      // 我的主页
      myHome() {
        this.$router.push({name: '个人主页'});
      },
      // 搜索视频
      searchLive() {
        this.$router.push({path: '/LiveList/' + 0})
      },
      // 直播列表
      LiveList() {
        this.$router.push({path: '/LiveList/' + 0})
      },
      // 直播详情
      liveDetail(event, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '直播详情';
        this.$router.push({path: '/LiveDetail/' + event + '/' + shareTitle})
      },
      // 预直播列表
      LiveListyuAll() {
        this.$router.push({name: '预告列表'})
      },
      // 达人列表
      moreTalent() {
        this.$router.push({name: '直播达人'})
      },
      // 达人详情
      StudioDetail(studioId, studioName) {
        this.$router.push({path: '/StudioDetail/' + studioId + '/' + studioName})
      },
      more() {
        this.$emit("more")
      },
      itemclick(itemindex) {

      },
      cancleClick() {
      },
      //报名
      showLiveApply() {
        this.liveInfo = Object.assign({}, this.currentLiveInfo);
        this.liveApply = true;
      },
      closeLiveApply() {
        this.liveInfo = Object.assign({}, this.currentLiveInfo);
        this.liveApply = false;
      },
      //预直播详情
      LiveYuDetail(videoId, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '直播详情';
        this.$router.push({path: '/LiveListyuDetail/' + videoId + '/' + shareTitle})
      },
      //去支付
      signUp(amount, liveID, title) {
        if (amount - 0 == 0) {
          this.api.appointmentLiveStream({"Id": liveID}).then(res => {
            this.liveApply = false;
            if (res.Data) {
              Toast("报名成功！");
              this.liveYuList.forEach((item, index) => {
                if (item.Id == liveID) {
                  item.AppointCount++;
                  item.IsAppointed = true;
                  this.liveYuList.splice(index, 1, item);
                }
              })
            } else {
              Toast("报名失败，请稍后再试！");
            }
          });
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
      },
    },
    watch: {
      UserId: {
        handler: function (val, oldval) {
          if (val != undefined) {
            let params = {
              "PageIndex": this.PageIndex,
              "PageSize": this.PageSize,
              "StatusId": this.type,
              "UserId": this.UserId,
              "OrderMode": 1,
              "Keywords": ""
            }
            this.api.getLiveStreams(params).then(res => {
              this.list = res.Data.Data;

            });
          }
        },
      },
    },
    destroyed() {
      this.$store.state.shareData.title = "";
      this.$store.state.shareData.description = "";
      clearInterval(this.bannerInterval);
    },
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .titlebg {
    margin: 10px 0 0 0;
  }

  .advertisement-list {
    margin-bottom: 30px;
  }

  .foot-tab {
    width: 100%;
    height: 100%;
  }

  .nav {
    background: white;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    margin: 0 5px;
  }

  .yu-live {
    padding-bottom: 10px;
    width: 100%;
    position: fixed;
    height: 120px;
    z-index: 2;
    background: -webkit-linear-gradient(left, #518ffe, #03a9f4);
  }

  .no-yu-live {
    padding-bottom: 10px;
    width: 100%;
    position: fixed;
    height: 40px;
    z-index: 2;
    background: -webkit-linear-gradient(left, #518ffe, #03a9f4);
  }

  .no-yu-content {
    position: absolute;
  }

  .live-bottom-main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .scroll-div {
    position: fixed;
    width: 100%;
    overflow: scroll;
  }

  .tabb {
    padding-bottom: 0px;
  }

  .zbyg {
    width: 98%;
    margin-left: 1%
  }

  .zbyg2 {
    width: calc(100% - 75px);
    text-align: left
  }

  .zbyg2-1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .zbyg2-2-1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .zbyg4 {
    float: right;
    margin-right: 6px;
  }

  .zbyg3 {
    float: right;
  }

  .yu-gao-empty-div {
    height: 50px;
    position: absolute;
    bottom: -10px;
    background: #eee;
    width: 130%;
    z-index: -1;
    left: -10%;
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
      padding-left: 0px;
      padding-right: 0px;
      border: none;
    }
  }

  .zb-titles {
    position: absolute;
    bottom: 0px;
    left: 90px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 90px);
    margin: 0 0 6px 0;
  }

  .zb-list {
    margin-left: 0;
    padding-left: 1%;
    width: 49%;
    .zblist-title {
      .title-content {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      margin: 0;
      padding: 0 1%;
      background: -webkit-linear-gradient(top, rgba(55, 55, 55, 0.8), rgba(180, 180, 180, 0));
    }
    .zblist-titletx {
      height: 50px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50px;
      bottom: -30%;
      position: absolute;
      left: 2%;
      width: 50px;
    }
    .workroom-title {
      position: absolute;
      left: 55px;
      text-align: left;
      float: left;
      font-size: 1.4rem;
      width: calc(100% - 60px);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .live-big-workroom-name {
    text-align: left;
    float: left;
    font-size: 1.4rem;
    margin-left: 90px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 90px);
  }

  .zbyg {
    position: relative;
    .zbyg-ts {
      position: absolute;
      color: #f44336;
      font-weight: 600;
      font-size: 1.6rem;
      top: 10px;
      left: 20px;
      height: 42px;
    }
    .zbyg-ts-js {
      position: absolute;
      font-size: 1.3rem;
      left: 25px;
      top: 52px;
    }
    .zbyg-nr-c {
      position: absolute;
      height: 100%;
      overflow: hidden;
      left: 65px;
      width: calc(100% - 95px);
      .zbyg-nr-scroll {
        .zbyg-item {
          height: 74px;
          width: 100%;
          position: absolute;
          .zbyg3 {
            padding: 18px 0 0 0;
          }
        }
      }

    }
    .zbyg-dx-img {
      position: absolute;
      right: 10px;
      top: 21px;
      img {
        width: 12px;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
</style>
