<template>
    <div class="dbody">
        <div class="guide-top">
            <mt-button size="small" v-for="item in symbolDatas" :key="item.Id"
                       @click="findDoctor(item.Id)" type="default">{{item.SymptomName}}</mt-button>
        </div>
        <div class="guide-left">
            <img src="../../images/capacityGuide/zndy-jt1@3x.png" width="45%" @click="manGuide()">
            <div>男士</div>
        </div>
        <div class="inner-body">
            <div class="inner-body-head" style="width: 100%; margin: 0px 0 -0.01rem 49%; height: 80px;" @click="showSymbol(headMessage.Id)">
                <img src="../../images/capacityGuide/body-woman1@3x.png" style="width: 20%;">
                <img src="../../images/capacityGuide/body-woman-jt1@3x.png" style="width: calc(6% + 0.07rem); margin-left: 18%;">
                <div class="content" style="margin: 27px 0 0 10px;">{{headMessage.Name}}</div>
            </div>
            <div class="inner-body-body-top" style="width: 100%; height: 83px; margin: 0 0 0 39%;" @click="showSymbol(bodyTopMessage.Id)">
                <img src="../../images/capacityGuide/body-woman2@3x.png" style="width: 40%;">
                <img src="../../images/capacityGuide/body-woman-jt2@3x.png" style="width: calc(6% + 0.07rem);margin-left: 8%;">
              <div class="content" style="margin: 31px 0 0 10px;">{{bodyTopMessage.Name}}</div>
            </div>
            <div class="inner-body-body-mid" style="width: 100%; margin: 0 0 0 37%; height: 73px;" @click="showSymbol(bodyMidMessage.Id)">
                <img src="../../images/capacityGuide/body-woman3@3x.png" style="width: 44%;">
                <img src="../../images/capacityGuide/body-woman-jt3@3x.png" style="width: calc(6% + 0.1rem); margin-left: 6%;">
                <div class="content" style="margin: 26px 0 0 10px;">{{bodyMidMessage.Name}}</div>
            </div>
            <div class="inner-body-limb" style="width: 100%; margin: 0 0 0 37%;" @click="showSymbol(limbMessage.Id)">
                <img src="../../images/capacityGuide/body-woman4@3x.png" style="width: 44%;" >
                <img src="../../images/capacityGuide/body-woman-jt4@3x.png" style="width: calc(6% + 0.06rem);margin-left: 6%;">
                <div class="content" style="margin: 96px 0 0 10px;">{{limbMessage.Name}}</div>
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
                    SexTypeId: "1",
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

            manGuide () {
              this.$router.push({name: "智能导医-男士"});
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
                SexTypeId: "1",
                IsCommoned: true,
                SexStr: "1",
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

  .guide-left {position: fixed; top: 40%;}
</style>
