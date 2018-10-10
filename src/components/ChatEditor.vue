<template>
  <div class="m-chat-editor">

    <div class="m-chat-editor-main">
      <div v-show="!hideInput" class="bottom">
        <input type="text" class="text" v-model="msgToSent" ref="input"></input>
        <span class="ask-icon"></span>
        <span class="ask-text" @click="IsNeedCharge">提问</span>
      </div>
      <div class="toggle">
        <span class="text plus" @click="toggleInput" v-show="hideInput">+</span>
        <span class="text" @click="toggleInput" v-show="!hideInput">-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { setStore, getStore } from '../store/mlocalstorge';
export default {

  updated() {
    window.document.body.addEventListener('click', () => {
      this.isEmojiShown = false
    })
  },
  props: {
    type: String,
    scene: String,
    to: String,
    liveId: 0,

  },
  data() {
    return {
      isEmojiShown: false,
      msgToSent: '',
      userInfo: {},
      payInfo: {},
      first: true,
      hideInput: false,
    }
  },
  methods: {
    showEd() {
      this.$refs.input.focus();
    },
    toggleInput() {
        this.hideInput = !this.hideInput;
      this.$emit("toggle-input", this.hideInput);
    },
    IsNeedCharge() {

      if ((this.payInfo.IsPaySpeakExpense != undefined && this.payInfo.IsPaySpeakExpense) || (this.liveInfo != undefined && this.liveInfo.ExpenseModeId == 3)) {
        this.sendTextMsg();
        return;
      }
      this.userInfo = getStore("userInfo");
      let params = {
        "id": this.liveId,
      }

      let payparams = {
        "UserId": this.userInfo.UserId,
        "LiveId": this.liveId,
      }
      this.api.getCustomerPayInfo(payparams).then(res => {
        this.payInfo = res.Data;
        this.api.getLiveStreamById(params).then(res => {
          this.liveInfo = res.Data
          if (res.Data.LiveStreamStateId == 2) {
            Toast("直播已经结束不能提问");
            return;
          }

          if (res.Data.ExpenseModeId == 1 || res.Data.ExpenseModeId == 2 && res.Data.SpeakExpense > 0) {
            if (!this.payInfo.IsPaySpeakExpense) {
              this.$emit("confirmCharge");
              return true;;
            }

          }
          this.sendTextMsg();
        }, error => {
          return true;
        });
      }, error => {
        return true;
      });
    },
    sendTextMsg() {
      try {
        let userId = JSON.parse(window.localStorage.getItem("userInfo")).UserId;
        this.api.updateLiveStreamCustomer({
          LiveStreamId: this.liveId,
          CustomerId: userId, IsSpeak: true,
          ClientTypeId: 3,
        });
      } catch (error) {

      }

      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'text',
          scene: this.scene,
          to: this.to,
          text: this.msgToSent
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'text',
          text: this.msgToSent
        })
      }
      this.msgToSent = '';
      this.$emit("hideEditor")
    },
    sendPlayMsg() {
      // 发送猜拳消息
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'custom',
          scene: this.scene,
          to: this.to,
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random() * 3)
            }
          }
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'custom',
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random() * 3)
            }
          }
        })
      }
    },
    sendFileMsg() {
      let ipt = this.$refs.fileToSent
      if (ipt.value) {
        if (this.type === 'session') {
          this.$store.dispatch('sendFileMsg', {
            scene: this.scene,
            to: this.to,
            fileInput: ipt
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomFileMsg', {
            fileInput: ipt
          })
        }
      }
    },
    showEmoji() {
      this.isEmojiShown = true
    },
    hideEmoji() {
      this.isEmojiShown = false
    },
    addEmoji(emojiName) {
      this.msgToSent += emojiName
      this.hideEmoji()
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import '../common/variable.scss';
.m-chat-editor {
  z-index: 999;
  position: fixed;
  bottom: 10px;
  left: 0;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  .m-chat-editor-main {
    position: relative;
    width: 100%;
    height: 30px;
    .bottom {
      width: 90%;
      .text {
        border-radius: 15px/15px;
        background: rgba(0, 0, 0, .5);
        width: 95%;
        height: 30px;
        padding: 0 50px 0 40px;
        color: white;
        box-sizing: border-box;
      }
      .ask-icon {
        position: absolute;
        left: 5px;
        bottom: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        background: url(../assets/ask.png) no-repeat center;
      }
      .ask-text {
        position: absolute;
        right: 10%;
        bottom: 0px;
        color: white;
        line-height: 30px;
        padding-right: 20px;

      }
    }
    .toggle {
      position: absolute;
      color: white;
      bottom: 0px;
      right: 5px;
      height: 30px;
      border-radius: 30px;
      width: 30px;
      background-color: rgba(0, 0, 0, .5);
      .text {
        font-size: 3.0rem;
        position: absolute;
        bottom: -3px;
        right: 10px;
      }
      .plus {
        right: 5px;
        bottom: -5px;
      }
    }
  }
}
</style>
