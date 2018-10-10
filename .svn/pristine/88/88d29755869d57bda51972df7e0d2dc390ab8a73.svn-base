<template>
    <div class="liveyu-content">
        <form @onsubmit="search" action="javascript:void(0)">
            <div class="buttonFloatLeft">
              <input placeholder='请输入你要搜索的关键字' style="font-size: 1.4rem;" type="search" class="textfieldPsd"
                     v-model="keyword" maxlength="8" @keypress="search"></input>
                <input class="just-for-no-refresh" type="text" style="display:none" />
            </div>
        </form>
        <div>
            <scroller :noDataText="noDataText" class="lis-tcontent" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
                <ul class="padding">
                    <li :key="index" v-for="(item,index) in list">
                        <live-item class="item" :liveInfo="item" :index="index" v-on:itemclick="itemclick"></live-item>
                    </li>
                </ul>
            </scroller>
        </div>

        <Modal ref="ModalCharge" :text="text" confirmTitle="确定" cancleTitle="取消" confirmVisible="visible" v-on:confirmClick="confirmCharge" v-on:cancleClick="cancleClick"></Modal>

    </div>
</template>
<script scoped>
import LiveItem from '@/components/search/searchitem';
import * as constant from '../../configs/constant';
import Modal from '@/components/modal/Modal';

