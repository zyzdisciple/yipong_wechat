<template>
<div class="IntroVideo" style="width: 100%;height: auto;">
    <video-element
    :videoUrl = "studioInformation.VideoIntroUrl"
    :listenPlayCount = "false"
    >
    </video-element>
</div>
</template>

<script>
  import VideoElement from '../video/VideoElement';
  export default {
      components: {
        VideoElement,
      },
      data() {
          return {
              studioInformation: Object,
          }
      },
      mounted() {
          this.api.getStudioDetail({"id": this.$route.params.StudioID,}).then(res => {
            this.studioInformation = res.Data;
          });
      },
  }
</script>
<style scoped lang="scss" >
@import '../../common/style.css';
</style>
