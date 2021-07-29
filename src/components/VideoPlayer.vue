<template>
  <!-- <video
    :src="source"
    controls
    autoplay
    playsinline
    class="video-js"
    width="600"
    height="300"
    style="width: 100%; height: auto;"
    ref="videoPlayer"
  /> -->
  <video
    class="video-js vjs-16-9 vjs-big-play-centered"
    ref="video"
    style="width: 100%;"
    playsinline
  >
    <!-- <source :src="source" type="application/vnd.apple.mpegurl" /> -->
  </video>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  props: {
    source: String,
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    let video = this.$refs['video']
    this.player = videojs(video, {
      autoplay: true,
      controls: true,
      userActions: {
        hotkeys: true,
      },
    })
    this.player.src({
      src: this.source,
      type: 'application/x-mpegURL',
      withCredentials: true,
    })
  },
}
</script>

<style>
.vjs-texttrack-settings {
  display: none;
}
</style>
