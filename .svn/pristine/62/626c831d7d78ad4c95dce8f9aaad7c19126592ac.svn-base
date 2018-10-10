<template>
  <div class="DoctorDetail">
    <div class="gzs-ys1 brw">
      <div class="gzs-ys-l1" style="width:25%">
        <img :src="DoctorInfor.HeaderImgUrl" v-if="DoctorInfor.HeaderImgUrl != null && DoctorInfor.HeaderImgUrl != ''">
        <img src="../../assets/default_avatar.png" v-else>
      </div>
      <div class="gzs1-ys-r" style="width:65%;text-align:left">
        <div class="gzs1-ys-r1">{{DoctorInfor.CustomerRealName}}</div>
        <div class="gzs1-ys-r2">{{DoctorInfor.Department}}·{{DoctorInfor.Technical}}</div>
        <div class="gzs1-ys-r2">{{DoctorInfor.Hospital}}</div>
      </div>
    </div>
    <div class="titlebg1 personal-introduce">
      <div class="titlebg1-1 title"><img class="titlebg1-img" src="../../images/zwjj.png">
        <span class="titlebg1-f">自我介绍</span>
      </div>
      <div class="ysjj-nr" style="text-align: left">
        <pre>{{DoctorInfor.PersonalIntro}}</pre>
      </div>
    </div>
    <div class="titlebg1 mt5">
      <div class="titlebg1-1"><img class="titlebg1-img" src="../../images/gzjl.png">
        <span class="titlebg1-f">工作经历</span>
      </div>
      <div class="ysjj-nr" style="text-align: left">
        <pre>{{DoctorInfor.PersonalExperience}}</pre>
      </div>
    </div>

    <div class="titlebg1 mt5">
      <div class="titlebg1-1"><img class="titlebg1-img" src="../../images/grfx.png">
        <span class="titlebg1-f">个人分享</span>
      </div>
      <div class="ysjj-nr" style="text-align: left">
        <pre>{{DoctorInfor.PersonalShare}}</pre>
      </div>
    </div>
  </div>
</template>
<script scoped>
  import * as constant from '../../configs/constant';
  import {getStore, removeStore} from '../../store/mlocalstorge';
  export default {
    data() {
      return {
        DoctorInfor: Object,
      }
    },
    props: {},
    computed: {},
    methods: {},
    mounted() {
      // 工作室信息
      let params = {
        "id": this.$route.params.DoctorID,
      }
      this.api.getWorkRoomCustomer(params).then(res => {
        this.DoctorInfor = res.Data;
      });
    },

  }
</script>
<style scoped lang="scss">
  @import '../../common/style.css';

  .gzs-ys1 {
    min-height: 120px;
  }

  .personal-introduce {
    width: 100%;
    margin-top: 5px;
  }
</style>
