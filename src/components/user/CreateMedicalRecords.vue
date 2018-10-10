<template>
<div class="CreateMedicalRecords">
    <mt-cell title="病历标题" icon="more">
        <span>
            <div>
                <input style="text-align: right;" v-model="Title" placeholder="请输入病历标题"/>
            </div>
        </span>
        <img slot="icon" src="../../images/zbyg-user.png" width="20" height="24">
    </mt-cell>
    <mt-cell title="病历介绍" icon="more">
        <img slot="icon" src="../../images/bljs.png" width="20" height="24">
    </mt-cell>
    <mt-field placeholder="请输入病历介绍" type="textarea" v-model="Introduce" rows="4"></mt-field>
    <mt-cell title="图片上传" icon="more">
      <img slot="icon" src="../../images/pic.png" width="20" height="24">
    </mt-cell>
    <div class="mint-cell" style="padding: 0 10px 10px 10px;text-align: left" v-if="imagesList.length > 0">
        <div style="margin: 2px 5px;float: left;" :key="index" v-for="(item,index) in imagesList">
            <img :src="item.Url" style="width:40px;height:40px;">
        </div>
    </div>
    <div class="mint-cell" style="padding: 0 10px 10px 10px;text-align: left" v-if="imagesList.length < 9">
        <div style="position: absolute;z-index: 999;">
          <input type="file" @change="fileImage" accept="image/*" style="width: 80px;height: 80px;opacity:0"/>
        </div>
        <div style="z-index: 1">
          <img @click="sheetVisible = true" src="../../images/upload.png" width="80" height="80">
        </div>
    </div>
    <div class="users-list1" style="padding:8px 0">
      <mt-button size="large" @click="submitData" type="primary">提交</mt-button>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            Data: 0,
            sheetVisible: false,
            actions: [],
            imagesList: [],
            Introduce: "",
            Title: "",
        };
    },
    mounted() {

    },
    methods: {
        // 上传图片
        fileImage: function(e) {
            var that = this;
            if((this.imagesList.length + e.target.files.length) > 9) {
                Toast("最多可以上传9张图片");
                return;
            }
            let params = new FormData();
            for(let i=0;i<e.target.files.length;i++) {
                params.append(e.target.files[i].name, e.target.files[i]);
            }
            that.api.uploadFile(params).then( res => {
                if(res.Result == 1) {
                    for(let j=0; j<res.Data.length; j++) {
                        this.imagesList.push(res.Data[j]);
                    }
                } else {
                    Toast("图片上传失败！");
                }
            }, () => {
                Toast("图片上传失败！");
            });
        },
        // 创建病历
        submitData() {
            if(this.Title == "" || this.Introduce == "") {
                Toast("请输入病历标题和介绍！");
                return;
            }
            let params = {
                "CustomerHealthyRecordId": this.$route.params.FileID,
                "Title": this.Title,
                "Description": this.Introduce,
                "Pictures": this.imagesList,
            }
            this.api.createCustomerMedicalRecord(params).then( res => {
                if(res.Data) {
                    Toast("创建成功！");
                    this.$router.push({ path: '/MyHealthFile/' + this.$route.params.FileID + "/2"})
                } else {
                    Toast("创建失败，请稍后再试！");
                }
            });
        }
    },
}
</script>

<style>
.mint-cell-title {
    text-align: left;
}
.mint-field-core {
    text-align: left;
    background-color: #eaeaea;
}

</style>
