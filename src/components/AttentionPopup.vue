<template>
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal="false"
    class="pop"
  >
    <div class="main">
      <div class="close-modal" @click="closeModal()">
        <img src="../images/close-2.png"/>
      </div>
      <div class="tips">请长按二维码,关注公众号</div>
      <div class="img">
        <img src="../images/qrcode.jpg" />
      </div>
    </div>
  </mt-popup>
</template>
<script>
  export default {
    data() {
      return {
        popupVisible: true,
      }
    },
    methods: {
      closeModal() {
          if (this.$store.state.reloadUserInfo) {
            this.getUserInfo();
          } else {
            this.popupVisible = false;
            this.$store.state.payAttention = false;
          }
      },
      getUserInfo() {
        this.popupVisible = false;
        this.$store.state.payAttention = false;
        this.$store.state.reloadUserInfo = true;
        window.wechatAuth.authorize();
      },
    }
  }
</script>
<style scoped lang="scss">
  .pop {
    width: 42%;
    height: 150px;
    border-radius: 5px;
    .main {
      height: 100%;
      width: 100%;
      position: relative;
      .close-modal img {
        position: absolute;
        width: 12px;
        top: 3px;
        right: 3px;
      }
      .img {
        width: 100%;
        position: absolute;
        top: 11%;
        img {
          width: 64%;
        }
      }
      .tips {
        position: absolute;
        bottom: 5%;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
      }
      .operation {
        position: absolute;
        width: 50%;
        bottom: 3%;
        height: 25px;
        line-height: 25px;
        font-size: 1.5rem;
        border-top: 0.1rem solid #AFAFAF;
        padding-top: 2%;
      }
      .cancel {
        left: 6px;
      }
      .middle-line {
        position: absolute;
        height: 25px;
        width: 1px;
        border-right: 0.1rem solid #AFAFAF;
        bottom: 3%;
        left: 50%;
      }
      .refresh {
        right: 0px;
      }
    }
  }
</style>
