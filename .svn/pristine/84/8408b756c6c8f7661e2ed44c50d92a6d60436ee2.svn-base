
<template>
    <div class="live-item" @click="toLiveDetail">

        <div class="headurl">
            <img :src="liveInfo.Picture.Url" alt="">
        </div>
        <div class="detail">
            <div class="name-state">
                <h3 class="name">{{liveInfo.Title}}</h3>
                <div class="state">直播中</div>
            </div>
            <!--直播历史的部分  -->
            <div v-if="history">
                <div class="time">{{liveInfo.Duration}}</div>
                <div class="time">{{liveInfo.RealStartDateTime}}</div>
                <div class="time">{{liveInfo.Anchor}}</div>
            </div>
            <!--预直播部分 -->
            <div v-if="yuzhibo" class="yuzhibo">
                <div class="time2">{{timeYu}}</div>
                <div class="host-livestate">
                    <div class="host">{{liveInfo.Anchor}}/</div>
                    <div class="livestate">{{state}}</div>
                </div>
            </div>
            <div class="button" onClick="event.cancelBubble = true" v-if="yuzhibo">
                <a class="sign-up" v-if="liveInfo.IsApply" @click="item">{{liveInfo.IsApplyed?"已报名":"报名"}}</a>
            </div>

        </div>
    </div>
</template>
<script scoped>
import * as constant from '../../configs/constant';
import Modal from '@/components/modal/Modal';
import { getStore, removeStore } from '../../store/mlocalstorge';
import { Toast } from 'mint-ui';
import { getWXPayInfo } from '../../utils/WXPay'
export default {
    components: {
        Modal
    },
    data() {
        return {
            yuzhibo: true,
            history: false,
            state: "即将开始",
            text: "",
            userInfo: {},
            ScoreSetting: 0,
            timeYu: "",
        }
    },
    methods: {
        toLiveDetail() {
            this.$router.push({ path: '/LiveDetail/' + this.liveInfo.Id })
        },
        item() {
            
            this.$emit("itemclick", this.index);
        },

    },
    props: {
        liveInfo: Object,
        index: Number,
        type: Number,
    },
    mounted() {
        switch (this.type) {
            case constant.STATUS_LIVE_PRE:
                this.yuzhibo = true;
                this.history = !this.yuzhibo;
                break;
            case constant.STATUS_LIVE_HISTORY:
                this.history = true;
                this.yuzhibo = !this.history;
                break;
        }
        this.timeYu = this.liveInfo.StartDateTime.substring(5) + "--" + this.liveInfo.EndDateTime.substring(5);
    }


}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';

.live-item {
    display: flex;
    justify-content: center;
    font-size: $font-size-13;
    padding: 5px 0px;
    margin: 0 10px;
    .headurl {
        @include center-flex;
        display: flex;
        border-radius: 50%;
        padding-right: 0;
        img {
            width: 126px;
            height: 88px;
        }
    }
    .detail {
        flex: 1 1 auto;
        width: 100%;
        overflow: hidden;
        text-align: left;
        padding-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name-state {
            display: flex;
            justify-content: space-between;
            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 0 1 auto;
                font-size: $font-size-17;
            }
            .state {
                padding: 2px 7px;
                background: $color-background-mainblue;
                color: white;
                right: 0;
                top: 0;
                @include border-radius(5px);
                font-size: $font-size-12;
                display: none;
            }
            .yuzhibo {
                display: flex;
                flex-direction: column;
            }
        }
        .time {
            text-align: left;
            margin-top: 3px;
            white-space: normal;
            word-break: break-all;
        }
        .time2 {
            text-align: left;
            margin-top: 3px;
            white-space: normal;
            word-break: break-all;
        }
        .host-livestate {
            display: flex;
            margin-top: 3px;
            flex-direction: row;
            .livestate {
                color: $color-background-textblue;
            }
        }
    }
    .button {
        padding: 3px 0px;
        .sign-up {
            color: white;
            padding: 2px 15px;
            background: $color-background-mainblue;
            @include border-radius(3px);
        }
    }
}
</style>
