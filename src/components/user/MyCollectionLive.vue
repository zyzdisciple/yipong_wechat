<template>
<div class="MyCollectionLive" v-show="init">
    <div v-if="list.length > 0">
        <div class="live-content" :key="liveIndex" v-for="(liveItem,liveIndex) in list">
            <div class="zbyg-list">
                <div class="zbyg-list-l" @click="LiveDetail(liveItem.Id, liveItem.Title)"><img :src="liveItem.Picture.Url" style="width:80px;height:60px;"></div>
                <div class="zbyg-list-c" style="width:45%;text-align:left;margin: 12px 2px 0 2px" @click="LiveDetail(liveItem.Id, liveItem.Title)">
                    <span class="zbygbt" style="width:150px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                      {{liveItem.Title}}
                    </span><br>
                    <span class="zbygsbt"><img src="../../images/zbyg-time.png">{{liveItem.RealStartDateTime}}</span><br>
                    <span class="zbygsbt"><img src="../../images/zbyg-user.png">{{liveItem.WorkRoom.Name}}</span>
                </div>
                <div class="zbyg-list-r" style="width:auto;padding-top:10px;">
                    <button class="button-primary" @click="cancelCollection(liveItem.Id)">取消收藏</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            list: [],
            PageIndex: 0,
            PageSize: 10,
            init: false,
        };
    },
    methods: {
        //直播详情
        LiveDetail(LiveID, shareTitle) {
            shareTitle = shareTitle ? shareTitle : '直播详情';
            this.$router.push({ path: '/LiveDetail/' + LiveID + '/' + shareTitle})
        },
        // 取消收藏
        cancelCollection(LiveID) {
            let params = {
                "CollectID": LiveID,
                "CollectType": 7,
                "IsCollect":  false,
            }
            this.api.CollectVideo(params).then( res=> {
                if(res.Result == 1) {
                    for(let i=0;i<this.list.length;i++) {
                        if(LiveID == this.list[i].Id) {
                            this.list.splice(i, 1);
                        }
                    }
                } else {
                    Toast("取消收藏失败，请稍后再试！");
                }
            });
        },
        loadData(initLoad) {
            let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
            this.PageIndex = initLoad ? 1 : this.PageIndex + 1;
            let params = {
              "Id": userInfo.UserId,
              "PageIndex": this.PageIndex,
              "PageSize": this.PageSize,
            };
            if (initLoad) {
              Indicator.open();
            }
            this.api.getCollectLiveStreams(params).then(res => {
               var tempData = res.Data.Data;
                if (initLoad) {
                    this.list = tempData;
                    Indicator.close();
                } else if (tempData && tempData.length > 0) {
                    tempData.forEach(item => {
                      this.list.push(item);
                    })
                } else {
                    this.$emit('changeAllLoadStatus');
                }
                this.init = true;
            });
        }
    },
    mounted() {
       this.loadData(true);
    },
}
</script>

<style scoped lang="scss">
@import '../../common/style.css';
</style>
