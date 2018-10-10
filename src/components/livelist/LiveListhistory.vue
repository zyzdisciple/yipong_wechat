<template>
    <div class="liveyu-content">

        <scroller class="lis-tcontent" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
            <ul class="padding">
                <li :key="index" v-for="(item,index) in list">
                    <live-item class="item" :liveInfo="item" :index="index" :type="type"></live-item>

                </li>
            </ul>
        </scroller>
    </div>
</template>
<script scoped>
import LiveItem from '@/components/livelist/LiveItem';
import * as constant from '../../configs/constant';
import { getStore, removeStore } from '../../store/mlocalstorge';
export default {
    components: {
        LiveItem,
    },
    data() {
        return {
            list: Object,
            title: "",
            PageIndex: 1,
            PageSize: 10,
            type: constant.STATUS_LIVE_HISTORY,
            allLoaded: false,
            bottomStatus: "暂无数据，请稍后再试",
            loading: false,
            TotalPages: 0,
        }
    },
    props: {
    },
    mounted() {
        let params = {
            "PageIndex": this.PageIndex,
            "PageSize": this.PageSize,
            "StatusId": this.type,
            "UserId": parseInt(this.$route.params.hostId),
            "OrderMode": 1,
            "Keywords": ""
        }
        this.api.getLiveStreams(params).then(res => {
            this.list = res.Data.Data;
            this.TotalPages = res.Data.TotalPages;
        });
    },
    methods: {

        refresh(done) {
            setTimeout(() => {
                this.PageIndex = 1;
                let params = {
                    "PageIndex": this.PageIndex,
                    "PageSize": this.PageSize,
                    "StatusId": this.type,
                    "UserId": parseInt(this.$route.params.hostId),
                    "OrderMode": 1,
                    "Keywords": ""
                }

                this.api.getLiveStreams(params).then(res => {
                    this.list = res.Data.Data;
                    this.$refs.loadmore.onTopLoaded()
                    this.TotalPages = res.Data.TotalPages;
                    done()
                });
            }, 1500);
        },

        infinite(done) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                if (this.TotalPages < this.PageIndex) {
                    done(true)
                    return;
                }
                this.PageIndex++;
                let params = {
                    "PageIndex": this.PageIndex,
                    "PageSize": this.PageSize,
                    "StatusId": this.type,
                    "UserId": parseInt(this.$route.params.hostId),
                    "OrderMode": 1,
                    "Keywords": ""
                }

                this.api.getLiveStreams(params).then(res => {

                    for (let i = 0; i < res.Data.Data.length; i++) {
                        this.list.push(res.Data.Data[i]);
                    }
                    this.TotalPages = res.Data.TotalPages;
                    done()
                });

            }, 1500);

        },
    },

}
</script>
<style scoped lang="scss" >
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.liveyu-content {
    .lis-tcontent {
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
