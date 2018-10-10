<template>
<div class="UserInformation">
    <div class="users-list1" style="padding:8px 0">
        <div class="users-listcd-l" style="width: 80px;text-align: right">手机号码</div>
        <input style="background-color:#FFF" type="text" disabled="disabled" class="users-listcd-r" :value="phone">
    </div>
    <div class="users-list1" style="padding:8px 0">
        <div class="users-listcd-l" style="width: 80px;text-align: right">昵称</div>
        <input type="text" class="users-listcd-r" v-model="nickName" @input="checkNickName()">
    </div>
    <div class="users-list1" style="padding:8px 0">
        <div class="users-listcd-l" style="width: 80px;text-align: right">性别</div>
        <div class="users-listcd-r" style="text-align: left">
            <label>男<input type="radio" v-model="Gender" value="0"/></label>
            <label>女<input type="radio" v-model="Gender" value="1"/></label>
        </div>
    </div>
    <div class="users-list1" style="padding:8px 0">
        <div class="users-listcd-l" style="width: 80px;text-align: right">生日</div>
        <div class="users-listcd-r">
            <mt-button style="height:100%;text-align:left" @click.native="open('picker')" size="large">{{birthdayValue}}</mt-button>
            <mt-datetime-picker
              ref="picker"
              type="date"
              v-model="birthday"
              :startDate="startDate"
              :endDate="endDate"
              @confirm="handleChange">
            </mt-datetime-picker>
        </div>
    </div>
    <div class="users-list1" style="padding:8px 0;text-align:-webkit-center;">
        <mt-button size="large" @click="submitData" type="primary" style="width: 90%">提交</mt-button>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            phone: "",
            Gender: 0,
            visible2: false,
            startDate: new Date("1900/1/1"),
            endDate: new Date(),
            birthday: null,
            birthdayValue: "",
            oldBirthday: null,
            nickName: '',
            userInfo: null,
        };
    },
    components: {
    },
    methods: {
        checkNickName() {
            let temp = this.nickName;
            if (temp && temp.length > 15) {
                Toast("昵称最大长度为15");
                temp = temp.substr(0, 15);
            }
            this.nickName = temp;
        },
        open(picker) {
            this.$refs[picker].open();
        },
        // 改变生日内容
        handleChange(value) {
            let year = value.getFullYear();
            let month = value.getMonth()+1;
            if (month < 10) {
              month = "0" + month;
            }
            let day = value.getDate();
            if (day < 10) {
              day = "0" + day;
            }
            this.birthdayValue = year + '/' + month + '/' + day;
        },
        submitData() {
            if (this.nickName.length < 2) {
                Toast("昵称最小长度为2");
                return;
            }

            let userinfo = window.localStorage.getItem("userInfo");
            userinfo = JSON.parse(userinfo);
            let birthday = "";
            if (this.birthdayValue != '请选择') {
              let year = this.birthday.getFullYear();
              let month = this.birthday.getMonth()+1;
              if (month < 10) {
                month = "0" + month;
              }
              let day = this.birthday.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              birthday = year + '/' + month + '/' + day;
            }

            let params = {
                "Phone": this.phone,
                "UserId": userinfo.UserId,
                "Nickname":this.nickName,
                "Gender": this.Gender,
                "Birthday": birthday,
            };
            this.api.updateUserInformation(params).then( res=> {
                if(res.Result == 1) {
                    Toast("更新成功");
                    //需要将头像信息, 更新至用户信息中.
                    this.api.getMyHomePage({"UserId": this.userInfo.UserId}).then(res2 => {
                      this.userInfo.UserHeaderImageUrl = res2.Data.AvatarUrl ? res2.Data.AvatarUrl : this.userInfo.UserHeaderImageUrl;
                      this.userInfo.Nickname = res2.Data.NikeName ? res2.Data.NikeName : this.userInfo.Nickname;
                      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                    })
                    this.$router.push({ name: '个人主页' });
                } else {
                    Toast(res.ResultMessage);
                }
            });
        },
    },
    computed: {},
    mounted() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }
        this.birthday = year + "/" + month + "/" + day;
        let params = {};
        this.api.getBasicInfo(params).then( res => {
            this.phone = res.Data.Phone;
            this.nickName = res.Data.Nickname;
            if(res.Data.Gender == -1) {
                res.Data.Gender = 0;
            }
            this.Gender = res.Data.Gender;
            if("" != res.Data.Birthday) {
                this.birthday = res.Data.Birthday;
                this.birthdayValue = this.birthday;
            } else {
                this.birthday = this.birthday.toLocaleDateString();
                this.birthdayValue = "请选择";
            }
        });
        this.userInfo = window.localStorage.getItem("userInfo");
        this.userInfo = JSON.parse(this.userInfo);
    },
}
</script>

<style scoped lang="scss">
@import '../../common/style.css';
</style>
