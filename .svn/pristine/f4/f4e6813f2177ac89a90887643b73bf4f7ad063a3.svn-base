<template>
    <div class="point">
        <div class="point-title pointnormal">{{dataInfo.ChangeType}}</div>
        <div class="point-score pointnormal">{{dataInfo.ScorePoints/ScoreSetting}}元</div>
        <div class="point-date pointnormal">{{dataInfo.CreatedOnUtc}}</div>
    </div>
</template>

 <script scoped>
import { Toast } from 'mint-ui';
export default {
    props: {
        index: Number,
        dataInfo: Object,
         ScoreSetting: Number,
    },
    methods: {

    },

    computed: {

    },
    mounted() {
       
    },

}
</script>

<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.point {
    display: flex;
    .pointnormal {
        flex: 1;
        line-height:50px; 
        height: 50px;
    }
    .point-score{
        color: orange;
    }
   
}
</style>
