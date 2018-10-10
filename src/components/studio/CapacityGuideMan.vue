<template>
    <div class="dbody">
        <div class="guide-top">
            <mt-button size="small" v-for="item in symbolDatas" :key="item.Id"
                       @click="findDoctor(item.Id)" type="default">{{item.SymptomName}}</mt-button>
        </div>
        <div class="guide-right">
            <img src="../../images/capacityGuide/zndy-jt2@3x.png" width="45%" @click="womanGuide()">
            <div>女士</div>
        </div>
        <div class="inner-body">
            <div class="inner-body-head" style="width: 100%; margin: 0px 0px -0.045rem 35%; height: 85px;" @click="showSymbol(headMessage.Id)">
              <img src="../../images/capacityGuide/body-man1@3x.png" style="width: 20%;margin-top:2px;">
                <img src="../../images/capacityGuide/body-man-jt1@3x.png" style="width: calc(8% - 0.13rem); margin-left: 23%;">
                <div class="content" style="margin: 30px 0 0 10px;">{{headMessage.Name}}</div>
            </div>
            <div class="inner-body-body-top" style="width: 100%;height: 90px; margin: 0px 0px 0px 20%;" @click="showSymbol(bodyTopMessage.Id)">
                <img src="../../images/capacityGuide/body-man2@3x.png" style="width: 50%;">
              <img src="../../images/capacityGuide/body-man-jt2@3x.png"
                   style="width: calc(6% + 0.12rem);margin-left: 8%;">
              <div class="content" style="margin: 33px 0 0 10px;">{{bodyTopMessage.Name}}</div>
            </div>
            <div class="inner-body-body-mid" style="width: 100%;margin: 0px 0px 0px 16.5%; height: 78px;" @click="showSymbol(bodyMidMessage.Id)">
                <img src="../../images/capacityGuide/body-man3@3x.png" style="width: 57%;">
                <img src="../../images/capacityGuide/body-man-jt3@3x.png" style="width: calc(6% + 0.1rem); margin-left: 5%;">
                <div class="content" style="margin: 26px 0 0 10px;">{{bodyMidMessage.Name}}</div>
            </div>
            <div class="inner-body-limb" style="width: 100%;margin: 0px 0px 0px 16.1%;" @click="showSymbol(limbMessage.Id)">
                <img src="../../images/capacityGuide/body-man4@3x.png" style="width: 58%;margin-top: -0.03rem;" >
                <img src="../../images/capacityGuide/body-man-jt4@3x.png" style="width: calc(6% + 0.06rem);margin-left: 5%;">
                <div class="content" style="margin: 109px 0 0 10px;">{{limbMessage.Name}}</div>
            </div>
        </div>
        <div style="width: 100%;height: 100%;">
            <mt-popup
              v-model="popupVisible"
              position="bottom">
                <div class="tips-inner" style="width: 100%; height: 100%;">
                    <div class="symbol-list-head">选择相应症状</div>
                    <hr />
                    <div class="symbol-list">
                        <mt-button size="small" v-for="item in innerSymbolDatas" :key="item.Id"
                                   @click="findDoctor(item.Id)" type="default">{{item.SymptomName}}</mt-button>
                    </div>
                    <hr />
                    <div class="cancel-popup">
                        <div @click="closeModal()">取消</div>
                    </div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                headMessage: '',
                bodyTopMessage: '',
                bodyMidMessage: '',
                limbMessage: '',
                symbolDatas: [],
                popupVisible: false,
                innerSymbolDatas: []
            }
        },

        methods: {
            findDoctor (symbolId) {
                this.$router.push({path: '/Guide2DoctorList/' + symbolId});
            },
            //点击展示常见病
            showSymbol (partIndex) {
                let params = {
                    SexTypeId: "0",
                    BodyPartId: partIndex,
                    IsCommoned: "",
                    PageIndex: 1,
                    PageSize: 1000
                };
                this.api.getSymptomDatas(params).then(res => {
                    this.popupVisible = true;
                    this.innerSymbolDatas = res.Data.Data;
                })

            },

            closeModal () {
                this.popupVisible = false;
            },

            womanGuide () {
              this.$router.push({name: "智能导医-女士"});
            }
        },

        create() {

        },

        mounted() {
            //初始化部位信息
            this.api.getBodyParts({}).then(res => {
                let partInfos = res.Data.sort(function(a, b) {
                    return (a.Id - b.Id);
                });
                this.headMessage = partInfos[0];
                this.bodyTopMessage = partInfos[1];
                this.bodyMidMessage = partInfos[2];
                this.limbMessage = partInfos[3];
            });

            //查询常见病信息
            let params = {
                SexTypeId: "0",
                IsCommoned: true,
                PageIndex: 1,
                PageSize: 5
            }
            this.api.getSymptomDatas(params).then(res => {
                this.symbolDatas = res.Data.Data;
            })
        }
    }

</script>

<style scoped lang="scss">
  .dbody {
    font-size: 1.6rem;
  }
  .inner-body img {float: left;}
  .inner-body {width: 290px; margin: 20% 20px; float: left;}
  .inner-body .content {float: left;}
  .mint-popup-bottom {width: 100%;height: 43%;}
  .symbol-list-head {
      height: 4%;
      padding: 5% 0 5% 6%;
      text-align: left;
      font-weight: 500;
      width: 100%;
      color: #212121;
  }

  hr {
      width: 94%;
      background-color: #E2E2E2;
      height: 1px;
      border: none;
  }

  .symbol-list {
      width: 100%;
      height: calc(100% - 117px);
      overflow: auto;
  }

  .symbol-list .mint-button--small {
      margin: 2% 2% 0 6%;
      color: #212121;
      float: left;
  }

  .guide-top {position: fixed;width: 100%;  height: 8%;overflow: auto;}

  .guide-top .mint-button--small {float: left;margin: 2% 0 0 4%;}

  .guide-right {position: fixed; top: 55%; right: 0;}
</style>
