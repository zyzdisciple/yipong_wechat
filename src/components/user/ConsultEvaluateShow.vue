<template>
  <div class="consult-evaluate">
      <div class="title">
          <img src="../../images/close-2.png" @click="closeModal()"/>
          <span>评价</span>
      </div>
      <div class="do-evaluate">
          <img src="../../images/star0.png" v-if="count < 2" />
          <img src="../../images/star1.png" v-if="count >= 2"/>
          <img src="../../images/star0.png" v-if="count < 4" />
          <img src="../../images/star1.png" v-if="count >= 4"/>
          <img src="../../images/star0.png" v-if="count < 6" />
          <img src="../../images/star1.png" v-if="count >= 6"/>
          <img src="../../images/star0.png" v-if="count < 8" />
          <img src="../../images/star1.png" v-if="count >= 8"/>
          <img src="../../images/star0.png" v-if="count < 10" />
          <img src="../../images/star1.png" v-if="count >= 10"/>
      </div>
      <div class="describe-option" :style="{height: optionHeight + 'px'}">
        <div :key="index" v-for="(item, index) in describeList" :class="{left: index % 2 == 0, right: index % 2 == 1}">
            <mt-button class="active"  type="default" plain>{{item}}</mt-button>
        </div>
      </div>
      <div class="describe-content">
          <p>{{consultContent}}</p>
      </div>
      <div class="to-admire">
          <div class="admire-icon">
            <img src="../../images/pl-zx.png" @click="toAdmire()" width="80%">
          </div>
          <span>前往致谢</span>
      </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {
            count: 10,
            describeList: [],
            consultContent: null,
            evaluateInfo: {},
            optionHeight: 0,
          }

      },
      props: {
          consultId: Number,
          workRoomId: Number,
          consultTypeId: Number,
          popupVisible: {
              type: Boolean,
              default() {
                  return false;
              }
          },
      },
      methods: {
          toAdmire() {
              this.$router.push({path: '/pay/CustomerAdmire/' + this.consultId + "/" + this.consultTypeId})
          },
          closeModal() {
              this.$emit('change-modal', false);
          }
      },
      mounted() {
          //获取咨询评价信息
          this.api.getCustomerOnlineConsultEvaluation({Id: this.consultId}).then(res => {
              this.evaluateInfo = res.Data;
              this.count = (this.evaluateInfo.Score / 1.0).toFixed(1);
              var list = this.evaluateInfo.TagName.split(",");
              for (var i = 0, L = list.length; i < L; i++) {
                var temp;
                temp = list[i];
                if (list[i].length > 4) {
                  temp = list[i].substr(0, 4) + "...";
                }
                this.describeList.push(temp);
              }
              this.optionHeight = Math.ceil(list.length / 2) * 42;
              this.consultContent = this.evaluateInfo.Content;
          })
      }
  }
</script>
<style scoped>
.consult-evaluate {
  width: 100%;
  height: 100%;
  position: relative;
}
.consult-evaluate .title {
  width: 100%;
  height: 5%;
  padding-top: 2%;
  margin-bottom: 2%;
}
.consult-evaluate .title img{
    width: 7%;
    position: absolute;
    left: 3%;
    top: 3%;
}
.consult-evaluate .title span{
  font-size: 2.0rem;
  color: black;
  height: 100%;
  width: 100%;
}

.consult-evaluate .do-evaluate {
  height: 5%;
  width: 100%;
}
.consult-evaluate .do-evaluate img{
  width: 7%;
}
.consult-evaluate .describe-option {
  margin: 10px 0px;
}
.consult-evaluate .describe-option div {
  float: left;
  width: 50%;
  height: 42px;
}

.consult-evaluate .describe-option .left button {
  float: right;
}

.consult-evaluate .describe-option .right button {
  float: left;
}

.consult-evaluate .describe-option .mint-button--default.is-plain {
  color: #A3A3A3;
  width: 55%;
  height: 80%;
  margin: 1% 2%;
  border: 1px solid #F1F1F1;
  font-size: 1.5rem;
}

.consult-evaluate .describe-content p {
  width: 80%;
  margin: 0 auto;
  font-size: 1.5rem;
  font-family: "微软雅黑";
}

/*.consult-evaluate .describe-content{
    width: 60%;
    margin: 10px auto 0 auto;
    border: 1px solid #E0E0E0;
}*/
.consult-evaluate textarea {
  resize: none;
  text-align: left;
  font-size: 1.4rem;
}


.active {
  border-color: #359DFA !important;
  color: #359DFA !important;
  background-color: rgba(38,162,255, 0.2) !important;

}

.consult-evaluate .admire-icon {
  width: 10%;
  margin: 15px auto 10px auto;
  padding-top: 3px;
  height: 10%;
  border: 1px solid #FFB29E;
  border-radius: 22px;
  background: #FFF2EB;
}
</style>
