
<template>
    <div class="studio-item">
        <div class="headurl">
            <img :src="teamInfo.CustomerAvatarUrl" alt="">
        </div>
        <div class="detail">
            <div class="name-state">
                <div class="name">{{teamInfo.CustomerName}}</div>
            </div>
            <div class="descri">{{teamInfo.CustomerDescription}}</div>
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

        }
    },
    methods: {

        item() {

        },

    },
    props: {
        teamInfo: Object,
        index: Number,
        type: Number,
    },
    mounted() {
        if (this.teamInfo.CustomerAvatarUrl.length<1) {
            this.teamInfo.CustomerAvatarUrl = require('../../assets/default_avatar.png');
        }
    }


}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';

.studio-item:active {
    background: rgba(15, 15, 25, 0.3);
}

.studio-item {
    display: flex;
    @include center-flex;
    padding: 5px 0px;
    .headurl {
        flex: 0 0 60px;
        @include center-flex;
        display: flex;
        border-radius: 50%;
        padding-right: 0;
        width: 60px;
        height: 60px;
        background: url(../../assets/default_avatar.png) no-repeat center;
        img {
            border-radius: 50%;
            width: 60px;
            height: 60px;
        }
    }
    .detail {
        flex: 0 1 auto;
        width: 100%;
        overflow: hidden;
        .name-state {
            margin: $margin-5;
            margin-left: 10px;
            display: flex;
            @include center-flex;
            justify-content: space-between;
            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                flex: 0 1 auto;
                font-size: $font-size-17;
            }
            .state {
                padding: 3px 7px;
                background: $color-background-mainblue;
                color: white;
                flex: 0 0 auto;
                @include border-radius(5px);
                font-size: $font-size-12;
            }
        }
        .descri {
            text-align: left;
            margin: $margin-5;
            margin-left: $margin-10;
            line-height: 19px;
            height: 38px;
            @include text-end(2);
            align-items: flex-start;
            font-size: $font-size-12;
        }
    }
}
</style>
