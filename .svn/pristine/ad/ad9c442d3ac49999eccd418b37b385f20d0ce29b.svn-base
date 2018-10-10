<template>
    <div class="View">


        <div class="textfieldDiv">

            <mt-field placeholder='手机号:' class="textfieldTel" v-model="username" :attr="{ maxlength: 11 }"></mt-field>
            <div class="buttonFloatLeft">
                <mt-field placeholder='验证码:' class="textfieldPsd" v-model="code"></mt-field>
                <button type="button" :disabled="btnIsDisabled" class="newbuttonblue" @click="commitcode()">{{codeString}}</button>
            </div>

        </div>
        <div class="text-center" @click="commitcode()">
            <input type="button" :value="state">
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            codeString: '获取验证码',
            count: 60,
            btnIsDisabled: false,
            username: '',
            state: '完成',
            code: '',
        }
    },
    methods: {
        timedCount() {
            this.count = this.count - 1;
            if (this.count > 0) {
                this.t = setTimeout(() => {
                    this.timedCount();
                }, 1000);
                this.codeString = "重新获取(" + this.count + "s)";
                this.btnIsDisabled = true;

            } else {
                this.count = 60;
                this.codeString = '获取验证码';
                this.btnStyle = 1;
                this.btnIsDisabled = false;
            }
        },
        commitcode() {
            if (!this.code) {
                Toast("请输入验证码");
                return;
            }
            let params = {
                "UserName": this.username,
                "VerifyCode": this.code,
            }
            this.api.getConsummaVerifyCode(params).then(res => {
                if (res.Data.IsImproved) {
                    Toast("信息完善成功");
                } else {
                    Toast(res.ResultMessage);
                 }

            }, error => {
                Toast("验证码错误");
            })
        },
        sendMessage() {

            if (!this.username) {
                Toast("请输入手机号");
                return;
            }
            if (this.checkMobile(this.username) == false) {
                Toast("手机号码格式错误");
                return;
            }
            this.timedCount();
            let data = {
                "mobile": this.username,
            }
            this.api.getRequestVerifyCode(data)
                .then(res => {
                    Toast("验证码发送成功");
                },
                error => {
                    clearTimeout(this.t);
                    this.count = 60;
                    this.codeString = '获取验证码';

                    this.btnIsDisabled = false;
                })
        },
        checkMobile() {
            let re = /^1[34578]\d{9}$/;
            if (re.test(this.username)) {
                return true;
            } else {
                return false
            }
        },
    }
}

</script>

<style scoped lang="scss">
@import '../../common/mixin.scss';
@import '../../common/variable.scss';

.View {
    position: relative;
    width: auto;
    top: 50px;
    height: 100%;
    .textfieldDiv {

        .textfieldTel {
            border: 1px solid black;
            border-left: none;
            border-right: none;
            margin-top: 10px;
            width: 100%;
        }
        .buttonFloatLeft {
            position: relative;
            border-bottom: 1px solid black;
            .newbuttonblue {
                position: absolute;
                right: 5px;
                top: 3px;
                width: 100px;
                border: none;
                outline: none;
                height: 40px;
                color: $color-background-mainblue;
                background: white;
            }
        }
    }
    .text-center {
       position: fixed;
        bottom: 0;
        left: 0;
        margin: $margin-defult;
        width:95%;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;

        input {
            width:100%;
            @include border-radius;
          font-size: 1.8rem;
            background-color: $color-background-textblue;
            color: white;
            height: 45px;
        }
    }
}
</style>