import { getStore, removeStore } from '../../store/mlocalstorge';
import { Toast } from 'mint-ui';
import { getWXPayInfo } from '../../utils/WXPay';
export default {
    components: {
        LiveItem, Modal
    },
    data() {
        return {
            list: Object,
            title: "",
            PageIndex: 1,
            PageSize: 20,
            allLoaded: false,
            text: "",
            userInfo: {},
            ScoreSetting: 0,
            TotalPages: 0,
            loading: false,
            itemindex: -1,
            keyword: "",
            noDataText: "",
        }
    },
    props: {


    },
    mounted() {
        let s = this.$store.state.searchlist;

        this.keyword = this.$store.state.keyword;
        if (s != undefined && s != null && s.length >= 1) {
            this.list = s;

            return;
        }
    },
    beforeDestroy() {

    },
    methods: {
        search() {
            if (this.keyword.length == 0) {
                return;
            }
            this.PageIndex = 1;
            let userInfo = getStore("userInfo");
            let params = {
                "PageIndex": this.PageIndex,
                "PageSize": this.PageSize,
                "StatusId": -1,// 全部
                "UserId": -1,
                "OrderMode": 1,
                "Keywords": this.keyword
            }
            this.api.getLiveStreams(params).then(res => {
                this.list = [];
                this.TotalPages = res.Data.TotalPages;
                for (let i = 0; i < res.Data.Data.length; i++) {
                    if (res.Data.Data[i].LiveStreamStateId != 3) {
                        this.list.push(res.Data.Data[i]);
                    }

                }
                this.$store.commit("updatekeyword", this.keyword);
                this.$store.commit("updatesearchlist", this.list);
                this.noDataText = ""

            });

        },
        refresh(done) {
            if (this.keyword.length == 0) {
                return;
            }
            setTimeout(() => {
                this.PageIndex = 1;
                let userInfo = getStore("userInfo");
                let params = {
                    "PageIndex": this.PageIndex,
                    "PageSize": this.PageSize,
                    "StatusId": -1,// 全部
                    "UserId": -1,
                    "OrderMode": 1,
                    "Keywords": this.keyword
                }
                this.api.getLiveStreams(params).then(res => {
                    this.list = [];
                    this.TotalPages = res.Data.TotalPages;
                    for (let i = 0; i < res.Data.Data.length; i++) {
                        if (res.Data.Data[i].LiveStreamStateId != 3) {
                            this.list.push(res.Data.Data[i]);
                        }

                    }
                    this.$store.commit("updatekeyword", this.keyword);
                    this.$store.commit("updatesearchlist", this.list);
                    this.noDataText = "没有更多数据了"
                    done();
                });
            }, 1500);
        },

        infinite(done) {
            this.loading = true,
                setTimeout(() => {
                    this.loading = false;
                    if (this.TotalPages < this.PageIndex) {
                        done(true);
                        return;
                    }
                    this.PageIndex++;
                    let userInfo = getStore("userInfo");
                    let params = {
                        "PageIndex": this.PageIndex,
                        "PageSize": this.PageSize,
                        "StatusId": -1,// 全部
                        "UserId": -1,
                        "OrderMode": 1,
                        "Keywords": this.keyword
                    }
                    this.api.getLiveStreams(params).then(res => {
                        for (let i = 0; i < res.Data.Data.length; i++) {
                            if (res.Data.Data[i].LiveStreamStateId != 3) {
                                this.list.push(res.Data.Data[i]);
                            }
                        }

                        this.TotalPages = res.Data.TotalPages;
                        this.$store.commit("updatekeyword", this.keyword);
                        this.$store.commit("updatesearchlist", this.list);
                        done();
                        this.noDataText = "没有更多数据了"
                    });

                }, 1500);
        },
        itemclick(itemindex) {
            this.itemindex = itemindex;
            this.userInfo = getStore("userInfo");
            // 判断是否需要报名
            if (this.list[itemindex].ApplyCount != 0 && this.list[itemindex].ApplyCount >= this.list[itemindex].MaxAudienceCount) {
                Toast("报名人数已经满了");
                return;
            }
            if (this.list[itemindex].IsApplyed) {
                Toast("已报名");
                return;
            }
            // 弹出提示窗口
            //查询积分保证登录
            let paramsApply = {
            }
            this.api.getMyPointsInfo(paramsApply).then(res => {
                if (res.Data == undefined) {
                    Toast("网络不好，请稍后");
                    return;
                }
                this.ScoreSetting = res.Data.ScoreSetting;
                this.text = "该场直播需要" + this.list[itemindex].ApplyExpense / res.Data.ScoreSetting + "元报名，确定吗?";
                this.$refs.ModalCharge.open();
            }, error => {
                Toast("网络不好，请稍后");
            });
        },
        cancleClick() {
        },
        confirmCharge() {// 微信支付

            if (!this.userInfo.IsRegisted) {
                this.$refs.ModalLogin.open();
                return;
            }
            getWXPayInfo(this.list[this.itemindex].ApplyExpense * 100 / this.ScoreSetting, () => {
                //扣费
                let chargeParms = {
                    "ChangeTypeId": 821,
                    "ScoreAmount": this.list[this.itemindex].ApplyExpense,
                    "RefertoId": this.list[this.itemindex].Id,
                };
                this.api.getLiveScorePay(chargeParms).then(res => {

                    let payparams = {
                        "UserId": this.userInfo.UserId,
                        "LiveId": this.list[this.itemindex].Id,
                    }
                    this.api.getCustomerPayInfo(payparams).then(res => {
                        let payInfo = res.Data;
                        if (payInfo.IsPayApplyExpense) {
                            this.list[this.itemindex].IsApplyed = true;
                        }
                    });
                    // }
                });
            }, (fail) => {
                Toast("支付失败");
            })
        }

    },


}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.liveyu-content {

    overflow: hidden;
    width: 100%;
    height: 100%;
    .buttonFloatLeft {
        width: 100%;
        border-top: 1px solid rgba(15, 15, 25, 0.3);
        display: flex;
        .textfieldPsd {
            background: url(../../assets/btn_sousuo.png) no-repeat left center, #f5f5f9;
            background-size: 20px 20px;
            background-position-x: 5px;
            width: 100%;
            margin: 10px;
            padding: 10px 15PX;
            outline: none;
            padding-left: 30px;
        }
    }
    .lis-tcontent {
        margin-top: 50px;
        .item {
            @include border-bottom-grey;
        }
        li:last-child {
            .item {
                border-bottom: none;
            }
        }
    }
    .padding {
        margin: 5px 0px;
    }
}
</style>
