<template>
    <div :class="overlay_classes" v-show="is_open" onClick="event.cancelBubble = true" v-on:click="_onOverlayClick" @touchmove.prevent>
        <div :class="modal_classes" :style="overlay_style">
            <div class="content">
                <div class="head">
                    <div class="modaltitle">
                        请输入直播秘钥
                    </div>
                    <div class="text-content">
                        <input class="input" id="input" type="password" placeholder="请输入秘钥" v-model="key" :attr="{ maxlength: 20 }"></input>
                    </div>
                </div>
                <div class="btn-content">
                    <div class="btn-confirm line" @click="confirmClick">{{this.confirmTitle}}</div>
                    <div class="btn-confirm right" @click="cancleClick">{{this.cancleTitle}}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script scoped>

export default {

    name: 'ModalInput',
    data() {
        return {
            visible: false,
            is_open: false,
            is_bouncing: false,
            tabs: [],
            key: "",
        }
    },
    props: {
        confirmTitle: {
            type: String,
            required: false,
            default: '检测一下'
        },
        cancleTitle: {
            type: String,
            required: false,
            default: '取消'
        },
        text: {
            type: String,
            required: false,
            default: '提示'
        },
        height: {
            type: Number,
            required: false,
            default: 160,
        },

        confirmVisible: {
            type: String,
            required: false,
            default: "visible"
        },

        cancleVisible: {
            type: String,
            required: false,
            default: "visible"
        },
    },
    methods: {

        /**
         * Open the dialog
         * Emits an event 'open'
         */
        open() {
            this.is_open = true
            setTimeout(() => this.visible = true, 30)
            this.$emit('open')
        },

        /**
         * Close the dialog
         * Emits an event 'close'
         */
        close() {
            this.visible = false
            this.is_open = false
            //setTimeout(() => this.is_open = false, 0.2)
            this.$emit('close')
            this.key = '';
            // this.close();
        },

        confirmClick() {
            this.$emit('confirmClick', this.key)
            this.close();
        },

        cancleClick() {
            this.$emit('cancleClick')
            this.close();
        },

        _onOverlayClick(event) {
            if (!event.target.classList || event.target.classList.contains('sweet-modal-clickable')) {
                if (this.blocking) {
                    if (this.pulseOnBlock) this.bounce()
                } else {
                    this.close()
                }
            }
        },
    },
    mounted() {
        //  this.open();
    },
    computed: {

        overlay_classes() {
            return [
                'sweet-modal-overlay',
                'sweet-modal-clickable',
                {
                    'is-visible': this.visible,
                    blocking: this.blocking
                }
            ]
        },

        modal_classes() {
            return [
                'sweet-modal',
                {
                    'is-visible': this.visible,
                    bounce: this.is_bouncing,
                }
            ]
        },
        overlay_style() {
            return {
                "height": this.height + "px",
            }
        }
    },


}

</script>
<style scoped lang="scss">
@import '../../common/mixin.scss';
@import '../../common/variable.scss';
.blue {
    color: $color-background-textblue;
}

#input {
    border: 1px solid rgba(15, 15, 25, 0.3);
  font-size: 1.3rem;
}

.sweet-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;


    width: 100vw;
    height: 100vh;

    overflow-y: auto;
    z-index: 150;

  font-size: 1.4rem;

    -webkit-font-smoothing: antialiased; // Theming
    background: rgba(15, 15, 25, 0.5); // Animation
    // backgroundcolor:rgba(15,15,25,0.3)
    opacity: 0;
    transition: opacity 0.3s;
    transform: translate3D(0, 0, 0);
    -webkit-perspective: 500px;

    &.is-visible {
        opacity: 1;
    }
}

.modaltitle {
  font-size: 1.5rem;
    padding-top: 18px;
    color: $color-background-textblue;
}

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .btn-content {
        position: relative; // bottom: 0;
        bottom: 0px;
        left: 0;
        width: 100%;
        border-top: 1px solid rgba(15, 15, 25, 0.3);
        display: flex;
        .btn-confirm {
            flex: 1;
            color: #2c3e50;
            padding: 10px 0;
          font-size: 1.3rem;
        }
        .line {
            border-right: 1px solid rgba(15, 15, 25, 0.3);
            border-bottom-left-radius: 15px/15px;
        }
        .right {
            border-bottom-right-radius: 15px/15px;
        }
    }
    .text-content {
        // margin-top: 1rem;
        margin-top: 20px;
        font-size: 16;
        margin-left: 15px;
        margin-right: 15px; // margin-bottom: 30px;
        .input {
            width: 90%;
          font-size: 1.6rem;
            padding: 7px;
            border-radius: 4px/4px;
        }
    }
}

.sweet-modal {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 8px 46px rgba(#000, 0.08),
    0px 2px 6px rgba(#000, 0.03);

    position: absolute;
    top: 50%;
    left: 50%; // transform: translate(-50%, -50%); // Done by the animation later
    width: 80%;
    max-width: 640px;
    border-radius: 15px/15px;
    overflow: hidden;
    &.is-visible {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}
</style>
