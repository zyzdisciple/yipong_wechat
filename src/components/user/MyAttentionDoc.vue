<template>
  <div :style="scrollStyle" v-infinite-scroll="docLoadMore" infinite-scroll-immediate-check="false"
       infinite-scroll-disabled="docLoading" class="live-talent" infinite-scroll-distance="50">
    <div v-if="studioDocList.length > 0" v-show="init">
      <a :key="studioIndex" v-for="(studioItem,studioIndex) in studioDocList">
        <div class="gzs-ys brw" @click="StudioDetail(studioItem.Id, studioItem.Name)">
          <div class="gzs-ys-l">
            <div class="gzs-ys-l-img" v-bind:style="{backgroundImage:'url(' + studioItem.Picture.Url + ')'}"></div>
          </div>
          <div class="gzs-ys-r">
            <div>
              <div class="gzs-ys-r1">
                <div class="doctor-name text-over-ellipsis">
                  {{studioItem.showTitleContent}}
                  <f class="doctor-suffix">医生工作室</f>
                </div>
              </div>
              <div class="gzs-ys-rr" style="width: 70px;padding-top:10px;">
                <button @click.stop="unsubscribe(studioItem.Id)" class="button-primary-gz">取消关注</button>
              </div>
            </div>
            <div class="gzs-ys-r2 text-over-ellipsis lh20">{{studioItem.Hospital}}</div>
            <div class="gzs-ys-r2 lh20">{{studioItem.Department}}·{{studioItem.Technical}}</div>
            <div class="gzs-ys-r3 lh20">从业{{studioItem.Seniority}}年</div>
            <div class="gzs-ys-r4 lh20">
              <img src="../../images/star1.png" v-for="n in studioItem.solidGrade">
              <img src="../../images/harfStar.png" v-if="studioItem.harfGrade">
              <img src="../../images/star0.png" v-for="n in studioItem.hollowGrade">
              {{studioItem.fraction}}
            </div>
          </div>
        </div>
        <div class="gzs-tab brw mb5" style="text-align: left;">
          <div class="gzs-tabxq" :key="adeptIndex" v-for="(adeptItem,adeptIndex) in studioItem.Good">
            {{adeptItem}}
          </div>
        </div>
      </a>
    </div>
    <p v-show="loadPage" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script scoped>
  export default {
    data(){
      return {
        studioDocList: [],
        docPageIndex: 1,
        PageSize: 20,
        init: false,
        docLoading: false,
        loadPage: false,
        scrollStyle: {
          top: '50px',
          height: document.documentElement.clientHeight - 50 + 'px'
        },
      };
    },
    methods: {
      //工作室详情
      StudioDetail(event, name) {
        this.$router.push({path: '/StudioDetail/' + event + '/' + name})
      },
      // 取消关注
      unsubscribe(StudioID) {
        let userInfo = window.localStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        let params = {
          "UserID": userInfo.UserId,
          "WorkRoomId": StudioID,
          "IsFollow": false,
        };
        this.api.FollowWorkRoom(params).then(res => {
          if (res.Result == 1) {
            for (let i = 0; i < this.studioDocList.length; i++) {
              if (StudioID == this.studioDocList[i].Id) {
                this.studioDocList.splice(i, 1);
              }
            }
          } else {
            Toast("取消关注失败，请稍后再试！");
          }
        });
      },
      docLoadMore() {
        this.loadPage = true;
        this.docLoading = true;
        setTimeout(() => {
          this.docPageIndex++;
          let params = {
            "PageIndex": this.docPageIndex,
            "PageSize": this.PageSize,
            "CustomerTypeId": 1,
          };
          this.api.getCustomerFollowWorkRooms(params).then(res => {
            for (let i = 0; i < res.Data.Data.length; i++) {
              var item = res.Data.Data[i];
              item.fraction = item.Grade / 2;
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
              if (item.AdeptField == null || item.AdeptField == "") {
                item.Good = []
              } else {
                item.Good = item.AdeptField.split(" ");
              }
              item.showTitleContent = item.Name ? item.Name.replace("医生工作室", "") : "";
              this.studioDocList.push(item);
            }
            this.loadPage = false;
            if (res.Data.HasNextPage) {
              this.docLoading = false;
            } else {
              this.docLoading = true;
            }
          });

        }, 2000);
      },
    },
    mounted() {
      let params = {
        "PageIndex": this.docPageIndex,
        "PageSize": this.PageSize,
        "FollowTypeId": 1,
      };
      this.api.getCustomerFollowWorkRooms(params).then(res => {
        for (let i = 0; i < res.Data.Data.length; i++) {
          var item = res.Data.Data[i];
          item.fraction = item.Grade / 2;
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
          if (item.AdeptField == null || item.AdeptField == "") {
            item.Good = []
          } else {
            item.Good = item.AdeptField.split(" ");
          }
          item.showTitleContent = item.Name ? item.Name.replace("医生工作室", "") : "";
          this.studioDocList.push(item)
        }
        this.init = true;
      });
    },
  }
</script>

<style scoped lang="scss">
  @import '../../common/style.css';

  .live-talent {
    text-align: left;
    position: fixed;
    width: 100%;
    overflow: scroll;
  }

  .gzs-ys {
    height: 125px;
    .gzs-ys-l {
      height: 80%;
      margin-left: 5px;
      .gzs-ys-l-img {
        height: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .gzs-ys-r {
      width: calc(100% - 105px);
      .gzs-ys-r1 {
        width: calc(100% - 80px);
        position: relative;
        height: 26px;
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
      }
      .gzs-ys-r2 {
        width: 100%;
      }
    }
  }
</style>
