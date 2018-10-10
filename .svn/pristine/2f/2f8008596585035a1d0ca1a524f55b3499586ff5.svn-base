// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
import cookie from '../../utils/cookie'
import pageUtil from '../../utils/page'

/* 导出actions方法 */
import {showLoading, hideLoading, showFullscreenImg, hideFullscreenImg} from './widgetUi'
import {initNimSDK} from './initNimSDK'
import {initChatroomSDK, setChatroomId, resetChatroomSDK} from './initChatroomSDK'
import {updateBlack} from './blacks'
import {updateFriend, addFriend, deleteFriend} from './friends'
import {resetSearchResult, searchUsers} from './search'
import {deleteSession, setCurrSession, resetCurrSession} from './session'
import {sendMsg, sendFileMsg, sendMsgReceipt, revocateMsg, getHistoryMsgs, resetNoMoreHistoryMsgs} from './msgs'
import {markSysMsgRead, resetSysMsgs, markCustomSysMsgRead} from './sysMsgs'
import {sendChatroomMsg, sendChatroomFileMsg, getChatroomHistoryMsgs} from './chatroomMsgs'
import {initChatroomInfos, getChatroomInfo, getChatroomMembers, clearChatroomMembers,updateChatroomInfo} from './chatroomInfos'

function connectNim ({state, commit, dispatch}, obj) {
  let {force,uid,sdktoken, nick, avatar} = Object.assign({}, obj)
  // 操作为内容页刷新页面，此时无nim实例
  if (!state.nim || force) {
    let loginInfo = {
      uid: uid,
      sdktoken: sdktoken,
      nick: nick,
      avatar: avatar
    }
    dispatch('initNimSDK', loginInfo)
  }
}

function connectChatroom ({state, commit, dispatch}, obj) {
  let {chatroomId} = Object.assign({}, obj)
  const nim = state.nim;
  if (nim && state.hasConnected) {
    dispatch('showLoading')
    nim.getChatroomAddress({
      chatroomId,
      done: function getChatroomAddressDone (error, obj) {
        if (error) {
          alert(error.message)
          return
        }
        dispatch('initChatroomSDK', obj)
      }
    })
  }
}

export default {
  updateFirstState ({commit}) {
    commit('updateFirst')
  },
  //
  updateRefreshState ({commit}) {
    commit('updateRefreshState')
  },

  updateChatroomAvatar({state, commit, dispatch},obj){
      commit('updateChatroomAvatar',obj)
  },

  // 连接sdk请求，false表示强制重连
  connect (store, obj) {
    let {type} = Object.assign({}, obj)
    type = type || 'nim'
    switch (type) {
      case 'nim':
        connectNim(store, obj)
        break
      case 'chatroom':
        connectChatroom(store, obj)
        break
    }
  },
  // UI 及页面状态变更
  showLoading,
  hideLoading,
  showFullscreenImg,
  hideFullscreenImg,



  // 用户触发的登出逻辑
  logout ({ state, commit }) {
    cookie.delCookie('uid')
    cookie.delCookie('sdktoken')
    if (state.nim) {
      state.nim.disconnect()
    }
    // pageUtil.turnPage('', 'login')
  },

  // 初始化 重新连接SDK
  initNimSDK,
  // 清空所有搜索历史纪录
  resetSearchResult,
  // 搜索用户信息
  searchUsers,
  // 更新黑名单
  updateBlack,
  // 更新好友
  addFriend,
  deleteFriend,
  updateFriend,
  // 删除会话
  deleteSession,
  // 设置当前会话
  setCurrSession,
  // 重置当前会话
  resetCurrSession,
  // 发送消息
  sendMsg,
  sendFileMsg,
  // 发送消息已读回执
  sendMsgReceipt,
  // 消息撤回
  revocateMsg,
  getHistoryMsgs,
  // 重置历史消息状态
  resetNoMoreHistoryMsgs,
  // 标记系统消息已读
  markSysMsgRead,
  markCustomSysMsgRead,
  resetSysMsgs,
  updateChatroomInfo,
  initChatroomSDK,
  setChatroomId,
  initChatroomInfos,
  resetChatroomSDK,
  sendChatroomMsg,
  sendChatroomFileMsg,
  getChatroomHistoryMsgs,
  getChatroomInfo,
  getChatroomMembers,
  clearChatroomMembers
}
