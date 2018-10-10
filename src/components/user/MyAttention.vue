<template>
  <div>
    <div class="my-attention">
      <div class="users-bg3-l">
        <div :class='activeDoc' @click="showDocList">医生工作室</div>
      </div>
      <div class="users-bg3-r">
        <div :class='activeMec' @click="showMecList">机构直播间</div>
      </div>
    </div>
    <div class="LiveTalent" style="text-align:left">
      <MyAttentionDoc v-show="showDoc"></MyAttentionDoc>
      <MyAttentionMec v-show="showMec"></MyAttentionMec>
    </div>
  </div>

</template>

<script>
  import MyAttentionDoc from '@/components/User/MyAttentionDoc';
  import MyAttentionMec from '@/components/User/MyAttentionMec';
  export default {
    components: {
      MyAttentionDoc, MyAttentionMec,
    },
    data() {
      return {
        showMec: false,
        showDoc: true,
        activeDoc: "is-selected",
        activeMec: "",
      };
    },

    methods: {
      // 医生工作室
      showDocList() {
        this.activeDoc = "is-selected"
        this.activeMec = ""
        this.showDoc = true
        this.showMec = false
      },
      // 机构直播间
      showMecList() {
        this.showDoc = false
        this.showMec = true
        this.activeDoc = ""
        this.activeMec = "is-selected"
      },
    },

    created() {
    },
    mounted() {
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../common/style.css';

  .my-attention {
    height: 50px;
    padding: 0;
    position: fixed;
    top: 0px;
    z-index: 2;
    width: 100%;
  }

  .users-bg3-l, .users-bg3-r {
    height: calc(100% - 15px);
    text-align: -webkit-center;
  }

  .is-selected {
    height: 100%;
    width: 100%;
    color: #26a2ff;
    border-bottom: 2px solid #03a9f4;
  }
</style>
