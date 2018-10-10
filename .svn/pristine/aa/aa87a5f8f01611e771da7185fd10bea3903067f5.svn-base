<template>
  <div class="m-chat-main p-room-chat-list">
    <chat-list-for-room
      type="chatroom"
      :chatroomId="chatroomId"
      :msglist="msglist"
      :myInfo="myInfo"
      @msgs-loaded="msgsLoaded"
    ></chat-list-for-room>
    <chat-editor-for-room
      type="chatroom"
      :chatroomId="chatroomId"
      :liveId = "liveId"
      :liveInfo = "liveInfo"
    ></chat-editor-for-room>
  </div>
</template>

<script>

import ChatEditorForRoom from './ChatEditorForRoom'
import ChatListForRoom from './ChatListForRoom'
import util from '../../../utils'
import pageUtil from '../../../utils/page'

export default {
  components: {
    ChatEditorForRoom,
    ChatListForRoom
  },
  // 进入该页面，文档被挂载
  mounted () {
    // 此时设置当前会话
    pageUtil.scrollChatListDown()
  },
  updated () {
    pageUtil.scrollChatListDown()
  },
  data () {
    return {
    }
  },
  props: {
      liveId: [String, Number],
      liveInfo: [Object, Function],
  },
  computed: {
    chatroomId () {
      let chatroomId = this.$route.params.chatroomId
      return chatroomId
    },
    msglist () {
      let msgs = this.$store.state.currChatroomMsgs
      return msgs
    },
    myInfo() {
        return this.$store.state.myInfo;
    }
  },
  methods: {
    msgsLoaded () {
      pageUtil.scrollChatListDown()
    }
  }
}
</script>

<style scoped>

</style>
