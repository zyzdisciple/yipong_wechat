<template>
<div class="medicalRecordDetail">
    <div class="wjklist2 brw bb">
        <div class="wjklist2-title" style="height: 40px">
            <div class="wjklist2-title-r" style="width: 8%">
                <img style="height:24px;width:24px;" src="../../images/bljs.png">
            </div>
            <div class="wjklist2-title-l" style="margin-left:6px;text-align:left;width: 85%">
                <div class="t1" style="margin-top: 0;width:250px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">{{detailData.Title}}</div>
            </div>
        </div>
        <div class="wjklist2" style="text-align:left;width: 100%;">
            <div class="t2" style="width: 100%">
                <div style="float: left;width: 96%;margin:0 2% 20px 2%">
                    <p style="margin-left: 5px">{{detailData.Description}}</p>
                    <p style="margin-top: 20px" v-if="detailData.Pictures.length > 0" :key="Index" v-for="(Item,Index) in detailData.Pictures">
                        <img :src="Item.Url" style="width: 30%; height: 150px; margin: 5px 5px;float: left"/>
                    </p>
                </div>
            </div>
        </div>
        <div style="width: 98%;margin-bottom: 5px;text-align: right">{{detailData.CreatedOnUtc}}</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            detailData: Object,
        };
    },
    mounted() {
        // 获取详情
        this.api.getCustomerMedicalRecord({"Id":this.$route.params.DetailID}).then( res => {
            this.detailData = res.Data;
        });
    },
}
</script>

<style scoped lang="scss">
@import '../../common/style.css';
</style>
