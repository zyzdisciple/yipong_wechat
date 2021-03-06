/*
 * SDK连接相关
 */

import config from "../../configs";
import pageUtil from "../../utils/page";
import util from "../../utils";
import store from "../";
import {onFriends, onSyncFriendAction} from "./friends";
import {onBlacklist, onMarkInBlacklist} from "./blacks";
import {onMyInfo, onUserInfo} from "./userInfo";
import {onSessions, onUpdateSession} from "./session";
import {onMsg, onOfflineMsgs, onRoamingMsgs} from "./msgs";
import {onCustomSysMsgs, onSysMsg, onSysMsgs, onSysMsgUnread} from "./sysMsgs";

// 重新初始化 NIM SDK
export function initNimSDK({state, commit, dispatch}, loginInfo) {
  if (state.nim) {
    state.nim.disconnect()
  }
  dispatch('showLoading');
  //更新本地的个人信息
  store.commit('updateMyInfo', loginInfo);
  // 初始化SDK
  window.nim = state.nim = SDK.NIM.getInstance({
    debug: true,
    appKey: config.appkey,
    account: loginInfo.uid,
    token: loginInfo.sdktoken,
    db: false,
    syncSessionUnread: false,
    onconnect: function onConnect(event) {
      if (loginInfo) {
        // 连接上以后更新uid
        commit('updateUserUID', loginInfo)
        // 同时需要更新用户头像,昵称信息.
        state.nim.updateMyInfo({
          nick: loginInfo.nick,
          avatar: loginInfo.avatar,
        })
      }
      state.hasConnected = true;
    },
    onerror: function onError(event) {
      alert('网络连接状态异常')
    },
    onwillreconnect: function onWillReconnect() {
    },
    ondisconnect: function onDisconnect(error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          let map = {
            PC: '电脑版',
            Web: '网页版',
            Android: '手机版',
            iOS: '手机版',
            WindowsPhone: '手机版'
          }
          let str = error.from
          let errorMsg = `你的帐号于${util.formatDate(new Date())}被${(map[str] || '其他端')}踢出下线，请确定帐号信息安全!`
          pageUtil.turnPage(errorMsg, 'login')
          break
        default:
          break;
      }
      state.hasConnected = false;
    },
    // 用户关系及好友关系
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction,
    // 用户名片 - actions/userInfo
    onmyinfo: onMyInfo,
    onupdatemyinfo: onMyInfo,
    onusers: onUserInfo,
    onupdateuser: onUserInfo,
    // // 会话
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    // // 消息
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    // // 系统通知
    onsysmsg: onSysMsg,
    onofflinesysmsgs: onSysMsgs,
    onupdatesysmsg: onSysMsg, // 通过、拒绝好友申请会收到此回调

    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onSysMsgUnread,

    onofflinecustomsysmsgs: onCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsgs,
    // // 同步完成
    onsyncdone: function onSyncDone() {
      dispatch('hideLoading')
      // 说明在聊天列表页
      if (store.state.currSessionId) {
        dispatch('setCurrSession', store.state.currSessionId)
      }
    }
  })
}
