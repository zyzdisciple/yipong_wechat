<template>
  <div class="g-window" style="position: relative;">
    <div class="g-chat-header">将于{{endDateTime}}结束</div>
    <mt-button type="primary" @click="endConsult()">结束咨询</mt-button>
    <div class="g-inherit m-article" style="padding-top: 25px;">
      <div class="m-chat-main">
        <chat-list
          type="session"
          :msglist="msglist"
          :userInfos="userInfos"
          :myInfo="myInfo"
          @msgs-loaded="msgsLoaded"
        ></chat-list>
        <chat-editor
          type="session"
          :to="to"
          :scene="scene"
        ></chat-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import ChatEditor from './ChatEditor'
  import ChatList from './ChatList'
  import util from '../../utils'
  import pageUtil from '../../utils/page'
  import {Indicator} from "mint-ui";

  export default {
    components: {
      ChatEditor,
      ChatList
    },
    data () {
      return {
        leftBtnOptions: {
          backText: ' ',
          preventGoBack: true,
          endDateTime: '',
          timeInterval: null,
        }
      }
    },
    // 进入该页面，文档被挂载
    mounted () {
      document.documentElement.style.fontSize = "100%";
      Indicator.open();
      let userinfo = JSON.parse(window.localStorage.getItem("userInfo"));
      let connectParams = {
        uid: userinfo.YunXinUserName,
        sdktoken: userinfo.YunXinToken,
        nick: userinfo.Nickname,
        avatar: userinfo.UserHeaderImageUrl
      }
      this.$store.dispatch('connect',  connectParams);
      this.$store.dispatch('updateRefreshState');
      this.$store.state.myInfo = connectParams;
      this.timeInterval = setInterval(() => {
        if (this.$store.state.hasConnected) {
          //覆盖更新currentMsg
          clearInterval(this.timeInterval);
          Indicator.close();
          this.api.getCustomerOnlineConsult({Id: this.$route.params.consultId}).then(res => {
            //设置结束时间
            this.endDateTime = res.Data.EndDateTime;
            //更新我的头像, 昵称
            this.$store.state.myInfo.avatar = res.Data.CreatedCustomerHeaderImgUrl != '' ? res.Data.CreatedCustomerHeaderImgUrl : this.$store.state.yipong.UserHeaderImageUrl;
            this.$store.state.myInfo.nick = res.Data.CreatedCustomerNickName;
            //设置医生聊天头像, 昵称
            this.$store.state.userInfos[res.Data.DoctorNetEasyId] = {
              nick: res.Data.WorkRoomCustomerNickName,
              avatar: res.Data.WorkRoomCustomerHeaderImgUrl  != '' ? res.Data.WorkRoomCustomerHeaderImgUrl : this.$store.state.yipong.UserHeaderImageUrl
            }

            //暂时这里只有患者可以调用.
            var tempList = [];
            var timeSpace = 300000;
            var preTime = 0;
            this.$store.dispatch('setCurrSession', 'p2p-' + res.Data.DoctorNetEasyId, false);

            this.$store.state.nim.getHistoryMsgs({
              scene: 'p2p',
              to: res.Data.DoctorNetEasyId,
              beginTime: new Date(res.Data.StartDateTime.replace(/-/g, "/")).getTime(),
              limit: 100,
              reverse: true,
              done: (error, obj) => {

                obj.msgs.forEach((item) => {
                  if (item.time - preTime >= timeSpace) {
                    var date = new Date(item.time);
                    var month = (date.getMonth() + 1);
                    month = month < 10 ? ("0" + month) : month;
                    var day = date.getDate();
                    day = day < 10 ? ("0" + day) : day;
                    var hours = date.getHours();
                    hours = hours < 10 ? ("0" + hours) : hours;
                    var minutes = date.getMinutes()
                    minutes = minutes < 10 ? ("0" + minutes) : minutes;
                    var text = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
                    tempList.push({type: 'timeTag', text: text});
                  }
                  tempList.push(item);
                  preTime = item.time;
                })
                this.$store.dispatch('setCurrSession', this.sessionId, false);
                this.$store.commit('updateCurrSessionMsgs', {
                  type: 'replace',
                  idClient: this.sessionId,
                  msg: tempList
                })
                this.$store.state.currSessionMsgs = tempList;
                pageUtil.scrollChatListDown()
              }
            })

            //设置个人信息
            this.$store.state.userInfos[res.Data.PatientNetEasyId] = this.$store.state.myInfo;
            this.$store.dispatch('hideLoading');
          })
        }
      }, 100);
    },
    updated () {
      pageUtil.scrollChatListDown()
    },
    // 离开该页面，此时重置当前会话
    destroyed () {
      this.$store.dispatch('resetCurrSession');
      document.documentElement.style.fontSize = "62.5%";
    },
    computed: {
      sessionId () {
        return this.$route.params.sessionId
      },
      scene () {
        return util.parseSession(this.sessionId).scene
      },
      to () {
        return util.parseSession(this.sessionId).to
      },

      myInfo () {
        return this.$store.state.myInfo
      },
      msglist () {
        return this.$store.state.currSessionMsgs
      },
      userInfos() {
        return this.$store.state.userInfos;
      }
    },
    methods: {
      msgsLoaded () {
        pageUtil.scrollChatListDown()
      },
      generateYunXinMsg(srcMsg, myYxId, doctorYxId, patientYxId) {
        var formatMsg = {};
        var toYxId;
        var file = {};
        if (myYxId == doctorYxId) {
          toYxId = patientYxId;
        } else {
          toYxId = doctorYxId;
        }
        //云信消息的from 一定是 srcMsg的from
        formatMsg.from = srcMsg.from;
        formatMsg.to = toYxId;
        formatMsg.text = srcMsg.body.msg;
        formatMsg.scene = 'p2p';
        switch (srcMsg.type) {
          case 0:
            formatMsg.type = 'text';
            break;
          case 1:
            formatMsg.type = 'image';
            file.url = srcMsg.body.url;
            formatMsg.file = file;
            break;
          case 2:
            formatMsg.type = 'audio';
            file.mp3Url = srcMsg.body.url;
            file.dur = srcMsg.body.dur;
            formatMsg.file = file;
            break;
          default:
            formatMsg.type = 'text';
        }
        if (srcMsg.from == myYxId) {
          formatMsg.flow = 'out';
        } else {
          formatMsg.flow = 'in';
        }
        return formatMsg;
      },
      endConsult() {
          this.api.updateCustomerOnlineConsultState({StateId: 2, Id: this.$route.params.consultId}).then(res => {
              this.$router.go(-1);
          })
      }
    }
  }
