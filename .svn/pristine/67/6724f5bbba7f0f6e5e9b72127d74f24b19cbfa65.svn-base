<template>
    <div :class="overlay_classes" v-show="is_open" onClick="event.cancelBubble = true" v-on:click="_onOverlayClick" @touchmove.prevent>
        <div :class="modal_classes" :style="overlay_style">
            <div class="content">
                <p  @click="close"  class="close" alt="">×</p>
                <img src="../../images/qrcode.jpg" class="qrcode" alt="">
                <p class="promet">扫码/识别二维码关注微医邦，观看更多医生直播</p>
            </div>
        </div>
    </div>
</template>
<script scoped>

export default {
      name: 'ModalQRCode',
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
            default: 200,
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

            }
        }
    },


}

</script>
<style scoped lang="scss">
@import '../../common/mixin.scss';
@import '../../common/variable.scss';



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
    position: relative;
    .qrcode {
        margin-top: 10px;
        display: flex;
        align-self: center;
        align-content: center;
        width: 160px;
    }
    .promet {
        margin: 10px 10px 20px;
    }
    .close {
        top: 0px;
        right: 0px;
        color: #666;
        width: 50px;
        position: absolute;
      font-size: 3.0rem;
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
