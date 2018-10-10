
<template>
    <div class="living" @click="toLiveDetail">
        <div class="livedetail">
            <p class="livedetail-title">{{liveInfo.LiveStreamTitle}}</p>
            <p class="count"></p>
        </div>
        <div class="livestate">
            <img class="backurl" :src="liveInfo.LivingStreamPicture.Url"></img>
            <div class="state">直播中</div>
        </div>
    </div>
</template>
<script scoped>

export default {
    props: {
        liveInfo: Object,
    },
    computed: {

    },
    methods: {
        toLiveDetail() {
            this.$router.push({ path: '/LiveDetail/' + this.liveInfo.LiveStreamId })
        },
    },
}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.living {
    overflow: hidden;
    width: 100%;
    margin-top: 10px;
    background: white;
    .livedetail {
        margin: 0px $margin-defult;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        .livedetail-title {
            padding: 1px 0px;
            @include text-end(1);
            font-size: $font-size-16;
            line-height: 19px;
            margin: 5px 0;
        }
        .count {
            padding: 1px 0px;
            height: 19px;
            line-height: 19px;
            @include text-end(1);
            flex: 0 0 auto;
            font-size: $font-size-12;
        }
    }
    .livestate {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 64%;
        .backurl {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .state {
            width: 60px;
            height: 25px;
            position: absolute;
            line-height: 25px;
          font-size: 1.4rem;
            right: 10px;
            top: 10px;
            align-self: center;
            background: $color-background-mainblue;
            color: white;
            @include border-radius(5px);
        }
    }
}
</style>
