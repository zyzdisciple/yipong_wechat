<template>
  <div class="dbody customer-admire" style="background: #F2F2F2;height: 100%;width: 100%;">
      <div class="money-head bg-white">
          请选择金额
      </div>
      <div class="money-list bg-white">
          <mt-button :class="{active: chooseIndex == Index}" :key="Index" v-for="(Item, Index) in amountList" plain type="primary" @click="chooseMoney(Item, Index)">{{Item}}元</mt-button>
      </div>
      <div class="money-amount bg-white">
          <mt-field label="￥" type="number" placeholder="0.01~1000.00" v-model="amount"></mt-field>
      </div>
      <div style="margin: 10px 0px 10px 0px;width:100%;" class="bg-white">
          <mt-field placeholder="您可以在此输入感谢医生的话!"></mt-field>
      </div>
      <div class="to-pay">
          <mt-button type="primary" @click="toPay()">去支付</mt-button>
      </div>
  </div>
</template>
<script>
  import { getWXPayInfo } from '../../utils/WXPay';
  import { Toast } from 'mint-ui';
  export default {
      data() {
          return {
              amountList: [],
              amount: '',
              chooseIndex: -1,
          }
      },
      methods: {
          toPay() {
              if(this.amount < 0.01 || this.amount > 1000) {
                  Toast("请输入或选择正确的金额，介于0.01~1000之间!");
                  return;
              }

              var pageParams = {
                  amount: this.amount,
                  funcName: 'customerAdimre',
                  referToId: this.$route.params.Id,
                  changeTypeId: '2309',
                  paymentTypeId: '902',
                  reforToTypeId: this.$route.params.typeId
              }
              this.$router.push({name: '直接支付', query: pageParams})
          },
          chooseMoney(amount, index) {
              this.amount = amount;
              this.chooseIndex = index;
          }
      },
      mounted () {
          this.api.getCustomerAdmireConfig({}).then(res => {
            this.amountList = res.Data.AdmireAmount.split(",");
          })
      }
  }
</script>
<style scoped>
    .customer-admire .bg-white {
      background-color: white;
  }

  .customer-admire .money-list >>> .mint-button--primary.is-plain {
      margin: 10px 0 0 3%;
      width: 60px;
      float: left;
    font-size: 1.2rem;
  }

  .customer-admire .money-list {
      width: 100%;
      height: 115px;
  }

  .customer-admire .money-head {
      text-align: left;
    font-size: 1.6rem;
      padding: 10px 0 0 3%;
      width: 97%;
      height: 25px;
  }

  .customer-admire .money-amount {
      width: 100%;
      height: 48px;
  }

  .customer-admire .money-amount >>> .mint-cell .mint-field .mint-cell-value{
    font-size: 2.0rem;
  }

  .customer-admire .to-pay >>> .mint-button--normal {
      width:100%;
  }

  .customer-admire .money-amount >>> .mint-field-core {
    text-align: left;
    background-color: white;
  }

  .customer-admire .money-amount .mint-field >>> .mint-cell-title{
    width: 10%;
    text-align: right;
    font-size: 2.2rem;
  }

  .customer-admire .active {
    background-color: #26A2FF;
    color: white;
  }
</style>
