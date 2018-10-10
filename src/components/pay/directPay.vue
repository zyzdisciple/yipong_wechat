<template>
  <div class="direct-pay">
    <div class="main-page">
      <div class="title">支付金额(元)</div>
      <div class="amount">
          <span>￥</span><span>{{amount}}</span>
      </div>
    </div>
    <div class="to-pay">
      <mt-button type="primary" @click="pay()">微信支付</mt-button>
    </div>
  </div>
</template>
<style>
.direct-pay {
  height: 100%;
  width: 100%;
}

.direct-pay .main-page{
  background-color: #469EF1;
  height: 45%;
  color: white;
  margin-bottom: 15%;
  text-align: left;
}

.direct-pay .main-page .title {
  padding-top: 35%;
  font-family: "微软雅黑";
  font-size: 2.0rem;
  font-weight: 100;
  padding-left: 5%;
}

.direct-pay .main-page .amount {
  padding-top: 13%;
  padding-left: 5%;
  font-size: 3.0rem;
  font-weight: 100;
}

.direct-pay .to-pay .mint-button--primary {
  width: 96%;
}
</style>
<script>
import { getWXPayInfo } from '../../utils/WXPay';
import { getStore } from '../../store/mlocalstorge';
import { Toast,Indicator } from 'mint-ui';

var timeInterval;
export default {
    data() {
        return {
            userInfo: {},
            pageParams: {}
        }
    },
    computed: {
        amount() {
            return (this.pageParams.amount * 1.00).toFixed(2);
        }
    },
    methods: {
        pay() {
            var params = {
            ChangeTypeId: this.pageParams.changeTypeId,
            PaymentTypeId: this.pageParams.paymentTypeId,
            Amount: this.pageParams.amount,
            ReforToTypeId: this.pageParams.reforToTypeId,
            ReforToId: this.pageParams.referToId,
            CustomerId: this.userInfo.UserId
          }

          this.api.createPayOrder(params).then(res => {
              getWXPayInfo(this.pageParams.amount, res.Data.PreOrderNumber, () => {
                  this.payCallBack(res.Data.PaymentId);
              }, (fail) => {
                  Toast('支付失败');
              });
          });
        },

        payCallBack(payId) {
          this.api.getCustomerPaymentStatus({Id: payId}).then(res2 => {
              if (res2.Data == true) {
                //成功回调
                this.execute(this.pageParams.funcName);
              }
          })
        },

        execute(functionName) {
            eval("this." + functionName + "()");
        },

        onlineConsult() {
            var params = {
                uid: this.userInfo.YunXinUserName,
                sdktoken: this.userInfo.YunXinToken,
                nick: this.userInfo.Nickname,
                avatar: this.userInfo.UserHeaderImageUrl
            }
            this.$store.state.myInfo = params;
            this.$router.push({ path: '/OnlineConsult/p2p-' + this.pageParams.doctorId + '/' + this.pageParams.endDateTime});
        },
        advisoryList() {
            this.$router.push({ path: '/MyHealthFile/' + this.pageParams.fileID + "/3"});
        },
        myAdvisory() {
            this.$router.push({ path: '/MyAdvisory'});
        },
        customerAdimre() {

        },
        liveYuBM() {
            this.$router.push({ path: '/LiveListyuDetail/'+ this.pageParams.referToId+ '/' + this.pageParams.LiveTitle});
        },
        liveDetail() {
            this.$router.push({ path: '/LiveDetail/'+ this.pageParams.referToId+ '/' + this.pageParams.LiveTitle});
        },
        liveVideo() {

            this.$store.state.userUID = this.userInfo.YunXinUserName;
            this.$store.state.sdktoken = this.userInfo.YunXinToken;
            this.$store.state.myInfo = {
              uid: this.userInfo.YunXinUserName,
              sdktoken: this.userInfo.YunXinToken,
              nick: this.userInfo.Nickname,
              avatar: this.userInfo.UserHeaderImageUrl
            };
            Indicator.open();
            //初始化nim
            this.$store.dispatch('connect',  this.$store.state.myInfo);
            timeInterval = setInterval(() => {
              if (this.$store.state.hasConnected) {
                Indicator.close();
                clearInterval(timeInterval);
                this.$router.push({ path: '/live/' + this.pageParams.liveId + '/1'});
              }
            }, 1000)
        }
    },
    mounted() {
        this.userInfo = getStore("userInfo");
        this.pageParams = this.$route.query;
    }
}
</script>
