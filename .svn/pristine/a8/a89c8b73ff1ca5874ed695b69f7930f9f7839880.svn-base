<template>
    <div class="video">
        <mt-loadmore class="videolist" v-infinite-scroll="loadBottom" infinite-scroll-disabled="loading" infinite-scroll-distance="50" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
            <ul>
                <li :key="index" v-for="(item,index) in list">
                    <point :ScoreSetting="ScoreSetting" :dataInfo="item"></point>
                </li>
                <p v-show="loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <div class="empty-content" v-if="list==0">
                    还没有支付记录
                </div>
            </ul>

        </mt-loadmore>
    </div>
</template>

<script scoped>
import point from '@/components/user/point';
import { setStore, getStore, getMyScoreList } from '../../store/mlocalstorge';
export default {
    components: {
        point
    },
    data() {
        return {
            list: [],
            allLoaded: false,
            bottomStatus: '',
            topStatus: '',
            wrapperHeight: 0,
            translate: 0,
            moveTranslate: 0,
            PageIndex: 1,
            PageSize: 20,
            TotalPages: 0,
            loading: false,
            ScoreSetting: 1,
        };
    },

    methods: {
        handleTopChange(status) {
            this.moveTranslate = 1;
            this.topStatus = status;
        },
        translateChange(translate) {
            const translateNum = +translate;
            this.translate = translateNum.toFixed(2);
            this.moveTranslate = (1 + translateNum / 70).toFixed(2);
        },
        loadTop() {
            this.PageIndex = 1;
            let params = {
                "PageIndex": this.PageIndex,
                "PageSize": this.PageSize,
            }
            this.api.getMyPointsList(params).then(res => {
                this.$refs.loadmore.onTopLoaded()
                this.list = getMyScoreList(res.Data);
                this.TotalPages = res.Data.TotalPages;
            });

        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom() {
            if (this.TotalPages < this.PageIndex) {
                this.allLoaded = true;
                return;
            }
            loading = true;
            setTimeout(() => {
                this.PageIndex++;
                let params = {
                    "PageIndex": this.PageIndex,
                    "PageSize": this.PageSize,
                }
                this.api.getMyPointsList(params).then(res => {
                    for (let i = 0; i < getMyScoreList(res.Data).length; i++) {
                        this.list.push(res.Data[i]);
                    }
                    this.TotalPages = res.Data.TotalPages;
                    this.$refs.loadmore.onBottomLoaded();
                    loading = false;
                }, error => {
                    loading = false;
                });
            }, 2500);
        },
    },
    created() {

    },
    mounted() {

        let Scoreparams = {
        }
        this.api.getMyPointsInfo(Scoreparams).then(res => {
            this.ScoreSetting = res.Data.ScoreSetting;

        });
        let params = {
            "PageIndex": this.PageIndex,
            "PageSize": this.PageSize,
        }
        this.api.getMyPointsList(params).then(res => {
            this.list = getMyScoreList(res.Data);
            this.TotalPages = res.Data.TotalPages;
        });
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../common/variable.scss';
.video {
    height: 100%;
}

.videolist {
    margin: 0 5px;
    height: 100%;
}

.empty-content {
    width: 100%;
    height: $defult-empty-height;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
