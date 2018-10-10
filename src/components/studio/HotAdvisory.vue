<template>
    <div class="hotAdvisiory">
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <div v-if="List.length > 0">
                    <a :key="Index" v-for="(Item,Index) in List">
                        <div class="gzs-rdzx" @click="zxDetail(Item.Id, Item.WorkRoomId)">
                            <div class="gzs-rdzxc" style="text-align:left;width: 90%;">
                                <div class="gzs-rdzxc-title" style="border-bottom: 1px solid;border-color: #eee">
                                    {{Item.Title}}
                                    <div class="gzs-rdzxc-title-r" style="color: #ff9577">已结束</div>
                                </div>
                                <div class="gzs-rdzxc-user">
                                    <img src="../../images/gzs-user.png">咨询用户：{{Item.PatientRealName}}
                                </div>
                                <div class="gzs-rdzxc-time">
                                    <img src="../../images/gzs-time.png">咨询时间：{{Item.CreatedOnUtc}}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <p v-show="loadPage" class="page-infinite-loading">
                  <mt-spinner type="fading-circle"></mt-spinner>
                  加载中...
                </p>
                <p v-show="endPage" class="page-infinite-loading">
                  加载到底了！
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';

var timeInterval;
export default {
  components: {
  },
  data() {
      return {
          List: [],
          PageIndex: 1,
          PageSize: 10,
          wrapperHeight: 0,
          loading: true,
          loadPage: false,
          endPage: false,
      }
  },

  mounted() {
      // 热度咨询
      let hotParams = {
        "ConsultTypeId": 0,
        "StatusId": 2,
        "WorkRoomId": this.$route.params.StudioID,
        "CustomerHealthyRecordId": -1,
        "Title": "",
        "CustomerId": -1,
        "PageIndex": this.PageIndex,
        "PageSize": this.PageSize,
      }
      this.api.getHotOnline(hotParams).then(res => {
          this.List = res.Data.Data;
          if(res.Data.HasNextPage) {
              this.loading = false;
          } else {
              this.endPage = true;
              this.loading = true;
          }
      });
  },
  methods: {
      // 咨询详情
      zxDetail(advisoryID, workRoomId) {
          this.$router.push({path: '/chat/chatInfo/' + advisoryID + '/' + workRoomId});
      },
      // 加载更多
      loadMore() {
          this.loading = true;
          this.loadPage = true;
          setTimeout(() => {
              this.PageIndex++;
              let hotParams = {
                  "ConsultTypeId": 0,
                  "StatusId": 2,
                  "WorkRoomId": this.$route.params.StudioID,
                  "CustomerHealthyRecordId": -1,
                  "Title": "",
                  "CustomerId": -1,
                  "PageIndex": this.PageIndex,
                  "PageSize": this.PageSize,
              }
              this.api.getHotOnline(hotParams).then(res => {
                  for(let i=0;i<res.Data.Data.length;i++) {
                      this.List.push(res.Data.Data[i])
                  }
                  this.loadPage = false;
                  if(res.Data.HasNextPage) {
                      this.loading = false;
                  } else {
                      this.endPage = true;
                      this.loading = true;
                  }
              });
          }, 800);
      }
  },

}
</script>

<style scoped lang="scss">
@import '../../common/style.css';
.gzs-rdzxc-title-r {
    float: right;
}
</style>
