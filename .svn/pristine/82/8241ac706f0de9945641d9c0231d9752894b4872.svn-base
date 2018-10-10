<template>
  <div class="MyHealthList">
    <div v-if="init">
      <div clss="mint-cell" v-if="healthList.length > 0">
        <a :key="Index" v-for="(Item,Index) in healthList">
          <div class="gzs-rdzx" style="padding-top: 0; position: relative;overflow: hidden;"
               @touchstart.stop='touchStart($event, Item.Id, Index)'
               @touchmove.stop='touchMove($event, Index)'
               @touchend.stop='touchEnd($event, Index)'
          >
            <div class="gzs-rdzxc" style="text-align:left;width: 100%;" @click="HealthFile(Item.Id)">
              <div class="gzs-rdzxc-title">
                <img src="../../images/jkda-user.png">姓名：{{Item.Name}}
              </div>
              <div class="gzs-rdzxc-title" v-if="Item.Sex == 0">
                <img src="../../images/jkda-xb.png">性别：男
              </div>
              <div class="gzs-rdzxc-title" v-else>
                <img src="../../images/jkda-xb.png">性别：女
              </div>
              <div class="gzs-rdzxc-title">
                <img src="../../images/jkda-nl.png">年龄：{{Item.Age}}
              </div>
            </div>
            <div class="page-msgbox-wrapper"
                 style="width:20%;position: absolute;
                     right: -20%;height: 100%;background-color: #FFF;
                     border-bottom:1px solid #ddd"
                 :style="{transform: 'translateX(' + transformDistances[Index] + 'px)'}"
                 ref="innerLabel"
            >
              <mt-button class="delete-symbol" @click.native="openConfirm(Item.Id, Index)" size="large"
                         style="height: 100%">
                删除
              </mt-button>
            </div>
          </div>
        </a>
        <img style="position:fixed;bottom:2%;right:2%;width: 48px;" src="../../images/add.png" @click="HealthFile(0) ">
      </div>
      <div v-else>
        <div>
          <img src="../../images/nofile.png" style="margin-top: 30%;width: 161px;">
        </div>
        <div @click="HealthFile(0)">
          <img src="../../images/upload.png" style="margin-top: 5%;width: 74px;">
          <p style="font-size: small">开始添加档案吧</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import Vue from 'vue'

  var maxLength = 0;
  var startTouchedTime;
  var endTouchedTime;

  export default {
    data() {
      return {
        selected: '1',
        healthList: [],
        init: false,
        myTouches: [],
        transformDistances: []
      };
    },
    mounted() {
      let userinfo = window.localStorage.getItem("userInfo");
      userinfo = JSON.parse(userinfo);
      let params = {
        "Id": userinfo.UserId,
        "PageIndex": 1,
        "PageSize": 10,
      };
      this.api.getCustomerHealgthyRecords(params).then(res => {
        this.healthList = res.Data.Data;
        this.healthList.forEach((item, index) => {
          this.transformDistances[index] = 0;
          this.myTouches[index] = {
            startX: 0,//开始触摸的位置
            moveX: 0,//滑动时的位置
            endX: 0,//结束触摸的位置
            disX: 0,//移动距离
            disY: 0,//Y轴移动
            startY: 0,//Y轴开始触摸位置
            moveDistance: 0
          }
        })
        this.init = true;
      });
    },
    methods: {
      touchStart: function (ev, itemId, index) {
        startTouchedTime = new Date().getTime();
        if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.myTouches[index].startX = ev.touches[0].clientX; // 记录开始位置
          this.myTouches[index].startY = ev.touches[0].clientY; // 记录开始位置
        }

        if (maxLength == 0) {
          maxLength = this.$refs.innerLabel[0].offsetWidth;
        }
      },
      touchMove: function (ev, index) {
        ev = ev || event;
        endTouchedTime = new Date().getTime();
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.myTouches[index].moveX = ev.touches[0].clientX;
          //实时的滑动的距离-起始位置=实时移动的位置
          this.myTouches[index].disX = this.myTouches[index].moveX - this.myTouches[index].startX;
          this.myTouches[index].disY = ev.touches[0].clientY - this.myTouches[index].startY;

          var time = endTouchedTime - startTouchedTime;
          if ((Math.abs(this.myTouches[index].disX) > 60 && (time < 500)) || time >= 500 || (Math.abs(this.myTouches[index].disX) < 60 && time < 500)) {
            startTouchedTime = 0;
          }

          if (Math.abs(this.myTouches[index].disY) < Math.abs(this.myTouches[index].disX)) {
            if ((this.myTouches[index].moveDistance + this.myTouches[index].disX + maxLength) <= 0) {
              Vue.set(this.transformDistances, index, -maxLength);
            } else {
              Vue.set(this.transformDistances, index, this.myTouches[index].moveDistance + this.myTouches[index].disX);
            }
          }
        }
      },
      touchEnd: function (ev, index) {
        endTouchedTime = new Date().getTime();
        if ((endTouchedTime - startTouchedTime) < 500 && startTouchedTime != 0) {
          return false;
        }

        ev.preventDefault();
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.myTouches[index].disX = endX - this.myTouches[index].startX;
          this.myTouches[index].moveDistance += this.myTouches[index].disX;

          if (this.myTouches[index].moveDistance >= 0) {
            this.myTouches[index].moveDistance = 0;
          } else if (this.myTouches[index].moveDistance + maxLength <= 0) {
            this.myTouches[index].moveDistance = -maxLength;
          }
        }
      },
      // 档案详情
      HealthFile(FileID) {
        this.$router.push({path: '/MyHealthFile/' + FileID + "/1"})
      },
      // 删除提示
      openConfirm(FileID, index) {
        MessageBox.confirm('确定删除该档案吗?', '提示').then(action => {
          this.api.deleteCustomerHealthyRecord({"Id": FileID}).then(res => {
            if (res.Data) {
              Toast("删除成功！");
              this.healthList.splice(index, 1);
            } else {
              Toast("删除失败，请稍后再试！");
            }
          });
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../../common/style.css';

  .delete-symbol {
    background-color: red;
    color: #FFF;
    font-size: 1.7rem;
    border-radius: 0px;
  }
</style>
