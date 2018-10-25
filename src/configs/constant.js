export const STATUS_LIVE_ALL = -1;//全部
export const STATUS_LIVE_PRE = 0;//预直播
export const STATUS_LIVE_ING = 1;//直播中
export const STATUS_LIVE_HISTORY = 2;//直播历史
export const STATUS_LIVE_BAN = 3;//直播被禁用

export const TYPE_LIVE_PUBLIC = 0;//公开直播
export const TYPE_LIVE_SECRET = 1;//加密直播
export const TYPE_LIVE_REVIEW = 2;//复诊直播
export const TYPE_LIVE_APPLY = 3;//可报名直播

export const TYPE_LIVE_EXPENSE_TICKET = 0;//门票
export const TYPE_LIVE_EXPENSE_BOTH = 2;//门票+发言
export const TYPE_LIVE_EXPENSE_SPEAK = 1;//发言
export const TYPE_LIVE_EXPENSE_FREE = 3;//免费

// release
export const url = "http://www.yipong.com/VideoAndMedicalCase/VideoPostDetail?postVideoId=";
//项目访问路径
export const urlhost = "http://www.yipong.com/wechat/";
//必须用链接访问的 微信分享默认图片, 根路径, 在每次生成dist文件之后, 需要将默认图片放置 static/dist/img/下
export const staticImgUlr = "http://www.yipong.com/wechat/";
export const appid = "wx0d4a60c2a8f79109";
export const subscribeUrl = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzcwNDczNg==&scene=126#wechat_redirect";

// //
// export const url = "http://localhost/VideoAndMedicalCase/VideoPostDetail?postVideoId=";
// export const urlhost = "http://localhost/";
// export const appid = "wx83001da105cfaf91";

// 地址 debug
// export const url = "http://wechat1.tunnel.smartcellphone.cn/VideoAndMedicalCase/VideoPostDetail?postVideoId=";
// // export const appid = "wx0d4a60c2a8f79109";
// export const urlhost = "http://wechat1.tunnel.smartcellphone.cn/";
// export const appid = "wx83001da105cfaf91";
// export const staticImgUlr = "http://www.yipong.com/wechat/";
// export const subscribeUrl = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzcwNDczNg==&scene=126#wechat_redirect";
