<template>
  <div>
    <div v-if="studioList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="false" infinite-scroll-distance="50">
      <a :key="studioIndex" v-for="(studioItem,studioIndex) in studioList">
        <div class="gzs-ys brw" @click="StudioDetail(studioItem.Id, studioItem.Name)" style="height: 125px;">
          <div class="gzs-ys-l" style="height: 80%;margin-left: 5px;">
            <div v-bind:style="{backgroundImage:'url(' + studioItem.Picture.Url + ')'}"
                 style="height: 100%;background-position: center center;background-size: cover;background-repeat: no-repeat"></div>
          </div>
          <div class="gzs-ys-r" style="text-align:left;width:67%">
            <div class="gzs-ys-r1">
              <div class="doctor-name text-over-ellipsis">{{studioItem.showTitleContent}}
                <f class="doctor-suffix">医生工作室</f>
              </div>
            </div>
            <div class="gzs-ys-r2 text-over-ellipsis lh20" style="width: 100%;">{{studioItem.Hospital}}</div>
            <div class="gzs-ys-r2 lh20">{{studioItem.Department}}·{{studioItem.Technical}}</div>
            <div class="gzs-ys-r3 lh20">从业年限{{studioItem.Seniority}}年</div>
            <div class="gzs-ys-r4 lh20">
              <img src="../../images/star1.png" v-for="n in studioItem.solidGrade">
              <img src="../../images/harfStar.png" v-if="studioItem.harfGrade">
              <img src="../../images/star0.png" v-for="n in studioItem.hollowGrade">
              {{studioItem.fraction}}
            </div>
          </div>
          <div class="gzs-ys-rr" style="width: 28px"><img src="../../images/gzs-jt1.png"></div>
        </div>
        <div class="gzs-tab brw" style="text-align: left;" v-if="studioItem.Good.length > 0">
          <div class="gzs-tabxq" :key="adeptIndex" v-for="(adeptItem,adeptIndex) in studioItem.Good">
            {{adeptItem}}
          </div>
        </div>
        <div class="doctor-room-bottom">
          <div class="doctor-room-thanks">
            <img class="thanks-img" src="../../images/pl-zx.png">
            <span @click="customerAdmire(studioItem.Id)">致谢</span>
          </div>
          <div class="doctor-room-consult">
            <img class="ask-img" src="../../images/message-o.png">
            <span class="ask-span"
                  @click="createOnlineConsult(studioItem.CustomerId, studioItem.Id, studioItem.IsOnlineConsult, studioItem.OnlineConsultExpense)">
                    在线咨询
              <span v-if="studioItem.IsOnlineConsult">
                <span style="font-size: 1.4rem;"
                      v-if="studioItem.IsOnlineConsult && (studioItem.OnlineConsultExpense - 0) != 0">
                  ({{studioItem.OnlineConsultExpense}}元)
                </span>
                <span style="font-size: 1.4rem;"
                      v-if="studioItem.IsOnlineConsult && (studioItem.OnlineConsultExpense - 0) == 0">
                  (免费)
                </span>
              </span>
             </span>
          </div>

        </div>
      </a>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  export default {
    data  () {
      return {
        PageIndex: 1,
        PageSize: 10,
        studioList: [],
        loading: true,
        loadPage: false,
      }
    },
    methods: {
      StudioDetail(studioId, studioName) {
        this.$router.push({path: '/StudioDetail/' + studioId + '/' + studioName});
      },
      customerAdmire(id) {
        this.$router.push({path: '/pay/CustomerAdmire/' + id + "/2106"});
      },
      createOnlineConsult(customerId, workRoomId, isOnline, amount) {
        if (!isOnline) {
          Toast('医生未开通在线咨询服务');
        } else {
          this.$router.push({path: '/CreateOnlineConsult/' + customerId + '/' + workRoomId + '/' + amount + '/' + '1'});
        }
      },
      loadMore() {
        this.loading = true;
        this.loadPage = true;
        setTimeout(() => {
          this.loadData();
        }, 1500);
      },
      loadData() {
        let doctorListParams = {
          SymptomId: this.$route.params.symbolId / 1,
          "PageIndex": this.PageIndex,
          "PageSize": this.PageSize
        }
        this.api.getDoctorWorkRoomsBySymptomId(doctorListParams).then(res => {
          for (let i = 0; i < res.Data.Data.length; i++) {
            var item = res.Data.Data[i]
            item.fraction = item.CustomerAvgScore / 2;
            if (String(item.fraction).indexOf(".") > -1) {
              item.solidGrade = parseInt(item.fraction);
              item.harfGrade = true;
              item.hollowGrade = 4 - item.solidGrade;
            } else {
              item.solidGrade = item.fraction;
              item.fraction = item.fraction + ".0";
              item.harfGrade = false;
              item.hollowGrade = 5 - item.solidGrade;
            }
            if (item.AdeptDomain == null || item.AdeptDomain == "") {
              item.Good = [];
            } else {
              item.Good = item.AdeptDomain.split(" ");
            }
            item.showTitleContent = item.Name ? item.Name.replace("医生工作室", "") : "";
            this.studioList.push(item);
          }
          this.PageIndex++;
        });
      }
    },
    mounted () {
      this.loadData();
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .doctor-room-bottom {
    width: 100%;
    height: 40px;
    background-color: white;
    margin-bottom: 5px;
    border-top: 1px solid #F2F2F2;
    color: black;
    .doctor-room-thanks {
      width: calc(50% - 1px);
      height: 100%;
      float: left;
      border-right: 1px solid #F2F2F2;
      img {
        width: 9%;
        float: left;
        margin: 12px 0px 0px 36%;
      }
      span {
        font-size: 1.3rem;
        float: left;
        margin: 12px 0px 0px 6px;
      }
    }
    .doctor-room-consult {
      width: calc(50% - 1px);
      height: 100%;
      float: left;
      img {
        width: 9%;
        float: left;
        margin: 12px 0px 0px 8%;
      }
      .ask-span {
        font-size: 1.3rem;
        float: left;
        margin: 12px 0px 0px 6px;
      }
    }
  }

  .doctor-name {
    width: 100%;
    float: left;
    color: black;
    font-size: 1.8rem;
  }

  .doctor-suffix {
    font-size: 1.2rem;
    color: #757575;
    margin: 4px 0 0 5px;
  }
</style>
