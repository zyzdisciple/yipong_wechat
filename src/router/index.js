import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  // mode: 'history',

  routes: [
    {
      path: '/TeamCustomerlist',
      name: '团队成员',
       meta: {
        title: '团队成员'
      },
      component: resolve => require(['@/components/studio/TeamCustomerList'], resolve)
    },
    {
      path: '/StudioDetail/:StudioID/:shareTitle',
      name: '工作室',
       meta: {
          title: '工作室',
      },
      component: resolve => require(['@/components/studio/StudioDetail'], resolve)
    },
    {
      path: '/LiveListhistorymore/:hostId',
      name: '直播历史更多',
      meta: {
        title: '回看'
      },
      component: resolve => require(['@/components/livelist/LiveListhistory'], resolve)
    },
    {
      path: '/UserDetail',
      name: '个人主页',
      meta: {
        title: '我的'
      },
      component: resolve => require(['@/components/user/UserDetail'], resolve)
    },
    {
      path: '/UserInformation',
      name: '个人信息',
      meta: {
        title: '个人信息'
      },
      component: resolve => require(['@/components/user/UserInformation'], resolve)
    },
    {
      path: '/',
      name: '主页',
      meta: {
          title: '医邦视频'
      },
      component: resolve => require(['@/components/Main'], resolve)
    },
    {
      path: '/LiveDetail/:LiveID/:shareTitle',
      name: '直播详情界面',
      meta: {
        title: '直播'
      },
      component: resolve => require(['@/components/livedetail/LiveDetail'], resolve)
    },
    {
      path: '/StudioList/:SubjectID',
      name: '医生工作室',
      meta: {
        title: '医生工作室',
      },
      component: resolve => require(['@/components/studio/StudioList'], resolve)
    },
    // web add detail start
    {
      path: '/VideoDetail/:VideoID/:shareTitle',
      name: '视频详情',
      meta: {
        title: '视频详情'
      },
      component: resolve => require(['@/components/video/VideoDetail'], resolve)
    },
    {
      path: '/LiveHome',
      name: '直播',
      meta: {
        title: '医邦直播'
      },
      component: resolve => require(['@/components/livelist/LiveHome'], resolve)
    },
    {
      path: '/LiveVideo/:LiveID/:liveUrl',
      name: '观看直播',
      meta: {
        title: '观看直播'
      },
      component: resolve => require(['@/components/livelist/LiveVideo'], resolve)
    },
    {
      path: '/LiveReplay/:LiveID',
      name: '观看回看',
      meta: {
        title: '观看回看'
      },
      component: resolve => require(['@/components/livelist/LiveReplay'], resolve)
    },
    {
      path: '/FindHome',
      name: '找医生',
      meta: {
        title: '找医生',
      },
      component: resolve => require(['@/components/studio/FindHome'], resolve)
    },
    {
      path: '/LiveListyuDetail/:LiveyuID/:shareTitle',
      name: '预直播详情',
      meta: {
        title: '直播预告'
      },
      component: resolve => require(['@/components/livelist/LiveListyuDetail'], resolve)
    },
    {
      path: '/LiveList/:StudioID',
      name: '直播列表',
      meta: {
        title: '直播'
      },
      component: resolve => require(['@/components/livelist/LiveList'], resolve)
    },
    {
      path: '/DoctorDetail/:DoctorID',
      name: '医生详情',
      meta: {
        title: '医生'
      },
      component: resolve => require(['@/components/studio/DoctorDetail'], resolve)
    },
    {
      path: '/IntroVideo/:StudioID',
      name: '医生介绍',
      meta: {
        title: '医生介绍'
      },
      component: resolve => require(['@/components/studio/IntroVideo'], resolve)
    },
    {
      path: '/WeHealthList/:StudioID',
      name: '微健康列表',
      meta: {
        title: '微健康'
      },
      component: resolve => require(['@/components/studio/WeHealthList'], resolve)
    },
    {
      path: '/HotAdvisory/:StudioID',
      name: '热度咨询',
      meta: {
        title: '热度咨询'
      },
      component: resolve => require(['@/components/studio/HotAdvisory'], resolve)
    },
    {
      path: '/StudioRelatedVideoList/:StudioID',
      name: '相关视频',
      meta: {
        title: '相关视频'
      },
      component: resolve => require(['@/components/studio/StudioRelatedVideoList'], resolve)
    },
    {
      path: '/WeHealthDetail/:WeHealthID/:shareTitle',
      name: '微健康详情',
      meta: {
        title: '微健康'
      },
      component: resolve => require(['@/components/studio/WeHealthDetail'], resolve)
    },
    {
      path: '/LiveTalent',
      name: '直播达人',
      meta: {
        title: '直播达人'
      },
      component: resolve => require(['@/components/livelist/LiveTalent'], resolve)
    },
    {
      path: '/MyAttention',
      name: '我的关注',
      meta: {
        title: '我的关注'
      },
      component: resolve => require(['@/components/user/MyAttention'], resolve)
    },
    {
      path: '/MyAdvisory',
      name: '我的咨询',
      meta: {
        title: '我的咨询'
      },
      component: resolve => require(['@/components/user/MyAdvisory'], resolve)
    },
    {
      path: '/MyCollection',
      name: '我的收藏',
      meta: {
        title: '我的收藏'
      },
      component: resolve => require(['@/components/user/MyCollection'], resolve)
    },
    {
      path: '/MyHealthList',
      name: '健康档案',
      meta: {
        title: '健康档案'
      },
      component: resolve => require(['@/components/user/MyHealthList'], resolve)
    },
    {
      path: '/MyHealthFile/:FileID/:SelectID',
      name: '档案详情',
      meta: {
        title: '健康档案'
      },
      component: resolve => require(['@/components/user/MyHealthFile'], resolve)
    },
    {
      path: '/CreateMedicalRecords/:FileID',
      name: '创建病历',
      meta: {
        title: '创建病历'
      },
      component: resolve => require(['@/components/user/CreateMedicalRecords'], resolve)
    },
    {
      path: '/medicalRecordDetail/:DetailID',
      name: '病历详情',
      meta: {
        title: '病历详情'
      },
      component: resolve => require(['@/components/user/medicalRecordDetail'], resolve)
    },
    {
      path: '/DownLoadApp',
      name: '下载APP',
      meta: {
        title: '下载APP'
      },
      component: resolve => require(['@/components/DownLoadApp'], resolve)
    },
    {
      path: '/PointList',
      name: '支付记录',
      meta: {
        title: '支付记录'
      },
      component: resolve => require(['@/components/user/PointList'], resolve)
    },
    {
      path: '/LiveListyuAll',
      name: '预告列表',
      meta: {
        title: '直播预告'
      },
      component: resolve => require(['@/components/livelist/LiveListyuAll'], resolve)
    },
    {
      path: '/LiveListHistoryAll',
      name: '回看列表',
      meta: {
        title: '回看'
      },
      component: resolve => require(['@/components/livelist/LiveListhistoryAll'], resolve)
    },
    {
      path: '/live/:liveStreamId',
      name: 'Hello',
       meta: {
        title: '直播中'
      },
      component: resolve => require(['@/components/Hello'], resolve)

    },
    {
      path: '/CapacityGuideWoman',
      name: '智能导医-女士',
      meta: {
        title: '智能导医'
      },
      component: resolve => require(['@/components/studio/CapacityGuideWoman'], resolve)
    },
    {
      path: '/CapacityGuideMan',
      name: '智能导医-男士',
      meta: {
        title: '智能导医'
      },
      component: resolve => require(['@/components/studio/CapacityGuideMan'], resolve)
    },
    {
      path: '/Guide2DoctorList/:symbolId',
      name: '智能导医工作室列表',
      meta: {
        title: '医生工作室'
      },
      component: resolve => require(['@/components/studio/Guide2DoctorList'], resolve)
    },
    {
      path: '/pay/CustomerAdmire/:Id/:typeId',
      name: '致谢',
      meta: {
        title: '致谢'
      },
      component: resolve => require(['@/components/pay/CustomerAdmire'], resolve)
    },
    {
      path: '/OnlineConsult/:sessionId/:endDateTime',
      name: '咨询',
      meta: {
        title: '咨询'
      },
      component: resolve => require(['@/components/chat/Chat'], resolve)
    },
    {
      path: '/CreateOnlineConsult/:customerId/:workRoomId/:amount/:consultTypeId',
      name: '创建咨询',
      meta: {
        title: '创建咨询'
      },
      component: resolve => require(['@/components/CreateOnlineConsult'], resolve)
    },
    {
      path: '/pay/directPay',
      name: '直接支付',
      meta: {
        title: '直接支付'
      },
      component: resolve => require(['@/components/pay/directPay'], resolve)
    },
    {
      path: '/chat/chatInfo/:consultId/:workRoomId',
      name: '咨询详情',
      meta: {
        title: '咨询详情'
      },
      component: resolve => require(['@/components/chat/ChatInfo'], resolve)
    },
    {
      path: '/chat/continueChat/:consultId/:sessionId',
      name: '继续咨询',
      meta: {
        title: '咨询'
      },
      component: resolve => require(['@/components/chat/ContinueChat'], resolve)
    },
    {
      path: '/ReplayComment/:typeId/:commentId/:serviceId',
      name: '评论回复',
      meta: {
        title: '评论回复'
      },
      component: resolve => require(['@/components/ReplayComment'], resolve)
    },
    {
      path: '/VHTMLPanel/:url*',
      name: '评论回复',
      meta: {
        title: '评论回复'
      },
      props: true,
      component: resolve => require(['@/components/HTMLPanel'], resolve)
    },
  ],
})
