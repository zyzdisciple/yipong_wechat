/* 内存数据状态 */

export default {
  // 正在加载中
  isLoading: true,
  // 操作是否是刷新页面，刷新初始没有nim实例，会导致时序问题
  isRefresh: true,
  // 全屏显示的原图
  isFullscreenImgShow: false,
  fullscreenImgSrc: '',
  // 切页动画 forward，backward
  transitionName: 'forward',

  // IM相关
  // NIM SDK 实例
  nim: null,
  // 登录账户ID
  userUID: null,
  // 用户名片
  myInfo: {},
  // 好友/黑名单/陌生人名片, 数据结构如：{cid: {attr: ...}, ...}
  userInfos: {},
  // 用户订阅的事件同步, 数据结构如：{cid: {typeid: {...}, ...}, ...}
  userSubscribes: {},

  // 好友列表
  friendslist: [],
  // 黑名单列表
  blacklist: [],
  // 禁言列表
  // mutelist: [],

  // teamlist: [],
  // 群自身的属性，数据结构如：{tid: {attr: ...}, ...}
  // teamAttrs: {},
  // 群对象的成员列表，数据结构如：{tid: {members: [...], ...}, ...}
  // teamMembers: {},

  // 消息列表
  msgs: {}, // 以sessionId作为key
  msgsMap: {}, // 以idClient作为key，诸如消息撤回等的消息查找
  // 会话列表
  sessionlist: [],
  sessionMap: {},
  // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
  currSessionId: null,
  currSessionMsgs: [],
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: false,

  // 系统消息
  sysMsgs: [],
  customSysMsgs: [],
  sysMsgUnread: {
    total: 0
  },
  customSysMsgUnread: 0,

  // 临时变量
  // 缓存需要获取的用户信息账号,如searchUser
  searchedUsers: [],
  // 缓存需要获取的群组账号
  searchedTeams: [],

  // 聊天室相关
  // 聊天室sdk实例
  chatroomInsts: {},
  chatroomInfos: {},
  // 聊天室分房间消息集合
  chatroomMsgs: {},
  // 当前聊天室实例及id
  chatroomID: "",
  currChatroom: null,
  currChatroomId: null,
  currChatroomMsgs: [],
  currChatroomInfo: {},
  // 聊天室成员列表
  currChatroomMembers: [],
  currChatroomAvatar: "",
  //用户信息
  yipong: { "UserHeaderImageUrl": require('../assets/default_avatar.png'), "Nickname": "医邦欢迎您" },

  studiolist: {},
  videolist: {},
  associalist: {},
  prvlist: {},
  historylist: {},
  searchlist: {},
  isFirst: false,
  studiodetail: {},
  teamlist: {},
  proit: "",
  msgggg: {},
  keyword:"",
  //表示是否创建NIM成功
  hasConnected: false,
  shareData:{
    title: null,
    description: null,
    imgUrl: null,
  },
  //分享标识, 链接是否是分享来的.
  isShare: false,
  getUserInfoTimes: 0,
  isRegisted: null,
  isSubscribe: false,
  hasRedirect: false,
  reloadUserInfo: false,
  payAttention: false,
  exclusionToPop: false,
}
