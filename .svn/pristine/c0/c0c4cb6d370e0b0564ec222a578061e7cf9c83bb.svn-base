<template>
    <div class="content">
        <img class="asdf" :src="teamHead" alt="" @click="clickteam">
    </div>
</template>
<script scoped>
export default {
    data() {
        return {
            teamHead: require('../../assets/nim_avatar_default.png'),
        }
    },
    props: {
        index: Number,
        dataInfo: Object,

    },
    computed: {

    },
    methods: {
        clickteam() {
            if(this.index == 7){
                this.$emit("clickteam");
            }
        }
    },
    mounted() {
        if (this.dataInfo.CustomerAvatarUrl != null && this.dataInfo.CustomerAvatarUrl != undefined && this.dataInfo.CustomerAvatarUrl.length > 1) {
            this.teamHead = this.dataInfo.CustomerAvatarUrl
        }
        if (this.index == 7) {
            this.teamHead = require('../../assets/studio_more.png');
        }
    },

}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.content {
    border-radius: 50%;
    height: 0;
    width: 10.5%;
    padding-bottom: 10.5%;
    margin-left: $margin-5;
    position: relative;

    .asdf {
        position: absolute;
        border-radius: 50%;
        top: 0;
        left: 0;
        right: 0;
        border: 0;
        height: 100%;
        width: 100%;
    }
}
</style>
