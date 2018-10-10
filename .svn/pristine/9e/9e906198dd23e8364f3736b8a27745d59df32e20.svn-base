<template>
<div class="LiveReplay">
    <video-element
      :videoUrl = "VideoInformation.NetEaseUrl"
      :videoId = "videoId"
      :listenPlayCount = "false"
      :fullScreen = "true"
      :videoOrientation = "videoOrientation"
      :posterImageUrl = "VideoInformation.Picture.Url"
    ></video-element>
</div>
</template>

<script>
  import VideoElement from '../video/VideoElement'
  export default {
      data() {
          return {
              VideoInformation: Object,
              videoOrientation: null,
          }
      },
      computed: {
          videoId() {
              return this.$route.params.LiveID;
          }
      },
      components: {
          VideoElement
      },
      mounted() {
          let paramsLive = {
              "Id": this.videoId,
          }
          this.api.getLiveStreamById(paramsLive).then(res => {
              this.VideoInformation = res.Data;
              this.videoOrientation = res.Data.LiveStreamPlatformId != 0 ? "landscape" : "portraint";
          });
      },
}
</script>

<style scoped>
.LiveReplay {
  width: 100%;
  height: auto;
  /*margin-top: 40%;*/
}
</style>
