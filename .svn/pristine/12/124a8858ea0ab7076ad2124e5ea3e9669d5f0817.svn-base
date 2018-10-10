<template>
  <div class="m-chat-editor m-chat-editor-my" @click="hideRobotList">
    <group v-show="isRobotListShown" class="m-chat-emoji m-chat-robot">
      <cell v-for="robot in robotslist" :title="robot.nick" :key="robot.account" @click.native="chooseRobot(robot)">
        <img class="icon u-circle" slot="icon" width="20" height="20" :src="robot.avatar">
      </cell>
    </group>
    <div class="m-chat-editor-main" :class="{robot:isRobot}">

      <span class="u-editor-input">
          <mt-field @focus='onInputFocus' :disableClear="true" style="background-color: #34383B;color: white;" type="text" v-model="msgToSent"></mt-field>
          <span class="u-editor-send" @click="sendTextMsg">提 问</span>
      </span>
    </div>
  </div>
</template>

<script>
  import util from '../../../utils'
  import config from '../../../configs'
  import pageUtil from '../../../utils/page'
  import { MessageBox } from 'mint-ui';

  export default {
    updated () {
      window.document.body.addEventListener('click', () => {
        this.isEmojiShown = false
      })
    },
    props: {
        type: String,
        scene: String,
        to: String,
        isRobot: {
          type: Boolean,
          default () {
            return false
          }
        },
        invalid: {
          type: Boolean,
          default: false
        },
        invalidHint: {
          type: String,
          default: '您无权限发送消息'
        },
        advancedTeam: {
          type: Boolean,
          default: false
        },
        liveId: [String, Number],
        liveInfo: [Object, Function],
    },
    watch: {
      continueRobotAccid (curVal, oldVal) {
        if (curVal && this.robotInfos[curVal]) {
          this.msgToSent = `@${this.robotInfos[curVal].nick} `
        }
        // 重置
        this.$store.dispatch('continueRobotMsg', '')
      },
      msgToSent (curVal, oldVal) {
        if (this.isRobot) {
          return
        }
        let indexAt = this.msgToSent.indexOf('@')
        if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
          if (this.robotslist && this.robotslist.length > 0) {
            this.isRobotListShown = true
          }
        } else if (this.isRobotListShown === true) {
          this.isRobotListShown = false
        }
      }
    },
    data () {
      return {
        isEmojiShown: false,
        isRobotListShown: false,
        msgToSent: '',
        icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
        icon2: `${config.resourceUrl}/im/chat-editor-2.png`,
        icon3: `${config.resourceUrl}/im/chat-editor-3.png`,
      }
    },
    computed: {
      continueRobotAccid () {
        return this.$store.state.continueRobotAccid
      },
      robotslist () {
        return this.$store.state.robotslist
      },
      robotInfos () {
        return this.$store.state.robotInfos
      },
      robotInfosByNick () {
        return this.$store.state.robotInfosByNick
      }
    },
    methods: {
      sendTextMsg () {
        try {
          let userId = JSON.parse(window.localStorage.getItem("userInfo")).UserId;
          this.api.updateLiveStreamCustomer({
            LiveStreamId: this.liveId,
            CustomerId: userId, IsSpeak: true,
            ClientTypeId: 3,
          });
        } catch (error) {

        }

        if (!this.checkPay()) {
            return
        }
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        if (/^\s*$/.test(this.msgToSent)) {
          return
        } else if (this.msgToSent.length > 800) {
            alert('请不要超过800个字');
          return
        }
        this.msgToSent = this.msgToSent.trim()
        if (this.type === 'session') {
          // 如果是机器人
          if (this.isRobot) {
            this.$store.dispatch('sendRobotMsg', {
              type: 'text',
              scene: this.scene,
              to: this.to,
              robotAccid: this.to,
              // 机器人后台消息
              content: this.msgToSent,
              // 显示的文本消息
              body: this.msgToSent
            })
          } else {
            let robotAccid = ''
            let robotText = ''

            let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
            if (atUsers) {
              for (let i = 0; i < atUsers.length; i++) {
                let item = atUsers[i].replace('@', '')
                if (this.robotInfosByNick[item]) {
                  robotAccid = this.robotInfosByNick[item].account
                  robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                  break
                }
              }
            }
            if (robotAccid) {
              if (robotText) {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'text',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 机器人后台消息
                  content: robotText,
                  // 显示的文本消息
                  body: this.msgToSent
                })
              } else {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'welcome',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 显示的文本消息
                  body: this.msgToSent
                })
              }
            } else {
              this.$store.dispatch('sendMsg', {
                type: 'text',
                scene: this.scene,
                to: this.to,
                text: this.msgToSent
              })

            }
          }
        } else if (this.type === 'chatroom') {
          let robotAccid = ''
          let robotText = ''

          let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
          if (atUsers) {
            for (let i = 0; i < atUsers.length; i++) {
              let item = atUsers[i].replace('@', '')
              if (this.robotInfosByNick[item]) {
                robotAccid = this.robotInfosByNick[item].account
                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                break
              }
            }
          }
          if (robotAccid) {
            if (robotText) {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'text',
                robotAccid,
                // 机器人后台消息
                content: robotText,
                // 显示的文本消息
                body: this.msgToSent
              })
            } else {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'welcome',
                robotAccid,
                // 显示的文本消息
                body: this.msgToSent
              })
            }
          } else {
            this.$store.dispatch('sendChatroomMsg', {
              type: 'text',
              text: this.msgToSent
            })
          }
        }
        this.msgToSent = '';
      },
      sendPlayMsg () {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
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
                value: Math.ceil(Math.random()*3)
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
                value: Math.ceil(Math.random()*3)
              }
            }
          })
        }
      },
      chooseRobot (robot) {
        if (robot && robot.account) {
          let len = this.msgToSent.length
          if (len === 0 || this.msgToSent[len-1] !== '@') {
            this.msgToSent += '@' + robot.nick + ' '
          } {
            this.msgToSent += robot.nick + ' '
          }
        }
      },
      hideRobotList () {
        this.isRobotListShown = false
      },
      onInputFocus(e) {
        setTimeout(() => {
          // todo fixme 解决iOS输入框被遮挡问题，但会存在空白缝隙
          e.target.scrollIntoView()
          pageUtil.scrollChatListDown()
        }, 200)
      },
      turnToMsgReceipt() {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        location = `#/teamSendMsgReceipt/${this.to}`
      },
      checkPay() {
          if ((this.liveInfo.ExpenseModeId == 1 || this.liveInfo.ExpenseModeId == 2) && this.liveInfo.SpeakExpense > 0) {
            MessageBox.confirm('提问需要付费' + this.liveInfo.SpeakExpense + '元, 确定支付?').then(action => {
                var params = {
                    changeTypeId: '2305',
                    paymentTypeId: '902',
                    amount: this.liveInfo.SpeakExpense,
                    reforToTypeId: '0',
                    referToId: this.liveInfo.Id,
                    funcName: 'liveVideo',
                    liveId: this.liveInfo.Id
                }
                this.$router.push({name: '直接支付', query: params});
            });
          } else {
            return true;
          }
      }
    }
  }
</script>

<style scoped>
  @import '../../../common/chat/theme.css';
  .g-window .m-chat-editor {
    background-color: rgba(255,255,255,0);
    height: 3rem;
  }
  .g-window .m-chat-editor-main .u-editor-input textarea {
    border: none;
  }

  .g-window .m-chat-editor-main .u-editor-send {
    position: absolute;
    color: white;
    right: 0px;
    top: 10%;
    background-color: rgba(0,0,0,0);
  }

  .g-window .m-chat-editor-main .u-editor-input {
    padding-right: 0px;
    width: 80%;
    float: left;
    border: none;
    position: relative;
    height: 3rem;
    left: 5%;
  }

  .g-window .u-editor-input >>> a input{
    background-color: #34383B !important;
    color: white !important;
  }

  .u-editor-input .mint-cell {
    min-height: 0px;
    height: 70%;
    width: 100%;
    border-radius: 30px;
    padding: 1% 15% 0 0;
    top: 4%;
    background-color: #34383B;
  }

  .g-window .m-chat-editor-main .u-editor-icons {

  }

  .mint-field-core {
    margin-top: 3% !important;
  }
</style>