</script>
<style scoped>
  @import '../../common/chat/theme.css';
  .g-chat-header {
    background-color: #97CE65;
    width: 100%;
    height: 25px;
    position: fixed;
    top: 0px;
    z-index: 9999;
    color: white;
    line-height: 25px;
    font-size: 0.8rem;
  }

  button {
    width: 100%;
    position: fixed;
    top: 25px;
    z-index: 2;
    left: 0;
    border-radius: inherit;
    height: 35px;
    font-size: 1.1rem;
  }

  .g-window .m-chat-main {
    background-color: #EBEBEB;
  }

  .g-window .m-chat-editor {

  }

  .g-window .m-tab .m-tab-right {
    width: 5rem;
    right: -1rem;
  }

  .m-tab-right {
    display: flex;
    justify-content: flex-end;
  }

  .m-tab-right .icon-history, .icon-team {
    display: inline-block;
    margin-right: .8rem;
    width: 1.7rem;
    height: 1.7rem;
    background: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);
    background-size: 20rem;
    background-position: -5.8rem -11.3rem;
  }

  .m-tab-right .icon-team {
    background-position: -7.9rem -11.3rem;
  }

  .invalidHint {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: bisque;
    color: burlywood;
  }

  .g-window .vux-header .m-tab-top {
    width: 80%;
    margin: 0 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mint-field-core {
    margin-top: 3% !important;
  }

  .mint-button {
    font-size: 0.9rem;
  }
</style>
