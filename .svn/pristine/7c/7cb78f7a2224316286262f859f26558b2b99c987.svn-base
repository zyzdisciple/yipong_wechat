<template>
  <ul id="chat-list" class="m-chat-list p-chat-list">
    <li class="u-msg item-time" v-if="canLoadMore">
      上拉加载更多
    </li>
    <li class="u-msg item-time" v-else>
      已无更多记录
    </li>
    <chat-item
      v-for="msg in msglist"
      :type="type"
      :rawMsg="msg"
      :userInfos="userInfos"
      :myInfo="myInfo"
      :key="msg.idClient"
      :isHistory='isHistory'
      @msg-loaded="msgLoaded"
    ></chat-item>
  </ul>
</template>
<script type="text/javascript">
  import util from '../../utils'
  import config from '../../configs'
  import emojiObj from '../../configs/emoji'
  import ChatItem from './ChatItem'

  export default {
    components: {
      ChatItem
    },
    props: {
      type: String, // 类型，chatroom, session
      canLoadMore: [String, Boolean],
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      },
      msglist: {
        type: Array,
        default () {
          return []
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      isHistory: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data () {
      return {
        isFullImgShow: false,
        msgLoadedTimer: null
      }
    },
    methods: {
      showFullImg (src) {
        this.$store.dispatch('showFullscreenImg', {
          src
        })
      },
      msgLoaded () {
        clearTimeout(this.msgLoadedTimer)
        this.msgLoadedTimer = setTimeout(() => {
          this.$emit('msgs-loaded')
        }, 20)
      }
    }
  }
</script>

<style scoped>
  @import '../../common/chat/theme.css';
   .p-chat-list .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
   }

  .g-window .u-msg.session-chat {
    display: inherit;
  }
</style>
