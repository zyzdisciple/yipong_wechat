<template>
    <div :class="overlay_classes" v-show="is_open" onClick="event.cancelBubble = true" v-on:click="_onOverlayClick" @touchmove.prevent>
        <div :v-show="visible" :class="modal_classes" :style="overlay_style">
            <div class="content">

                <div class="text-content">
                    请在竖屏下观看
                </div>
            </div>
        </div>
    </div>
</template>
<script scoped>

export default {

    name: 'ModalPoirt',
    data() {
        return {
            visible: false,
            is_open: false,
            is_bouncing: false,
            tabs: []
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
            default: 150,
        },

        confirmBackgroundColor: {
            type: String,
            required: false,
            default: '#FFFFFF'
            //default: "url('../static/assets/backLightBlue.png') round",
        },

        cancleBackgroundColor: {
            type: String,
            required: false,
            default: 'linear-gradient(to right, #fff	, #fff	)'
        },
        confirmVisible: {
            type: String,
            required: false,
            default: "hidden"
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
            // setTimeout(() => this.is_open = false, 0.2)
            this.$emit('close')
            // this.close();
        },

        confirmClick() {
            this.$emit('confirmClick')
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
  font-size: 1.8rem;
    padding-top: 15px;
}

.modaltitle {
  font-size: 1.5rem;
    padding-top: 18px;
    color: $color-background-textblue;
}

.sweet-modal-overlay {
    z-index: 100000;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;


    width: 100vw;
    height: 100vh;

    overflow-y: auto;
    z-index: 9001;

  font-size: 1.4rem;

    -webkit-font-smoothing: antialiased; // Theming
    background:#FFF; // Animation
    // backgroundcolor:rgba(15,15,25,0.3)

  -webkit-perspective: 500px;

    &.is-visible {
        opacity: 1;
    }
}

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    .btn-content {
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
            border-bottom-left-radius: 5px/5px;
        }
        .right {
            background: green;
            border-bottom-right-radius: 5px/5px;
        }
    }
    .text-content {
      font-size: 2.0rem;
        margin-left: 15px;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-self: center;
        align-items: center;
    }
}

.sweet-modal {
    z-index: 99999;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;

  position: absolute;
    top: 50%;
    left: 50%; // transform: translate(-50%, -50%); // Done by the animation later
    width: 80%;
    max-width: 640px;
    border-radius: 5px/5px;
    overflow: hidden;
    &.is-visible {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}
</style>
