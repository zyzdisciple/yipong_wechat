<template>
    <div class="content">
        <ul>
            <li :key="index" v-for="(item,index) in list">
                 <TeamListitem class="item" :teamInfo="item" :index="index"></TeamListitem> 
            </li>
        </ul>
    </div>
</template>
 <script scoped>
import TeamListitem from '@/components/studio/TeamListitem';
export default {
    components: {
        TeamListitem
    },
    data() {
        return {
            teamHead: require('../../assets/nim_avatar_default.png'),
        }
    },
    props: {
        index: Number,
        list: Object,
    },
    computed: {

    },
    methods: {

    },
    mounted() {
        this.list = this.$store.state.studiodetail.WorkRoomCustomers;
    },

}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.content {
    margin: 0 5px;
    @include list-padding;
    .item {
        @include border-bottom-grey;
    }
    li:last-child {
        .item {
            border-bottom: none;
        }
    }
}
</style>
