<template>
  <div class="MyCollectionWeHealth" v-show="init">
    <div class="zbyg-list" :key="Index" v-for="(Item,Index) in list" v-if="list.length > 0">
      <div class="type1" v-if="Item.workRoomDynamicModeId == 1">
        <div class="wjklist2-title" @click="weiDetail(Item.studioStatusId, Item.title)">
          <img :src="Item.fileList[0].Url" v-if="Item.fileList.length > 0"/>
        </div>
        <div class="wjklist2-contect" @click="weiDetail(Item.studioStatusId)">
          <div style="width: 100%;">
            <span class="zbygbt text-over-ellipsis">{{Item.title}}</span>
            <div class="collect-button">
              <button class="button-primary" @click="cancelCollection(Item.studioStatusId)">取消收藏</button>
            </div>
          </div>
          <span class="zbygsbt show-three-lines" v-html="Item.content"></span>
        </div>

      </div>
      <div class="type2" v-if="Item.workRoomDynamicModeId == 0">
        <div class="wjklist2-title">
          <div class="title-r" @click="weiDetail(Item.studioStatusId, Item.title)">
            <img :src="Item.WorkRoom.Picture.Url">
          </div>
          <div class="wjklist2-title-l" @click="weiDetail(Item.studioStatusId, Item.title)">
            <div class="t1">{{Item.WorkRoom.Name}}</div>
            <div class="t2">{{Item.createTime}}
              <div class="gzs-tabxq">
                {{Item.customerCommentCounts}}评论
              </div>
            </div>
          </div>
          <div class="collect-button">
            <button class="button-primary" @click="cancelCollection(Item.studioStatusId)">取消收藏</button>
          </div>
        </div>

        <div class="wjklist2-contect" @click="weiDetail(Item.studioStatusId, Item.title)">
          <div class="content-title text-over-ellipsis">{{Item.title}}</div>
          <div class="content-text-content show-three-lines" v-html="Item.content"></div>
          <p v-if="Item.fileList.length > 0">
          <div :key="imgIndex" v-for="(imgItem,imgIndex) in Item.fileList">
            <img :src="imgItem.ThumbUrl" style="width: 60%;margin-right: 2%" v-if="Item.resourceTypeId == 2">
            <img :src="imgItem.Url" style="width: 30%;margin-right: 2%" v-else>
          </div>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  export default {
    data() {
      return {
        list: [],
        PageIndex: 0,
        PageSize: 10,
        init: false,
      };
    },
    methods: {
      //视频详情
      weHealthDetail(WeHealthID) {
        this.$router.push({path: '/WeHealthDetail/' + WeHealthID});
      },
      // 取消收藏
      cancelCollection(WeHealthID) {
        let params = {
          "CollectID": WeHealthID,
          "CollectType": 9,
          "IsCollect": false,
        }
        this.api.CollectVideo(params).then(res => {
          if (res.Result == 1) {
            for (let i = 0; i < this.list.length; i++) {
              if (WeHealthID == this.list[i].studioStatusId) {
                this.list.splice(i, 1);
              }
            }
          } else {
            Toast("取消收藏失败，请稍后再试！");
          }
        });
      },
      //进入微健康详情
      weiDetail(event, shareTitle) {
        shareTitle = shareTitle ? shareTitle : '微健康详情';
        this.$router.push({path: '/WeHealthDetail/' + event + '/' + shareTitle})
      },
      loadData(initLoad) {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.PageIndex = initLoad ? 1 : this.PageIndex + 1;
        let params = {
          "Id": userInfo.UserId,
          "PageIndex": this.PageIndex,
          "PageSize": this.PageSize,
        };
        if (initLoad) {
          Indicator.open();
        }
        this.api.getCollectWorkRoomDynamics(params).then(res => {
          var tempData = res.Data.Data;
          var tempList = [];
          for (let i = 0, L = tempData.length; i < L; i++) {
            if (tempData[i].workRoomDynamicModeId == 1) {
              tempList.push(tempData[i]);
              Indicator.close();
            } else {
              this.api.getWorkRoomDynamicById({"Id": tempData[i].studioStatusId}).then(res2 => {
                tempList.push(res2.Data);
              });
            }
          }

          if (initLoad) {
            this.list = tempList;
          } else if (tempList && tempList.length > 0) {
            tempList.forEach(item => {
              this.list.push(item);
            })
          } else {
            this.$emit('changeAllLoadStatus');
          }
          this.init = true;
        });
      }
    },
    mounted() {
      this.loadData(true);
    },
  }
</script>

<style scoped lang="scss">
  @import '../../common/style.css';

  .MyCollectionWeHealth {
    .zbyg-list {
      margin-bottom: 6px;
      height: auto;
      .collect-button {
        width: 65px;
        text-align: center;
        position: absolute;
        right: 0px;
        top: 5px;
      }
      .type1 {
        height: 100px;
        position: relative;
        .wjklist2-title {
          width: 100px;
          float: left;
          overflow: hidden;
          height: 80px;
          padding: 2% 0;
          img {
            width: inherit;
          }
        }
        .wjklist2-contect {
          width: calc(100% - 130px);
          text-align: left;
          float: left;
          .zbygbt {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 5px 0 10px;
            display: block;
            width: calc(100% - 65px);
            float: left;
          }
          .zbygsbt {
            color: #888;
            font-size: 1.2rem;
          }
        }
      }
      .type2 {
        width: 100%;
        position: relative;
        height: 300px;
        overflow: hidden;
        .wjklist2-title {
          height: 60px;
          position: relative;
          .title-r {
            position: absolute;
            top: 10px;
            left: 2%;
            img {
              height: 40px;
              width: 40px;
              border-radius: 40px;
            }
          }
          .wjklist2-title-l {
            height: 55px;
            margin: 0;
            text-align: left;
            left: calc(50px + 2%);
            position: absolute;
          }
        }
        .wjklist2-contect {
          padding: 0 2% 2%;
          text-align: left;
          height: calc(100% - 60px);
          .content-title {
            font-size: 1.4rem;
          }
          .content-text-content {
            word-break: break-all;
            word-wrap: break-word;
            color: #888;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
